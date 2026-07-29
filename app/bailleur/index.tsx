import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProjetsBailleur } from "../../services/projetService";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SideMenu from "@/components/SideMenu";
import { getNombreMessagesNonLus } from "../../services/messageService";
import { useTranslation } from "react-i18next";

export default function DashboardBailleur() {
    const [projets, setProjets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [nombreNonLus, setNombreNonLus] = useState(0);
    const { t } = useTranslation("bailleur");

    useFocusEffect(
        useCallback(() => {
            chargerProjets();
            chargerNotifications();
        }, [])
    );

    const chargerNotifications = async () => {
        try {
            const nombre = await getNombreMessagesNonLus();
            setNombreNonLus(nombre);
        } catch (error) {
            console.log(error);
        }
    };
    const chargerProjets = async () => {
        try {
            const data = await getProjetsBailleur();
            setProjets(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    const deconnexion = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        router.replace("/login");
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                role="BAILLEUR"
            />

            <ScrollView style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                    >
                        <Ionicons
                            name="menu"
                            size={34}
                            color="black"
                        />
                    </TouchableOpacity>

                    <View style={{ alignItems: "center" }}>
                        <Text
                            style={{
                                color: "#16A34A",
                                fontSize: 24,
                                fontWeight: "bold",
                            }}
                        >
                            DebboCollect
                        </Text>

                        <Text
                            style={{
                                fontSize: 15,
                                color: "#64748B",
                            }}
                        >
                            {t("funder")}
                        </Text>
                    </View>

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

            <Text style={styles.sectionTitle}>{t("myProjects")}</Text>

            {projets.length === 0 && (
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyText}>
                        {t("noProject")}
                    </Text>
                </View>
            )}

            {projets.map((projet) => (
                <TouchableOpacity
                    key={projet.id}
                    style={styles.projectCard}
                    onPress={() =>
                        router.push(
                            `/bailleur/statistiques?projetId=${projet.id}` as any
                        )
                    }
                >
                    <View style={styles.projectHeader}>
                        <Ionicons
                            name="folder-open-outline"
                            size={34}
                            color="#16A34A"
                        />

                        <Ionicons
                            name="chevron-forward"
                            size={26}
                            color="#64748B"
                        />
                    </View>

                    <Text style={styles.projectName}>
                        {projet.nom}
                    </Text>

                    <Text style={styles.supervisorName}>
                        Superviseur : {projet.nomSuperviseur}
                    </Text>
                </TouchableOpacity>
            ))}

                <TouchableOpacity
                    onPress={deconnexion}
                    style={{
                        backgroundColor: "#DC2626",
                        padding: 15,
                        borderRadius: 12,
                        alignItems: "center",
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        {t("logout")}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        padding: 20,
        paddingTop: 60,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#0F172A",
    },

    subtitle: {
        color: "#64748B",
        marginTop: 6,
        fontSize: 15,
    },

    logout: {
        backgroundColor: "#DC2626",
        padding: 14,
        borderRadius: 18,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 18,
        color: "#0F172A",
    },

    projectCard: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 22,
        marginBottom: 18,
        elevation: 3,
    },

    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    projectName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#16A34A",
    },

    supervisorName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "600",
        color: "#64748B",
    },

    emptyCard: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 18,
        alignItems: "center",
    },

    emptyText: {
        color: "#64748B",
        fontSize: 16,
    },
});