import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getDashboardAccueil } from "@/services/statistiqueService";
import { getNombreMessagesNonLus } from "@/services/messageService";
import SideMenu from "@/components/SideMenu";
import { useTranslation } from "react-i18next";
export default function SuperviseurScreen() {

    const [dashboard, setDashboard] = useState<any>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [nombreNonLus, setNombreNonLus] = useState(0);
    const { t } = useTranslation("superviseur");

    useFocusEffect(
        useCallback(() => {
            chargerDashboard();
        }, [])
    );

    const chargerDashboard = async () => {

        try {

            const data = await getDashboardAccueil();

            setDashboard(data);

            const nombre = await getNombreMessagesNonLus();

            setNombreNonLus(nombre);

        } catch (e) {

            console.log(e);

        }

    };
    const deconnexion = async () => {

        await AsyncStorage.removeItem("token");

        router.replace("/login");
    };
    return (
        <View style={{ flex: 1 }}>

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                role="SUPERVISEUR"
            />

            <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
        >
            <View
                style={{
                    paddingTop: 60,
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                }}
            >
                {/* HEADER */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 25,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                    >
                        <Ionicons
                            name="menu"
                            size={34}
                            color="black"
                        />
                    </TouchableOpacity>

                    <Text
                        style={{
                            color: "#16A34A",
                            fontSize: 24,
                            fontWeight: "bold",
                        }}
                    >
                        DebboCollect
                    </Text>

                    <View>

                        <Ionicons
                            name="notifications-outline"
                            size={30}
                            color="black"
                        />

                        {nombreNonLus > 0 && (

                            <View
                                style={{
                                    position: "absolute",
                                    top: -6,
                                    right: -8,
                                    backgroundColor: "#DC2626",
                                    minWidth: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingHorizontal: 4,
                                }}
                            >

                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 11,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {nombreNonLus}
                                </Text>

                            </View>

                        )}

                    </View>
                </View>

                {/* TITRE */}
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: "bold",
                    }}
                >
                    {t("hello")}
                </Text>

                <Text
                    style={{
                        color: "#64748B",
                        marginTop: 5,
                        marginBottom: 25,
                        fontSize: 16,
                    }}
                >
                    {t("overview")}
                </Text>

                {/* STATISTIQUES */}
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginBottom: 15,
                    }}
                >
                    {t("statistics")}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                >
                    {/* PROJETS */}
                    <TouchableOpacity
                        onPress={() => router.push("/superviseurs/projets")}
                        style={{
                            backgroundColor: "white",
                            width: "48%",
                            borderRadius: 20,
                            padding: 20,
                            elevation: 3,
                        }}
                    >
                        <Ionicons
                            name="folder"
                            size={40}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginTop: 10,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {t("projects")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {dashboard?.nombreProjets ?? 0}
                        </Text>

                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("totalProjects")}
                        </Text>
                    </TouchableOpacity>

                    {/* ENQUETEURS */}
                    <TouchableOpacity
                        onPress={() => router.push("/superviseurs/enqueteurs")}
                        style={{
                            backgroundColor: "white",
                            width: "48%",
                            borderRadius: 20,
                            padding: 20,
                            elevation: 3,
                        }}
                    >
                        <Ionicons
                            name="people"
                            size={40}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginTop: 10,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {t("surveyors")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {dashboard?.nombreEnqueteurs ?? 0}
                        </Text>

                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("totalSurveyors")}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 25,
                    }}
                >
                    {/* COLLECTES */}
                    <TouchableOpacity
                        onPress={() => router.push("/superviseurs/collectes")}
                        style={{
                            backgroundColor: "white",
                            width: "48%",
                            borderRadius: 20,
                            padding: 20,
                            elevation: 3,
                        }}
                    >
                        <Ionicons
                            name="stats-chart"
                            size={40}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginTop: 10,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {t("collections")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {dashboard?.nombreCollectes ?? 0}
                        </Text>

                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("completed")}
                        </Text>
                    </TouchableOpacity>

                    {/* BAILLEURS */}
                    <TouchableOpacity
                        onPress={() => router.push("/superviseurs/bailleurs")}
                        style={{
                            backgroundColor: "white",
                            width: "48%",
                            borderRadius: 20,
                            padding: 20,
                            elevation: 3,
                        }}
                    >
                        <Ionicons
                            name="business"
                            size={40}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginTop: 10,
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            {t("donors")}
                        </Text>

                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            {dashboard?.nombreBailleurs ?? 0}
                        </Text>

                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            {t("totalDonors")}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={deconnexion}
                    style={{
                        backgroundColor: "#DC2626",
                        padding: 15,
                        borderRadius: 12,
                        marginTop: 20,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {t("logout")}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}