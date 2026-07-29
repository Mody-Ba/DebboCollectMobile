import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { router } from "expo-router";
import { createBailleur } from "../../../services/userService";
import { useTranslation } from "react-i18next";

export default function AjouterBailleurScreen() {

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation("superviseur");

    const enregistrerBailleur = async () => {
        try {
            const bailleur = {
                nom,
                email,
                password,
                role: "ADMIN",
                compteActif: true,
            };

            await createBailleur(bailleur);

            Alert.alert(
                t("success"),
                t("donorCreated")
            );

            router.back();

        } catch (error: any) {

            console.log("ERREUR COMPLETE =", error);

            console.log("REPONSE =", error?.response?.data);

            Alert.alert(
                t("error"),
                JSON.stringify(error?.response?.data)
            );
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
                paddingTop: 60,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 25,
                }}
            >
                {t("addDonor")}
            </Text>

            <Text style={{ marginBottom: 5 }}>{t("name")}</Text>
            <TextInput
                value={nom}
                onChangeText={setNom}
                placeholder={t("donorName")}
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>{t("email")}</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>{t("password")}</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t("password")}
                secureTextEntry
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 25,
                }}
            />

            <TouchableOpacity
                onPress={enregistrerBailleur}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 30,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {t("save")}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}