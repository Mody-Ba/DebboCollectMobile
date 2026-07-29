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
import { createEnqueteur } from "../../../services/userService";
import { useTranslation } from "react-i18next";

export default function AjouterEnqueteurScreen() {

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation("superviseur");

    const enregistrerEnqueteur = async () => {
        try {

            const enqueteur = {
                nom,
                email,
                password,
                role: "ADMIN",
                compteActif: true,
            };

            await createEnqueteur(enqueteur);

            Alert.alert(
                t("success"),
                t("surveyorCreated")
            );

            router.replace("/superviseurs/enqueteurs");

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("surveyorCreateError")
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
                {t("addSurveyor")}
            </Text>

            <Text>{t("name")}</Text>

            <TextInput
                value={nom}
                onChangeText={setNom}
                placeholder={t("name")}
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 5,
                    marginBottom: 15,
                }}
            />

            <Text>{t("email")}</Text>

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
                    marginTop: 5,
                    marginBottom: 15,
                }}
            />

            <Text>{t("password")}</Text>

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t("password")}
                secureTextEntry
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 5,
                    marginBottom: 25,
                }}
            />

            <TouchableOpacity
                onPress={enregistrerEnqueteur}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 12,
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
                    {t("save")}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}