import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
    getProjetById,
    deleteProjet,
    envoyerAuBailleur,
    terminerProjet,
} from "../../../../services/projetService";
import { getChampsByProjet } from "../../../../services/champService";



import { Linking, } from "react-native";

import {exporterProjetExcel,} from "../../../../services/projetService";




export default function DetailProjetScreen() {

    const { id } = useLocalSearchParams();

    const [projet, setProjet] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [nombreChamps, setNombreChamps] = useState(0);
    const [formulaireConfigure, setFormulaireConfigure] = useState(false);
    const { t } = useTranslation("superviseur");

    useFocusEffect(
        React.useCallback(() => {
            chargerProjet();
        }, [id])
    );

    const chargerProjet = async () => {
        try {

            const data = await getProjetById(
                Number(id)
            );
            console.log("PROJET =", data);

            setProjet(data);
            const champs = await getChampsByProjet(
                Number(id)
            );

            setNombreChamps(champs.length);

            setFormulaireConfigure(
                champs.length > 0
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const statutProjet = () => {
        return projet?.statut === "TERMINE"
            ? t("finished")
            : t("inProgress");
    };

    const dateFinAtteinte = () => {

        if (!projet?.dateFin) {
            return false;
        }

        const maintenant = new Date();

        const aujourdHui = new Date(
            maintenant.getFullYear(),
            maintenant.getMonth(),
            maintenant.getDate()
        );

        const [annee, mois, jour] =
            projet.dateFin
                .split("-")
                .map(Number);

        const dateFin = new Date(
            annee,
            mois - 1,
            jour
        );

        return aujourdHui >= dateFin;
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#16A34A"
                />
            </View>
        );
    }

    const exporterExcel = async () => {
        try {

            const url =
                `https://debbo-collect.onrender.com/api/projets/${id}/excel`;

            const canOpen = await Linking.canOpenURL(url);

            if (!canOpen) {
                Alert.alert(
                    t("error"),
                    t("cannotOpenFile")
                );
                return;
            }

            await Linking.openURL(url);

        } catch (e) {

            console.log(e);

            Alert.alert(
                t("error"),
                t("excelExportError")
            );
        }
    };

    const envoyer = async () => {

        try {

            await envoyerAuBailleur(Number(id));

            Alert.alert(
                t("success"),
                t("projectSent")
            );

            chargerProjet();

        } catch (e: any) {

            console.log("ERREUR =", e.response?.data);

            Alert.alert(
                "Erreur",
                e.response?.data?.message || e.message
            );

        }

    };

    const confirmerTerminaison = () => {

        Alert.alert(
            t("confirmation"),
            t("confirmFinishProject"),
            [
                {
                    text: t("no"),
                    style: "cancel",
                },
                {
                    text: t("yes"),
                    style: "destructive",
                    onPress: async () => {
                        try {

                            await terminerProjet(Number(id));

                            Alert.alert(
                                t("success"),
                                t("projectFinished")
                            );

                            await chargerProjet();

                        } catch (e: any) {

                            console.log(
                                "ERREUR TERMINAISON =",
                                e.response?.data
                            );

                            Alert.alert(
                                t("error"),
                                e.response?.data?.message
                                || t("cannotFinishProject")
                            );
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
            contentContainerStyle={{
                padding: 20,
                paddingTop: 60,
                paddingBottom: 40,
            }}
        >

            <TouchableOpacity
                onPress={() => router.replace("/superviseurs/projets")}
            >
                <Ionicons
                    name="arrow-back-circle"
                    size={36}
                    color="#16A34A"
                />
            </TouchableOpacity>
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    elevation: 3,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "bold",
                            flex: 1,
                        }}
                    >
                        {projet.nom}
                    </Text>

                    <View
                        style={{
                            backgroundColor:
                                projet.statut === "EN_COURS"
                                    ? "#DCFCE7"
                                    : "#FEE2E2",
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 20,
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    projet.statut === "EN_COURS"
                                        ? "#16A34A"
                                        : "#DC2626",
                                fontWeight: "bold",
                            }}
                        >
                            {statutProjet()}
                        </Text>
                    </View>
                </View>

                <Text
                    style={{
                        color: "#64748B",
                        marginTop: 10,
                        marginBottom: 20,
                    }}
                >
                    {projet.description}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Ionicons
                        name="location"
                        size={20}
                        color="#16A34A"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {projet.zoneGeographique}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Ionicons
                        name="calendar"
                        size={20}
                        color="#2563EB"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {t("start")} : {projet.dateDebut}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#DC2626"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {t("end")} : {projet.dateFin}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="pricetag"
                        size={20}
                        color="#F59E0B"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {projet.type}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 20,
                        backgroundColor: "white",
                        padding: 15,
                        borderRadius: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 12,
                        }}
                    >
                        <Ionicons
                            name="document-text"
                            size={22}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginLeft: 10,
                                fontWeight: "bold",
                            }}
                        >
                            {formulaireConfigure
                                ? t("formAttached")
                                : t("formNotAttached")}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 12,
                        }}
                    >
                        <Ionicons
                            name="help-circle"
                            size={22}
                            color="#F59E0B"
                        />

                        <Text
                            style={{
                                marginLeft: 10,
                            }}
                        >
                            {t("questions")} : {nombreChamps}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name={
                                formulaireConfigure &&
                                projet.enqueteurs?.length > 0
                                    ? "eye"
                                    : "eye-off"
                            }
                            size={22}
                            color={
                                formulaireConfigure &&
                                projet.enqueteurs?.length > 0
                                    ? "#2563EB"
                                    : "#DC2626"
                            }
                        />

                        <Text
                            style={{
                                marginLeft: 10,
                            }}
                        >
                            {formulaireConfigure &&
                            projet.enqueteurs?.length > 0
                                ? t("visibleToSurveyors")
                                : t("notVisibleToSurveyors")}
                        </Text>
                    </View>
                </View>

                {/* BAILLEUR */}

                <View
                    style={{
                        marginTop: 25,
                        paddingTop: 20,
                        borderTopWidth: 1,
                        borderTopColor: "#E5E7EB",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        {t("donor")}
                    </Text>

                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        {projet.bailleur?.nom}
                    </Text>

                    <Text
                        style={{
                            color: "#64748B",
                            marginTop: 4,
                        }}
                    >
                        {projet.bailleur?.email}
                    </Text>
                </View>

                {/* ENQUETEURS */}

                <View
                    style={{
                        marginTop: 25,
                        paddingTop: 20,
                        borderTopWidth: 1,
                        borderTopColor: "#E5E7EB",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 15,
                        }}
                    >
                        {t("assignedSurveyors")}
                    </Text>

                    {projet.enqueteurs?.length > 0 ? (

                        projet.enqueteurs.map((e: any) => (

                            <View
                                key={e.id}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Ionicons
                                        name="person-circle"
                                        size={45}
                                        color="#16A34A"
                                    />

                                    <View
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {e.nom}
                                        </Text>

                                        <Text
                                            style={{
                                                color: "#64748B",
                                            }}
                                        >
                                            {e.email}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        backgroundColor:
                                            e.compteActif
                                                ? "#DCFCE7"
                                                : "#FEE2E2",
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                e.compteActif
                                                    ? "#16A34A"
                                                    : "#DC2626",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {e.compteActif
                                            ? t("active")
                                            : t("inactive")}
                                    </Text>
                                </View>
                            </View>
                        ))

                    ) : (

                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("noSurveyorAssigned")}
                        </Text>
                    )}
                </View>
            </View>

            {projet.statut === "EN_COURS"
                && dateFinAtteinte() && (

                    <TouchableOpacity
                        onPress={confirmerTerminaison}
                        style={{
                            backgroundColor: "#F59E0B",
                            padding: 16,
                            borderRadius: 12,
                            marginTop: 20,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={23}
                            color="white"
                        />

                        <Text
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 16,
                                marginLeft: 8,
                            }}
                        >
                            {t("finishProject")}
                        </Text>
                    </TouchableOpacity>
                )}

            {/* BOUTONS */}

            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        router.push(
                            `/superviseurs/projets/${id}/modifier` as any
                        )
                    }
                    style={{
                        flex: 1,
                        backgroundColor: "#16A34A",
                        padding: 15,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {t("edit")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            t("confirmation"),
                            t("confirmDeleteProject"),
                            [
                                {
                                    text: t("no"),
                                    style: "cancel",
                                },
                                {
                                    text: t("yes"),
                                    style: "destructive",
                                    onPress: async () => {

                                        await deleteProjet(
                                            Number(id)
                                        );

                                        router.back();
                                    },
                                },
                            ]
                        );
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: "#DC2626",
                        padding: 15,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {t("delete")}
                    </Text>
                </TouchableOpacity>
            </View>
            {projet.statut === "EN_COURS" && (
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/superviseurs/projets/${id}/assigner-enqueteur` as any
                    )
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 16,
                    borderRadius: 12,
                    marginTop: 15,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {t("assignSurveyor")}
                </Text>
            </TouchableOpacity>
            )}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/superviseurs/projets/${id}/champs` as any
                    )
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 15,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {t("manageFields")}
                </Text>
            </TouchableOpacity>




            <TouchableOpacity
                onPress={envoyer}
                style={{
                    backgroundColor: "#2563EB",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Ionicons
                    name="send"
                    size={22}
                    color="white"
                />

                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginLeft: 10,
                    }}
                >
                    {t("sendToDonor")}
                </Text>
            </TouchableOpacity>


        </ScrollView>
    );
}