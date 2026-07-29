import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import {
    getConversation,
    envoyerMessage,
} from "../../../services/messageService";

export default function ConversationScreen() {

    const { destinataireId, nom } =
        useLocalSearchParams<{
            destinataireId: string;
            nom: string;
        }>();

    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [chargement, setChargement] = useState(true);
    const [envoiEnCours, setEnvoiEnCours] = useState(false);
    const { t } = useTranslation("bailleur");

    useEffect(() => {

        if (destinataireId) {
            chargerConversation();
        }

    }, [destinataireId]);

    const chargerConversation = async () => {

        try {

            setChargement(true);

            const data = await getConversation(
                Number(destinataireId)
            );

            setMessages(data);

        } catch (error) {

            console.log(error);

        } finally {

            setChargement(false);

        }

    };

    const envoyer = async () => {

        if (!message.trim()) return;

        try {

            setEnvoiEnCours(true);

            await envoyerMessage(
                message,
                Number(destinataireId)
            );

            setMessage("");

            await chargerConversation();

        } catch (error) {

            console.log(error);

        } finally {

            setEnvoiEnCours(false);

        }

    };

    if (chargement) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F5F7FA",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#16A34A"
                />
            </View>
        );

    }

    return (

        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >

            <View
                style={{
                    padding: 20,
                    paddingTop: 60,
                    backgroundColor: "white",
                    elevation: 4,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    {nom}
                </Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 90,
                }}
                renderItem={({ item }) => {

                    const moi =
                        Number(item.destinataireId) !==
                        Number(destinataireId);

                    return (

                        <View
                            style={{
                                alignSelf: moi
                                    ? "flex-end"
                                    : "flex-start",
                                backgroundColor: moi
                                    ? "#16A34A"
                                    : "white",
                                padding: 14,
                                borderRadius: 18,
                                marginBottom: 10,
                                maxWidth: "80%",
                                elevation: 2,
                            }}
                        >

                            <Text
                                style={{
                                    color: moi
                                        ? "white"
                                        : "#111827",
                                    fontSize: 16,
                                }}
                            >
                                {item.contenu}
                            </Text>

                        </View>

                    );

                }}
            />

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >

                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder={t("messagePlaceholder")}
                    style={{
                        flex: 1,
                        backgroundColor: "#F1F5F9",
                        borderRadius: 25,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                    }}
                />

                <TouchableOpacity
                    disabled={envoiEnCours}
                    onPress={envoyer}
                    style={{
                        backgroundColor: "#16A34A",
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                    }}
                >
                    {
                        envoiEnCours
                            ? (
                                <ActivityIndicator
                                    color="white"
                                />
                            )
                            : (
                                <Ionicons
                                    name="send"
                                    size={22}
                                    color="white"
                                />
                            )
                    }

                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>

    );

}