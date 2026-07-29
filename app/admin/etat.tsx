import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getSuperviseurs } from "../../services/superviseurService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function EtatScreen() {

    const [superviseurs, setSuperviseurs] = useState<any[]>([]);
    const { t } = useTranslation("common");

    useFocusEffect(
        useCallback(() => {
            chargerSuperviseurs();
        }, [])
    );

    const chargerSuperviseurs = async () => {
        try {

            const data = await getSuperviseurs();

            const superviseursOnly = data.filter(
                (u: any) => u.role === "SUPERVISEUR"
            );

            setSuperviseurs(superviseursOnly);

        } catch (error) {

            console.log(error);
        }
    };

    const actifs = superviseurs.filter(
        (s) => s.compteActif === true
    ).length;

    const inactifs = superviseurs.filter(
        (s) => s.compteActif === false
    ).length;

    const total = superviseurs.length;

    const tauxActif =
        total > 0
            ? Math.round((actifs / total) * 100)
            : 0;

    const tauxInactif =
        total > 0
            ? Math.round((inactifs / total) * 100)
            : 0;


    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
            }}
        >
            <View
                style={{
                    padding: 20,
                    paddingTop: 60,
                }}
            >

                {/* Header */}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={34}
                            color="black"
                        />
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: "bold",
                            marginLeft: 15,
                        }}
                    >
                        {t("supervisors_status")}
                    </Text>
                </View>

                <Text
                    style={{
                        color: "#6B7280",
                        marginBottom: 25,
                        marginLeft: 50,
                    }}
                >
                    {t("supervisors_overview")}
                </Text>

                {/* Cartes statistiques */}

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25,
                    }}
                >

                    <View
                        style={{
                            width: "31%",
                            backgroundColor: "#ECFDF5",
                            borderRadius: 20,
                            padding: 15,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="checkmark-circle"
                            size={40}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                color: "#16A34A",
                                fontWeight: "bold",
                                marginTop: 8,
                            }}
                        >
                            {t("active")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                color: "#16A34A",
                            }}
                        >
                            {actifs}
                        </Text>

                        <Text
                            style={{
                                color: "#6B7280",
                            }}
                        >
                            {tauxActif}%
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "31%",
                            backgroundColor: "#FEF2F2",
                            borderRadius: 20,
                            padding: 15,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="close-circle"
                            size={40}
                            color="#DC2626"
                        />

                        <Text
                            style={{
                                color: "#DC2626",
                                fontWeight: "bold",
                                marginTop: 8,
                            }}
                        >
                            {t("inactive")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                color: "#DC2626",
                            }}
                        >
                            {inactifs}
                        </Text>

                        <Text
                            style={{
                                color: "#6B7280",
                            }}
                        >
                            {tauxInactif}%
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "31%",
                            backgroundColor: "#EFF6FF",
                            borderRadius: 20,
                            padding: 15,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="people"
                            size={40}
                            color="#2563EB"
                        />

                        <Text
                            style={{
                                color: "#2563EB",
                                fontWeight: "bold",
                                marginTop: 8,
                            }}
                        >
                            {t("total")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                color: "#2563EB",
                            }}
                        >
                            {total}
                        </Text>

                        <Text
                            style={{
                                color: "#6B7280",
                            }}
                        >
                            100%
                        </Text>
                    </View>

                </View>

                {/* Répartition */}

                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        {t("supervisors_distribution")}
                    </Text>

                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <PieChart
                            donut
                            radius={90}
                            innerRadius={55}
                            data={[
                                {
                                    value: actifs,
                                    color: "#16A34A",
                                },
                                {
                                    value: inactifs,
                                    color: "#DC2626",
                                },
                            ]}
                            centerLabelComponent={() => (
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 28,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {tauxActif}%
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#6B7280",
                                        }}
                                    >
                                        {t("active")}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: "#16A34A",
                                fontWeight: "bold",
                                marginBottom: 10,
                                fontSize: 16,
                            }}
                        >
                            ● {t("active")} : {actifs} ({tauxActif}%)
                        </Text>

                        <Text
                            style={{
                                color: "#DC2626",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            ● {t("inactive")} : {inactifs} ({tauxInactif}%)
                        </Text>
                    </View>
                </View>

                {/* Indicateurs clés */}

                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginBottom: 25,
                        }}
                    >
                        {t("key_indicators")}
                    </Text>

                    {/* Taux d'activation */}

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 25,
                        }}
                    >
                        <Ionicons
                            name="checkmark-circle"
                            size={35}
                            color="#16A34A"
                        />

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 15,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text>{t("activation_rate")}</Text>

                                <Text
                                    style={{
                                        color: "#16A34A",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {tauxActif}%
                                </Text>
                            </View>

                            <View
                                style={{
                                    height: 8,
                                    backgroundColor: "#E5E7EB",
                                    borderRadius: 10,
                                    marginTop: 8,
                                }}
                            >
                                <View
                                    style={{
                                        width: `${tauxActif}%`,
                                        height: 8,
                                        backgroundColor: "#16A34A",
                                        borderRadius: 10,
                                    }}
                                />
                            </View>

                            <Text
                                style={{
                                    marginTop: 5,
                                    color: "#6B7280",
                                }}
                            >
                                {actifs} {t("active_supervisors")}
                            </Text>
                        </View>
                    </View>

                    {/* Taux d'inactivité */}

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="close-circle"
                            size={35}
                            color="#DC2626"
                        />

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 15,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text>{t("inactivity_rate")}</Text>

                                <Text
                                    style={{
                                        color: "#DC2626",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {tauxInactif}%
                                </Text>
                            </View>

                            <View
                                style={{
                                    height: 8,
                                    backgroundColor: "#E5E7EB",
                                    borderRadius: 10,
                                    marginTop: 8,
                                }}
                            >
                                <View
                                    style={{
                                        width: `${tauxInactif}%`,
                                        height: 8,
                                        backgroundColor: "#DC2626",
                                        borderRadius: 10,
                                    }}
                                />
                            </View>

                            <Text
                                style={{
                                    marginTop: 5,
                                    color: "#6B7280",
                                }}
                            >
                                {inactifs} {t("inactive_supervisors")}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Message */}

                <View
                    style={{
                        backgroundColor: "#ECFDF5",
                        borderRadius: 20,
                        padding: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Ionicons
                        name="trending-up"
                        size={30}
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
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            {t("most_supervisors_active")}
                        </Text>

                        <Text
                            style={{
                                color: "#6B7280",
                                marginTop: 4,
                            }}
                        >
                            {t("keep_it_up")}
                        </Text>
                    </View>
                </View>

                {/* Dernière mise à jour */}

                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 40,
                    }}
                >
                    <Ionicons
                        name="time-outline"
                        size={28}
                        color="#2563EB"
                    />

                    <View
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Text
                            style={{
                                color: "#6B7280",
                            }}
                        >
                            {t("last_update")}
                        </Text>

                        <Text
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {new Date().toLocaleDateString()}
                        </Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}