import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import { router } from "expo-router";
import { createSuperviseur } from "../../services/superviseurService";
import { useTranslation } from "react-i18next";
export default function AjouterSuperviseur() {

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation("common");

    const ajouter = async () => {

        try {



            await createSuperviseur(
                {
                    nom,
                    email,
                    password,
                    role: "SUPERVISEUR",
                    compteActif: true
                },

            );

            setNom("");
            setEmail("");
            setPassword("");

            Alert.alert(
                t("success"),
                t("supervisor_created")

            );
            router.replace("/admin/superviseurs");

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("cannot_create_supervisor")
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
                    marginBottom: 30,
                }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={28}
                        color="#111827"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    {t("add_supervisor")}
                </Text>
            </View>

            {/* Carte formulaire */}
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    elevation: 2,
                }}
            >
                {/* Nom */}
                <Text
                    style={{
                        fontWeight: "600",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("full_name")}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        marginBottom: 20,
                    }}
                >
                    <Ionicons
                        name="person-outline"
                        size={22}
                        color="#6B7280"
                    />

                    <TextInput
                        placeholder={t("supervisor_name")}
                        value={nom}
                        onChangeText={setNom}
                        style={{
                            flex: 1,
                            padding: 14,
                        }}
                    />
                </View>

                {/* Email */}
                <Text
                    style={{
                        fontWeight: "600",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("email_address")}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        marginBottom: 20,
                    }}
                >
                    <Ionicons
                        name="mail-outline"
                        size={22}
                        color="#6B7280"
                    />

                    <TextInput
                        placeholder={t("email_example")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            flex: 1,
                            padding: 14,
                        }}
                    />
                </View>

                {/* Mot de passe */}
                <Text
                    style={{
                        fontWeight: "600",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("temporary_password")}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        marginBottom: 25,
                    }}
                >
                    <Ionicons
                        name="lock-closed-outline"
                        size={22}
                        color="#6B7280"
                    />

                    <TextInput
                        placeholder={t("password")}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{
                            flex: 1,
                            padding: 14,
                        }}
                    />
                </View>

                {/* Bouton */}
                <TouchableOpacity
                    onPress={ajouter}
                    style={{
                        backgroundColor: "#16A34A",
                        padding: 16,
                        borderRadius: 12,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="person-add-outline"
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
                        {t("create_supervisor")}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    textAlign: "center",
                    color: "#6B7280",
                    marginTop: 20,
                    fontSize: 13,
                }}
            >
                {t("supervisor_access_message")}
            </Text>
        </View>
    );
}