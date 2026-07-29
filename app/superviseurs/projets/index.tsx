import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { getProjets } from "../../../services/projetService";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function ProjetsScreen() {

    const [projets, setProjets] = useState([]);
    const { t } = useTranslation("superviseur");

    useFocusEffect(
        useCallback(() => {
            chargerProjets();
        }, [])
    );

    const chargerProjets = async () => {
        try {
            const data = await getProjets();

            console.log("PROJETS =", data);

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
                    marginBottom: 20,
                }}
            >
                {t("myProjects")}
            </Text>

            <TouchableOpacity
                onPress={() =>
                    router.push("/superviseurs/projets/ajouter-projet")
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 20,
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
                    + {t("addProject")}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={projets}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                renderItem={({ item }: any) => (

                    <TouchableOpacity

                        onPress={() =>
                            router.push(
                                `/superviseurs/projets/${item.id}` as any
                            )
                        }
                        style={{
                            backgroundColor: "white",
                            borderRadius: 20,
                            padding: 18,
                            marginBottom: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.08,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                }}
                            >
                                {/* Icône projet */}
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        backgroundColor: "#DCFCE7",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 12,
                                    }}
                                >
                                    <Ionicons
                                        name="folder-open"
                                        size={30}
                                        color="#16A34A"
                                    />
                                </View>

                                {/* Infos */}
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: "#0F172A",
                                        }}
                                    >
                                        {item.nom}
                                    </Text>

                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            color: "#64748B",
                                            marginTop: 5,
                                            lineHeight: 22,
                                        }}
                                    >
                                        {item.description}
                                    </Text>

                                    {/* Zone */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Ionicons
                                            name="location-outline"
                                            size={18}
                                            color="#16A34A"
                                        />

                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: "#475569",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.zoneGeographique}
                                        </Text>
                                    </View>

                                    {/* Date début */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 8,
                                        }}
                                    >
                                        <Ionicons
                                            name="calendar-outline"
                                            size={18}
                                            color="#16A34A"
                                        />

                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: "#475569",
                                            }}
                                        >
                                            {t("start")} : {item.dateDebut}
                                        </Text>
                                    </View>

                                    {/* Date fin */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 5,
                                        }}
                                    >
                                        <Ionicons
                                            name="calendar-outline"
                                            size={18}
                                            color="#EF4444"
                                        />

                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                color: "#475569",
                                            }}
                                        >
                                            {t("end")} : {item.dateFin}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={26}
                                color="#94A3B8"
                            />
                        </View>

                        {/* Badge type */}
                        <View
                            style={{
                                marginTop: 18,
                                alignSelf: "flex-start",
                                backgroundColor: "#DCFCE7",
                                paddingHorizontal: 14,
                                paddingVertical: 7,
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#16A34A",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
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