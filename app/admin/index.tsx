import {View, Text, TouchableOpacity, Platform} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getSuperviseurs } from "../../services/superviseurService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Alert } from "react-native";
import { removeToken } from "../../services/authService";
import SideMenu from "../../components/SideMenu";
import { getNombreMessagesNonLus } from "../../services/messageService";
import { useTranslation } from "react-i18next";

export default function AdminScreen() {
    const [actifs, setActifs] = useState(0);
    const [inactifs, setInactifs] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const [nombreNonLus, setNombreNonLus] = useState(0);
    const { i18n } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            chargerStats();
        }, [])
    );

    const chargerStats = async () => {
        try {
            const data = await getSuperviseurs();
            console.log("DATA =", data);
            const superviseurs = data.filter(
                (u: any) => u.role === "SUPERVISEUR"
            );

            setActifs(
                superviseurs.filter(
                    (s: any) => s.compteActif
                ).length
            );

            setInactifs(
                superviseurs.filter(
                    (s: any) => !s.compteActif
                ).length
            );

            const nombre = await getNombreMessagesNonLus();

            setNombreNonLus(nombre);
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
                paddingTop: 50,
            }}
        >
            {/* HEADER */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 30,
                }}
            >
                <TouchableOpacity
                    onPress={() => setMenuVisible(true)}
                >
                    <Ionicons
                        name="menu"
                        size={36}
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
                            fontSize: 16,
                            color: "#444",
                        }}
                    >
                        {i18n.t("common:admin")}

                    </Text>
                </View>

                <View>

                    <Ionicons
                        name="notifications-outline"
                        size={32}
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

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                role="ADMIN"
            />

            {/* TITRE */}
            <Text
                style={{
                    fontSize: 34,
                    fontWeight: "bold",
                }}
            >
                {i18n.t("common:welcome_admin")}
            </Text>

            <Text
                style={{
                    color: "#64748B",
                    marginTop: 8,
                    marginBottom: 25,
                    fontSize: 16,
                }}
            >
                {i18n.t("common:platform_overview")}
            </Text>

            {/* STATISTIQUES */}
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 15,
                }}
            >
                {i18n.t("common:statistics")}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                }}
            >
                <TouchableOpacity
                    onPress={() =>
                        router.push("/admin/superviseurs?statut=actif" as any)
                    }
                    style={{
                        backgroundColor: "white",
                        width: "48%",
                        borderRadius: 20,
                        padding: 20,
                        alignItems: "center",
                        elevation: 4,
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
                            fontSize: 16,
                        }}
                    >
                        {i18n.t("common:active")}
                    </Text>

                    <Text
                        style={{
                            fontSize: 30,
                            color: "#16A34A",
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {actifs}
                    </Text>

                    <Text>{i18n.t("common:supervisors")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        router.push("/admin/superviseurs?statut=inactif" as any)
                    }
                    style={{
                        backgroundColor: "white",
                        width: "48%",
                        borderRadius: 20,
                        padding: 20,
                        alignItems: "center",
                        elevation: 4,
                    }}
                >
                    <Ionicons
                        name="close-circle"
                        size={40}
                        color="#DC2626"
                    />

                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        {i18n.t("common:inactive")}
                    </Text>

                    <Text
                        style={{
                            fontSize: 30,
                            color: "#DC2626",
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {inactifs}
                    </Text>

                    <Text>{i18n.t("common:supervisors")}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => router.push("/admin/superviseurs" as any)
                }
                style={{
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "#16A34A",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    👥 {i18n.t("common:manage_supervisors")}
                </Text>

                <Text
                    style={{
                        color: "#64748B",
                        marginTop: 5,
                    }}
                >
                    {i18n.t("common:manage_supervisors_desc")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if (Platform.OS === "web") {
                        const confirmed = window.confirm(
                            `${i18n.t("common:logout")}\n${i18n.t("common:logout_confirm")}`
                        );
                        if (confirmed) {
                            (async () => {
                                await removeToken();
                                router.replace("/login");
                            })();
                        }
                    } else {
                        Alert.alert(
                            i18n.t("common:logout"),
                            i18n.t("common:logout_confirm"),
                            [
                                {
                                    text: i18n.t("common:no"),
                                    style: "cancel",
                                },
                                {
                                    text: i18n.t("common:yes"),
                                    onPress: async () => {
                                        await removeToken();
                                        router.replace("/login");
                                    },
                                },
                            ]
                        );
                    }
                }}
                style={{
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "#DC2626",
                    borderRadius: 20,
                    padding: 20,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Ionicons
                    name="log-out-outline"
                    size={28}
                    color="#DC2626"
                />

                <View style={{ marginLeft: 12 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#DC2626",
                        }}
                    >
                        {i18n.t("common:logout")}
                    </Text>

                    <Text
                        style={{
                            color: "#64748B",
                            marginTop: 5,
                        }}
                    >
                        {i18n.t("common:logout_desc")}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}