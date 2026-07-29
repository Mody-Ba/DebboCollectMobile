import { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
    getSuperviseurs,
} from "../../services/superviseurService";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function SuperviseursScreen() {

    const [superviseurs, setSuperviseurs] = useState([]);
    const [recherche, setRecherche] = useState("");
    const { statut } = useLocalSearchParams();
    const { t } = useTranslation("common");

    useFocusEffect(
        useCallback(() => {
            loadSuperviseurs();
        }, [])
    );

    const loadSuperviseurs = async () => {
        try {

            const data = await getSuperviseurs();

            console.log("DATA =", data);

            setSuperviseurs(data);

        } catch (error) {

            console.log("ERREUR =", error);

        }
    };

    const superviseursFiltres = superviseurs.filter(
        (item: any) => {

            const correspondRecherche =
                item.nom
                    ?.toLowerCase()
                    .includes(recherche.toLowerCase()) ||
                item.email
                    ?.toLowerCase()
                    .includes(recherche.toLowerCase());

            if (statut === "actif") {
                return correspondRecherche && item.compteActif;
            }

            if (statut === "inactif") {
                return correspondRecherche && !item.compteActif;
            }

            return correspondRecherche;
        }
    );
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
                paddingTop: 60,
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
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                    }}
                >
                    {t("supervisors")}
                </Text>
                {statut === "actif" && (
                    <Text
                        style={{
                            color: "#16A34A",
                            fontWeight: "bold",
                            marginTop: 5,
                        }}
                    >
                        {t("show_active_supervisors")}
                    </Text>
                )}

                {statut === "inactif" && (
                    <Text
                        style={{
                            color: "#DC2626",
                            fontWeight: "bold",
                            marginTop: 5,
                        }}
                    >
                        {t("show_inactive_supervisors")}
                    </Text>
                )}

                <TouchableOpacity
                    onPress={() =>
                        router.push("/admin/ajouter-superviseur")
                    }
                    style={{
                        backgroundColor: "#16A34A",
                        paddingHorizontal: 18,
                        paddingVertical: 10,
                        borderRadius: 25,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color="white"
                    />

                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            marginLeft: 5,
                        }}
                    >
                        {t("add")}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* RECHERCHE */}
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    marginBottom: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    height: 55,
                }}
            >
                <TextInput
                    placeholder={t("search_supervisor")}
                    value={recherche}
                    onChangeText={setRecherche}
                    style={{
                        flex: 1,
                    }}
                />

                <Ionicons
                    name="search"
                    size={24}
                    color="gray"
                />
            </View>

            {/* LISTE */}
            <FlatList
                data={superviseursFiltres}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                renderItem={({ item }: any) => (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                `/admin/superviseur/${item.id}` as any
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
                                <Ionicons
                                    name="person-circle"
                                    size={55}
                                    color="#16A34A"
                                />

                                <View
                                    style={{
                                        marginLeft: 10,
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.nom}
                                    </Text>

                                    <Text
                                        style={{
                                            color: "#64748B",
                                            marginTop: 4,
                                        }}
                                    >
                                        {item.email}
                                    </Text>
                                </View>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={26}
                                color="#666"
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 15,
                                alignSelf: "flex-start",
                                backgroundColor:
                                    item.compteActif
                                        ? "#DCFCE7"
                                        : "#FEE2E2",
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        item.compteActif
                                            ? "#16A34A"
                                            : "#DC2626",
                                    fontWeight: "bold",
                                }}
                            >
                                {item.compteActif
                                    ? t("active")
                                    : t("inactive")}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    );
}