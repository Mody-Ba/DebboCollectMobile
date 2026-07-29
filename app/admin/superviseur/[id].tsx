import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    getSuperviseurById,
    activateSuperviseur,
    deactivateSuperviseur
} from "../../../services/superviseurService";
import { router } from "expo-router";
import { deleteSuperviseur } from "../../../services/superviseurService";
import { useTranslation } from "react-i18next";
export default function DetailSuperviseur() {

    const { id } = useLocalSearchParams();

    const [superviseur, setSuperviseur] = useState<any>(null);

    const { t } = useTranslation("common");

    useEffect(() => {
        chargerSuperviseur();
    }, [id]);

    const chargerSuperviseur = async () => {

        try {


            console.log("ID RECU =", id);
            const data = await getSuperviseurById(
                Number(id),

            );

            console.log("DETAIL =", data);

            setSuperviseur(data);

        } catch (error) {

            console.log(error);

        }
    };
    const changerStatut = async () => {

        try {


            if (superviseur.compteActif) {

                await deactivateSuperviseur(
                    superviseur.id,

                );

                Alert.alert(
                    "Succès",
                    "Superviseur désactivé"
                );

            } else {

                await activateSuperviseur(
                    superviseur.id,
                );

                Alert.alert(
                    t("success"),
                    t("supervisor_deactivated")
                );
            }

            chargerSuperviseur();

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("cannot_change_status")
            );
        }
    };

    if (!superviseur) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{t("loading")}</Text>
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                padding: 20,
                marginTop: 40,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 25,
                }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={28}
                        color="black"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    {t("supervisor_details")}
                </Text>

                <TouchableOpacity>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            {/* Avatar */}
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 25,
                }}
            >
                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: "#DDF3E2",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="person"
                        size={70}
                        color="#16A34A"
                    />
                </View>

                <Text
                    style={{
                        marginTop: 15,
                        fontSize: 28,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    {superviseur.nom}
                </Text>

                <View
                    style={{
                        marginTop: 10,
                        backgroundColor: superviseur.compteActif
                            ? "#DCFCE7"
                            : "#FEE2E2",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        borderRadius: 20,
                    }}
                >
                    <Text
                        style={{
                            color: superviseur.compteActif
                                ? "#16A34A"
                                : "#DC2626",
                            fontWeight: "600",
                        }}
                    >
                        {superviseur.compteActif
                            ? t("active")
                            : t("inactive")}
                    </Text>
                </View>
            </View>

            {/* Carte informations */}
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 20,
                    marginBottom: 25,
                    elevation: 2,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <Ionicons
                        name="mail-outline"
                        size={22}
                        color="#6B7280"
                    />

                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 16,
                        }}
                    >
                        {superviseur.email}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <Ionicons
                        name="people-outline"
                        size={22}
                        color="#6B7280"
                    />

                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 16,
                        }}
                    >
                        {superviseur.role}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={22}
                        color={
                            superviseur.compteActif
                                ? "#16A34A"
                                : "#DC2626"
                        }
                    />

                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 16,
                        }}
                    >
                        {t("active_account")}:
                        {" "}
                        {superviseur.compteActif
                            ? t("yes")
                            : t("no")}
                    </Text>
                </View>
            </View>

            {/* Modifier */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/admin/modifier-superviseur/${superviseur.id}` as any
                    )
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 12,
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Ionicons
                    name="create-outline"
                    size={22}
                    color="white"
                />

                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: 8,
                        fontSize: 16,
                    }}
                >
                    {t("edit")}
                </Text>
            </TouchableOpacity>

            {/* Activer / Désactiver */}
            <TouchableOpacity
                onPress={changerStatut}
                style={{
                    borderWidth: 1,
                    borderColor: "#16A34A",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 12,
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Ionicons
                    name={
                        superviseur.compteActif
                            ? "pause-circle-outline"
                            : "play-circle-outline"
                    }
                    size={22}
                    color="#16A34A"
                />

                <Text
                    style={{
                        color: "#16A34A",
                        fontWeight: "bold",
                        marginLeft: 8,
                        fontSize: 16,
                    }}
                >
                    {superviseur.compteActif
                        ? t("deactivate")
                        : t("activate")}
                </Text>
            </TouchableOpacity>

            {/* Supprimer */}
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        t("confirmation"),
                        t("delete_supervisor_confirm"),
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
                                        await deleteSuperviseur(Number(id));

                                        Alert.alert(
                                            t("success"),
                                            t("supervisor_deleted")
                                        );
                                        router.back();
                                    } catch (error) {
                                        console.error(error);

                                        Alert.alert(
                                            t("error"),
                                            t("cannot_delete_supervisor")
                                        );
                                    }
                                },
                            },
                        ]
                    );
                }}
                style={{
                    borderWidth: 1,
                    borderColor: "#DC2626",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Ionicons
                    name="trash-outline"
                    size={22}
                    color="#DC2626"
                />

                <Text
                    style={{
                        color: "#DC2626",
                        fontWeight: "bold",
                        marginLeft: 8,
                        fontSize: 16,
                    }}
                >
                    {t("delete")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}