import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import { getCollectes } from "../../../services/collectService";
import { creerLot } from "../../../services/lotCollectService";

export default function MesCollectes() {

    const [groupes, setGroupes] = useState<any[]>([]);

    const { t } = useTranslation("enqueteur");

    useFocusEffect(
        React.useCallback(() => {
            chargerCollectes();
        }, [])
    );

    const chargerCollectes = async () => {

        try {

            const data = await getCollectes();



            const groupesProjet = Object.values(
                data.reduce((acc: any, collecte: any) => {

                    if (!acc[collecte.projetId]) {

                        acc[collecte.projetId] = {
                            projetId: collecte.projetId,
                            nomProjet: collecte.nomProjet,
                            collectes: [],
                        };
                    }

                    acc[collecte.projetId].collectes.push(
                        collecte
                    );

                    return acc;

                }, {})
            );

            setGroupes(groupesProjet);

        } catch (error) {

            console.log(error);
        }
    };

    const envoyerLot = async (projetId: number) => {

        try {

            const lot = await creerLot(projetId);

            Alert.alert(
                t("success"),
                `${t("batchSentWith")} ${lot.nombreCollectes} ${t("collections")}`
            );
            chargerCollectes();

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("noCollectionToSend")
            );
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
                {t("myCollections")}
            </Text>

            <FlatList
                data={groupes}
                keyExtractor={(item) =>
                    item.projetId.toString()
                }
                renderItem={({ item }) => {

                    const statutProjet =
                        item.collectes.some(
                            (c: any) => c.statut === "EN_REVISION"
                        )
                            ? t("revisionRequested")
                            : item.collectes.some(
                                (c: any) => c.statut === "VALIDEE"
                            )
                                ? t("validated")
                                : item.collectes.some(
                                    (c: any) => c.statut === "EN_ATTENTE"
                                )
                                    ? t("sent")
                                    : t("saved");

                    return (
                        <View
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
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="folder"
                                    size={22}
                                    color="#2563EB"
                                />

                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                    }}
                                >
                                    {item.nomProjet}
                                </Text>
                            </View>



                            <Text
                                style={{
                                    marginTop: 8,
                                    color: "#16A34A",
                                    fontWeight: "bold",
                                }}
                            >
                                {t("numberOfCollections")} : : {item.collectes.length}
                            </Text>

                            <Text
                                style={{
                                    marginTop: 8,
                                    fontWeight: "bold",
                                    color:
                                        statutProjet === "Validé"
                                            ? "#2563EB"
                                            : statutProjet === "Révision demandée"
                                                ? "#DC2626"
                                                : statutProjet === "Envoyé"
                                                    ? "#16A34A"
                                                    : "#F59E0B",
                                }}
                            >
                                {t("status")} : : {statutProjet}
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    router.push(
                                        `/enqueteurs/collectes/projet/${item.projetId}`
                                    )
                                }
                                style={{
                                    backgroundColor: "#2563EB",
                                    padding: 14,
                                    borderRadius: 12,
                                    marginTop: 15,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {t("viewCollections")}
                                </Text>
                            </TouchableOpacity>

                            {statutProjet === "Enregistré" && (
                                <TouchableOpacity
                                    onPress={() =>
                                        envoyerLot(item.projetId)
                                    }
                                    style={{
                                        backgroundColor: "#16A34A",
                                        padding: 14,
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
                                        {t("sendBatch")}
                                    </Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    );
                }}
            />
        </View>
    );
}