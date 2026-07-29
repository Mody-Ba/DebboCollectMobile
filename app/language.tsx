import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageScreen() {
    const { setLanguage } = useLanguage();

    const choisir = async (lang: "fr" | "en" | "ar") => {
        await setLanguage(lang);
        router.replace("/login");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 50,
                }}
            >
                🌍 Choisissez votre langue
            </Text>

            <TouchableOpacity
                onPress={() => choisir("fr")}
                style={{
                    width: "100%",
                    padding: 18,
                    backgroundColor: "#2563EB",
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    🇫🇷 Français
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => choisir("en")}
                style={{
                    width: "100%",
                    padding: 18,
                    backgroundColor: "#16A34A",
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    🇬🇧 English
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => choisir("ar")}
                style={{
                    width: "100%",
                    padding: 18,
                    backgroundColor: "#EA580C",
                    borderRadius: 12,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    🇸🇦 العربية
                </Text>
            </TouchableOpacity>
        </View>
    );
}