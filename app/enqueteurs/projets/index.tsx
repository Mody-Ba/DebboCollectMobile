import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getProjets } from "../../../services/projetService";
import { useTranslation } from "react-i18next";

export default function MesProjetsScreen() {

    const [projets, setProjets] = useState<any[]>([]);
    const { t } = useTranslation("enqueteur");

    useFocusEffect(
        React.useCallback(() => {
            chargerProjets();
        }, [])
    );

    const chargerProjets = async () => {
        try {

            const data = await getProjets();

            setProjets(data);

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
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 5,
                }}
            >
                {t("myProjects")}
            </Text>

            <Text
                style={{
                    color: "#64748B",
                    marginBottom: 20,
                }}
            >
                {t("numberOfProjects")} : {projets.length}
            </Text>

            <FlatList
                data={projets}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                `/enqueteurs/projets/${item.id}`
                            )
                        }
                        style={{
                            backgroundColor: "white",
                            padding: 18,
                            borderRadius: 16,
                            marginBottom: 15,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 3,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
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

                            <Ionicons
                                name="chevron-forward"
                                size={22}
                                color="#94A3B8"
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Ionicons
                                name="location"
                                size={18}
                                color="#16A34A"
                            />

                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: "#475569",
                                }}
                            >
                                {item.zoneGeographique}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Ionicons
                                name="calendar"
                                size={18}
                                color="#F59E0B"
                            />

                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: "#475569",
                                }}
                            >
                                {item.dateDebut} - {item.dateFin}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Ionicons
                                name="clipboard"
                                size={18}
                                color="#2563EB"
                            />

                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: "#475569",
                                }}
                            >
                                {item.type}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}