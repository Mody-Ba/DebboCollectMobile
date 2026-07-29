import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import { getLots } from "../../../services/lotCollectService";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
export default function CollectesSuperviseur() {

    const [lots, setLots] = useState<any[]>([]);
    const { t } = useTranslation("superviseur");

    useFocusEffect(
        React.useCallback(() => {
            chargerLots();
        }, [])
    );
    const chargerLots = async () => {

        const data = await getLots();

        setLots(data);
    };
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: "#F5F7FA",
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("collectionsToValidate")}
            </Text>

            <FlatList
                data={lots}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(`/superviseurs/collectes/${item.id}` as any)
                        }
                        style={{
                            backgroundColor: "white",
                            borderRadius: 18,
                            padding: 18,
                            marginBottom: 15,
                            elevation: 3,
                        }}
                    >
                        {/* HEADER */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="cube"
                                    size={40}
                                    color="#16A34A"
                                />

                                <View
                                    style={{
                                        marginLeft: 12,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {t("batch")}
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#64748B",
                                        }}
                                    >
                                        {item.nomEnqueteur}
                                    </Text>
                                </View>
                            </View>

                            <Ionicons
                                name="chevron-forward-circle"
                                size={28}
                                color="#2563EB"
                            />
                        </View>

                        {/* INFOS */}
                        <View
                            style={{
                                marginTop: 18,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Ionicons
                                    name="folder"
                                    size={20}
                                    color="#2563EB"
                                />

                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                    }}
                                >
                                    {t("project")} : {item.nomProjet}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Ionicons
                                    name="person"
                                    size={20}
                                    color="#EA580C"
                                />

                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                    }}
                                >
                                    {item.nomEnqueteur}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Ionicons
                                    name="document-text"
                                    size={20}
                                    color="#9333EA"
                                />

                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                    }}
                                >
                                    {item.nombreCollectes} {t("collections")}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name={
                                        item.statut === "EN_ATTENTE"
                                            ? "time"
                                            : "checkmark-circle"
                                    }
                                    size={20}
                                    color={
                                        item.statut === "EN_ATTENTE"
                                            ? "#F59E0B"
                                            : "#16A34A"
                                    }
                                />

                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color:
                                            item.statut === "EN_ATTENTE"
                                                ? "#F59E0B"
                                                : "#16A34A",
                                    }}
                                >
                                    {t(item.statut)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}