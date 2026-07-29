import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { login, saveToken ,saveRole} from "../services/authService";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../i18n";
import i18n from "../i18n";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation("auth");
    const [language, setLanguage] = useState<"fr" | "en" | "ar">(
        i18n.language as "fr" | "en" | "ar"
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F8FAFC",
                justifyContent: "center",
                padding: 24,
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 30,
                        gap: 12,
                    }}
                >
                    {[
                        { code: "fr", label: "🇫🇷 Français" },
                        { code: "en", label: "🇬🇧 English" },
                        { code: "ar", label: "🇸🇦 العربية" },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.code}
                            onPress={async () => {
                                setLanguage(item.code as "fr" | "en" | "ar");
                                await changeLanguage(item.code as "fr" | "en" | "ar");
                            }}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 16,
                                borderRadius: 25,
                                borderWidth: 2,
                                borderColor:
                                    language === item.code ? "#16A34A" : "#D1D5DB",
                                backgroundColor:
                                    language === item.code ? "#16A34A" : "white",
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        language === item.code ? "white" : "#374151",
                                    fontWeight: "600",
                                }}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Ionicons
                    name="leaf"
                    size={60}
                    color="#16A34A"
                />

                <Text
                    style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "#111827",
                        marginTop: 10,
                    }}
                >
                    DebboCollect
                </Text>

                <Text
                    style={{
                        fontSize: 16,
                        color: "#6B7280",
                        marginTop: 5,
                    }}
                >
                    {t("subtitle")}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("email")}
                </Text>

                <TextInput
                    placeholder={t("email_placeholder")}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 12,
                        padding: 14,
                        marginBottom: 20,
                        backgroundColor: "#F9FAFB",
                    }}
                />

                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: 8,
                        color: "#374151",
                    }}
                >
                    {t("password")}
                </Text>

                <TextInput
                    placeholder={t("password_placeholder")}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 12,
                        padding: 14,
                        marginBottom: 25,
                        backgroundColor: "#F9FAFB",
                    }}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: "#16A34A",
                        padding: 16,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                    onPress={async () => {
                        try {
                            const data = await login(
                                email,
                                password
                            );

                            await saveToken(data.token);
                            await saveRole(data.role);
                            console.log("ROLE RECU =", data.role);

                            if (data.role === "ADMIN") {

                                router.replace("/admin");

                            } else if (data.role === "SUPERVISEUR") {

                                router.replace("/superviseurs");

                            } else if (data.role === "ENQUETEUR") {

                                router.replace("/enqueteurs");

                            }else if (data.role === "BAILLEUR") {
                                router.replace("/bailleur");
                            }
                        } catch (error: any) {

                            console.log("DATA =", error?.response?.data);

                            const status = error?.response?.status;
                            const message = error?.response?.data?.message || "";

                            if (
                                status === 401 ||
                                message.includes("Bad credentials") ||
                                message.includes("Email ou mot de passe incorrect")
                            ) {
                                Alert.alert(
                                    t("error"),
                                    t("invalidCredentials")
                                );

                            } else if (message.includes("Compte désactivé")) {

                                Alert.alert(
                                    t("accountDisabled"),
                                    message
                                );

                            } else {

                                Alert.alert(
                                    t("error"),
                                    message || t("genericError")
                                );
                            }
                        }
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        {t("login")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}