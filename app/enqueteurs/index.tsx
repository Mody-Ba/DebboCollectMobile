import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import SideMenu from "@/components/SideMenu";
import { useState } from "react";
import { getNombreMessagesNonLus } from "../../services/messageService";

import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function EnqueteurAccueil() {

    const [menuVisible, setMenuVisible] = useState(false);
    const [nombreNonLus, setNombreNonLus] = useState(0);
    const { t } = useTranslation("enqueteur");

    useFocusEffect(
        useCallback(() => {
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



    const deconnexion = async () => {

        await AsyncStorage.removeItem("token");

        router.replace("/");
    };

    return (
        <View style={{ flex: 1 }}>

            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                role="ENQUETEUR"
            />

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#F5F7FA",
                    padding: 20,
                    paddingTop: 60,
                }}
            >
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

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
            >
                {t("hello")} 👋
            </Text>

            <Text
                style={{
                    color: "#64748B",
                    marginBottom: 25,
                }}
            >
                {t("welcome")}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >

                <TouchableOpacity
                    onPress={() => router.push("/enqueteurs/projets")}
                    style={{
                        width: "48%",
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 15,
                        marginBottom: 15,
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="folder"
                        size={40}
                        color="#16A34A"
                    />

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {t("myProjects")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/enqueteurs/collectes")}
                    style={{
                        width: "48%",
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 15,
                        marginBottom: 15,
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="clipboard"
                        size={40}
                        color="#2563EB"
                    />

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {t("myCollections")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/enqueteurs/collectes")}
                    style={{
                        width: "48%",
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 15,
                        marginBottom: 15,
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
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {t("validated")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/enqueteurs/collectes")}
                    style={{
                        width: "48%",
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 15,
                        marginBottom: 15,
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="refresh-circle"
                        size={40}
                        color="#F59E0B"
                    />

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        {t("revisions")}
                    </Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                onPress={deconnexion}
                style={{
                    backgroundColor: "#DC2626",
                    padding: 15,
                    borderRadius: 12,
                    alignItems: "center",
                    marginTop: 30,
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
            </View>
        </View>
    );
}