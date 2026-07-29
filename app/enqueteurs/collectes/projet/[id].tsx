import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { creerLot } from "../../../../services/lotCollectService";
import { useTranslation } from "react-i18next";
import { getCollectes } from "../../../../services/collectService";

export default function CollectesParProjet() {

    const { id } = useLocalSearchParams();

    const [collectes, setCollectes] = useState<any[]>([]);

    const { t } = useTranslation("enqueteur");

    useFocusEffect(
        React.useCallback(() => {
            chargerCollectes();
        }, [id])
    );

    const chargerCollectes = async () => {

        const data = await getCollectes();

        const collectesProjet = data.filter(
            (c: any) => c.projetId === Number(id)
        );

        setCollectes(collectesProjet);
    };

    const envoyerLot = async () => {

        try {

            const lot = await creerLot(Number(id));

            Alert.alert(
                t("success"),
                `${lot.nombreCollectes} ${t("collectionsSent")}`
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

    const getStatut = (statut: string) => {

        switch (statut) {

            case "ENREGISTREE":
                return t("saved");

            case "EN_ATTENTE":
                return t("sent");

            case "VALIDEE":
                return t("validatedStatus");

            case "EN_REVISION":
                return t("revisionRequested");

            default:
                return statut;
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
                {t("projectCollections")}
            </Text>

            <FlatList
                data={collectes}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                `/enqueteurs/collectes/${item.id}`
                            )
                        }
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {t("collection")}
                        </Text>

                        <Text
                            style={{
                                marginTop: 8,
                                fontWeight: "bold",
                            }}
                        >
                            {t("status")} : : {getStatut(item.statut)}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                onPress={envoyerLot}
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
                        fontSize: 16,
                    }}
                >
                    {t("sendSavedCollections")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}