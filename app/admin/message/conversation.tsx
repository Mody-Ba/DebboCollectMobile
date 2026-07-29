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

export default function ConversationAdminScreen() {

    const { destinataireId, nom } =
        useLocalSearchParams<{
            destinataireId: string;
            nom: string;
        }>();

    const [messages, setMessages] = useState<any[]>([]);
    const [contenu, setContenu] = useState("");
    const [chargement, setChargement] = useState(true);
    const [envoiEnCours, setEnvoiEnCours] = useState(false);
    const { t } = useTranslation("common");

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

            console.log(
                "Erreur chargement conversation admin :",
                error
            );

        } finally {

            setChargement(false);

        }

    };

    const envoyer = async () => {

        const messageNettoye = contenu.trim();

        if (!messageNettoye || envoiEnCours) {
            return;
        }

        try {

            setEnvoiEnCours(true);

            await envoyerMessage(
                messageNettoye,
                Number(destinataireId)
            );

            setContenu("");

            await chargerConversation();

        } catch (error) {

            console.log(
                "Erreur envoi message admin :",
                error
            );

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
            keyboardVerticalOffset={
                Platform.OS === "ios"
                    ? 90
                    : 0
            }
        >
            <View
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    paddingTop: 55,
                    paddingBottom: 18,
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

                <Text
                    style={{
                        color: "#64748B",
                        marginTop: 4,
                    }}
                >
                    {t("supervisor")}
                </Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 30,
                    flexGrow: 1,
                }}
                ListEmptyComponent={
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("start_conversation")}
                        </Text>
                    </View>
                }
                renderItem={({ item }) => {

                    const messageAdmin =
                        Number(item.expediteurId) !==
                        Number(destinataireId);

                    return (
                        <View
                            style={{
                                alignSelf: messageAdmin
                                    ? "flex-end"
                                    : "flex-start",
                                backgroundColor: messageAdmin
                                    ? "#16A34A"
                                    : "white",
                                paddingHorizontal: 15,
                                paddingVertical: 11,
                                borderRadius: 18,
                                marginBottom: 10,
                                maxWidth: "80%",
                                elevation: 1,
                            }}
                        >
                            <Text
                                style={{
                                    color: messageAdmin
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
                    backgroundColor: "white",
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                }}
            >
                <TextInput
                    value={contenu}
                    onChangeText={setContenu}
                    placeholder={t("message")}
                    multiline
                    style={{
                        flex: 1,
                        backgroundColor: "#F1F5F9",
                        borderRadius: 24,
                        paddingHorizontal: 18,
                        paddingVertical: 12,
                        maxHeight: 100,
                    }}
                />

                <TouchableOpacity
                    onPress={envoyer}
                    disabled={
                        !contenu.trim() ||
                        envoiEnCours
                    }
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor:
                            contenu.trim() &&
                            !envoiEnCours
                                ? "#16A34A"
                                : "#94A3B8",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                    }}
                >
                    {envoiEnCours ? (
                        <ActivityIndicator
                            size="small"
                            color="white"
                        />
                    ) : (
                        <Ionicons
                            name="send"
                            size={22}
                            color="white"
                        />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}