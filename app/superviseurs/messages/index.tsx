import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getConversations } from "../../../services/messageService";
import { useTranslation } from "react-i18next";

export default function MessagesScreen() {

    const [conversations, setConversations] = useState<any[]>([]);
    const { t } = useTranslation("messages");

    useEffect(() => {
        chargerConversations();
    }, []);

    const chargerConversations = async () => {

        try {

            const data = await getConversations();

            setConversations(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
                paddingTop: 60,
            }}
        >

            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: 25,
                }}
            >
                {t("title")}
            </Text>

            <FlatList
                data={conversations}
                keyExtractor={(item) =>
                    item.utilisateurId.toString()
                }
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                `/superviseurs/messages/conversation?destinataireId=${item.utilisateurId}&nom=${item.nom}` as any
                            )
                        }
                        style={{
                            backgroundColor: "white",
                            borderRadius: 18,
                            padding: 18,
                            marginBottom: 15,
                            flexDirection: "row",
                            alignItems: "center",
                            elevation: 3,
                        }}
                    >

                        <Ionicons
                            name="person-circle"
                            size={46}
                            color="#16A34A"
                        />

                        <View
                            style={{
                                marginLeft: 15,
                                flex: 1,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                {item.nom}
                            </Text>

                            <Text
                                style={{
                                    color: "#64748B",
                                    marginTop: 4,
                                }}
                            >
                                {item.dernierMessage}
                            </Text>

                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#94A3B8"
                        />

                    </TouchableOpacity>

                )}

                ListEmptyComponent={
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 80,
                        }}
                    >
                        <Ionicons
                            name="chatbubbles-outline"
                            size={60}
                            color="#94A3B8"
                        />

                        <Text
                            style={{
                                color: "#64748B",
                                fontSize: 16,
                                marginTop: 15,
                            }}
                        >
                            {t("empty")}
                        </Text>
                    </View>
                }
            />

        </View>

    );

}