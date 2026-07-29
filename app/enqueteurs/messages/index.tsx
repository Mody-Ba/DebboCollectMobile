import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getConversations } from "../../../services/messageService";

export default function MessagesScreen() {

    const [conversations, setConversations] = useState<any[]>([]);

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
                Messages
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
                                `/enqueteurs/messages/conversation?destinataireId=${item.utilisateurId}&nom=${item.nom}` as any
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
            />

        </View>

    );

}