import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

import {
    getSuperviseurById,
    updateSuperviseur
} from "../../../services/superviseurService";
import { useTranslation } from "react-i18next";
export default function ModifierSuperviseur() {

    const { id } = useLocalSearchParams();

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [compteActif, setCompteActif] = useState(true);
    const { t } = useTranslation("common");


    useEffect(() => {
        chargerSuperviseur();
    }, [id]);
    const chargerSuperviseur = async () => {

        try {

            const data = await getSuperviseurById(
                Number(id),

            );

            console.log("DETAIL =", data);

            setNom(data.nom);
            setEmail(data.email);
            setCompteActif(data.compteActif);

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("cannot_load_supervisor")
            );
        }
    };

    const modifier = async () => {

        try {

            await updateSuperviseur(
                Number(id),
                {
                    nom,
                    email,
                    compteActif
                }
            );

            Alert.alert(
                t("success"),
                t("supervisor_updated")
            );

            router.back();

        } catch (error) {

            console.log("ERREUR MODIFICATION =", error);

            Alert.alert(
                t("error"),
                t("update_impossible")
            );
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                paddingHorizontal: 20,
                paddingTop: 60,
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
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
                        color="#000"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    {t("edit_supervisor")}
                </Text>
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
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: "#DCFCE7",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="person"
                        size={55}
                        color="#16A34A"
                    />
                </View>

                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    {nom}
                </Text>

                <View
                    style={{
                        marginTop: 8,
                        backgroundColor: compteActif
                            ? "#DCFCE7"
                            : "#FEE2E2",
                        paddingHorizontal: 15,
                        paddingVertical: 6,
                        borderRadius: 20,
                    }}
                >
                    <Text
                        style={{
                            color: compteActif
                                ? "#16A34A"
                                : "#DC2626",
                            fontWeight: "bold",
                        }}
                    >
                        {compteActif ? t("active") : t("inactive")}
                    </Text>
                </View>
            </View>

            {/* Carte */}
            <View
                style={{
                    backgroundColor: "#FFF",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 25,
                    elevation: 2,
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("name")}
                </Text>

                <TextInput
                    value={nom}
                    onChangeText={setNom}
                    placeholder={t("name")}
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 20,
                        backgroundColor: "#FFF",
                    }}
                />

                <Text
                    style={{
                        fontWeight: "bold",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("email")}
                </Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("email")}
                    keyboardType="email-address"
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 12,
                        padding: 15,
                        backgroundColor: "#FFF",
                    }}
                />
            </View>

            {/* Bouton */}
            <TouchableOpacity
                onPress={modifier}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Ionicons
                    name="save-outline"
                    size={22}
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
                    {t("save_changes")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}