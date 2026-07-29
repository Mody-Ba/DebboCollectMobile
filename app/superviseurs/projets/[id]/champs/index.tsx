import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getChampsByProjet } from "../../../../../services/champService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function ChampsScreen() {

    const { id } = useLocalSearchParams();

    const [champs, setChamps] = useState<any[]>([]);

    const { t } = useTranslation("superviseur");

    useFocusEffect(
        useCallback(() => {
            chargerChamps();
        }, [id])
    );

    const chargerChamps = async () => {
        try {

            const data = await getChampsByProjet(
                Number(id)
            );


            setChamps(data);

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
            }}
        >

            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("fieldManagement")}
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    color: "red",
                    marginBottom: 20,
                }}
            >

            </Text>

            <FlatList
                data={champs}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            {item.question}
                        </Text>

                        <Text>
                            {t("type")} : {item.type}
                        </Text>
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={() =>
                    router.push(`/superviseurs/projets/${id}/champs/ajouter`)
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 10,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    + {t("addField")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/superviseurs/projets/${id}/champs/apercu`
                    )
                }
                style={{
                    backgroundColor: "#2563EB",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 10,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {t("viewForm")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}