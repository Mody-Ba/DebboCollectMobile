import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";

import {
    getLotById,
    validerLot,
    demanderRevisionLot,
} from "../../../services/lotCollectService";
import { Ionicons } from "@expo/vector-icons";

export default function DetailLotSuperviseur() {

    const { id } = useLocalSearchParams();

    const [lot, setLot] = useState<any>(null);

    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerLot();
    }, [id]);

    const chargerLot = async () => {

        try {

            const data = await getLotById(
                Number(id)
            );

            setLot(data);

        } catch (error) {

            console.log(error);
        }
    };

    const valider = async () => {
        try {
            const lotValide = await validerLot(
                Number(id)
            );

            setLot(lotValide);

            Alert.alert(
                t("success"),
                t("batchValidated")
            );

        } catch (error: any) {
            console.log(error.response?.data);

            Alert.alert(
                t("information"),
                error.response?.data?.message ===
                "Ce lot est déjà validé"
                    ? t("batchAlreadyValidated")
                    : error.response?.data?.message ||
                    t("error")
            );
        }
    };

    const revision = async () => {

        try {

            await demanderRevisionLot(
                Number(id)
            );

            Alert.alert(
                t("success"),
                t("revisionRequested")
            );
            router.replace(
                "/superviseurs/collectes"
            );

        } catch (error: any) {

            console.log(error.response?.data);

            Alert.alert(
                t("information"),
                error.response?.data?.message ||
                t("error")
            );
        }
    };

    if (!lot) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{t("loading")}...</Text>
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
            }}
        >
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 20,
                        color: "#1E293B",
                    }}
                >
                    {t("batchInformation")}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <Ionicons
                        name="folder-open"
                        size={24}
                        color="#16A34A"
                    />

                    <View
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Text
                            style={{
                                color: "#94A3B8",
                                fontSize: 13,
                            }}
                        >
                            {t("project")}
                        </Text>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#0F172A",
                            }}
                        >
                            {lot.nomProjet}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <Ionicons
                        name="person-circle"
                        size={24}
                        color="#2563EB"
                    />

                    <View
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Text
                            style={{
                                color: "#94A3B8",
                                fontSize: 13,
                            }}
                        >
                            {t("surveyor")}
                        </Text>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#0F172A",
                            }}
                        >
                            {lot.nomEnqueteur}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="layers"
                        size={24}
                        color="#7C3AED"
                    />

                    <View
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Text
                            style={{
                                color: "#94A3B8",
                                fontSize: 13,
                            }}
                        >
                            {t("numberOfCollections")}
                        </Text>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#0F172A",
                            }}
                        >
                            {lot.nombreCollectes}
                        </Text>
                    </View>
                </View>

            </View>





            <FlatList
                data={lot.collectes}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                `/superviseurs/collectes/collecte/${item.id}`
                            )
                        }
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 18,
                            padding: 18,
                            marginBottom: 15,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.08,
                            shadowRadius: 8,
                            elevation: 5,
                        }}
                    >

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
                                    flex: 1,
                                }}
                            >

                                <View
                                    style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 15,
                                        backgroundColor: "#DCFCE7",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 15,
                                    }}
                                >
                                    <Ionicons
                                        name="clipboard"
                                        size={28}
                                        color="#16A34A"
                                    />
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#0F172A",
                                        }}
                                    >
                                        {t("collection")}
                                    </Text>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: 8,
                                        }}
                                    >
                                        <Ionicons
                                            name="folder-open"
                                            size={16}
                                            color="#64748B"
                                        />

                                        <Text
                                            style={{
                                                marginLeft: 6,
                                                color: "#64748B",
                                            }}
                                        >
                                            {item.nomProjet}
                                        </Text>
                                    </View>

                                </View>

                            </View>

                            <Ionicons
                                name="chevron-forward-circle"
                                size={30}
                                color="#CBD5E1"
                            />

                        </View>

                        <View
                            style={{
                                marginTop: 18,
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
                                    name="shield-checkmark"
                                    size={18}
                                    color="#16A34A"
                                />

                                <Text
                                    style={{
                                        marginLeft: 6,
                                        color: "#64748B",
                                    }}
                                >
                                    {t("status")}
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor:
                                        item.statut === "VALIDE"
                                            ? "#DCFCE7"
                                            : "#FEF3C7",
                                    paddingHorizontal: 12,
                                    paddingVertical: 5,
                                    borderRadius: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            item.statut === "VALIDE"
                                                ? "#16A34A"
                                                : "#D97706",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {t(item.statut)}
                                </Text>
                            </View>

                        </View>

                    </TouchableOpacity>

                )}
            />

            <TouchableOpacity
                onPress={valider}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 18,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 15,
                    shadowColor: "#16A34A",
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 4,
                }}
            >

                <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="white"
                />

                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                    }}
                >
                    {t("validateBatch")}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={revision}
                style={{
                    backgroundColor: "#DC2626",
                    padding: 18,
                    borderRadius: 18,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    shadowColor: "#DC2626",
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    elevation: 4,
                }}
            >

                <Ionicons
                    name="refresh-circle"
                    size={24}
                    color="white"
                />

                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginLeft: 10,
                    }}
                >
                    {t("requestRevision")}
                </Text>

            </TouchableOpacity>
        </View>
    );
}