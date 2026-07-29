import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import {
    getUserById,
    deleteUser,
    activateUser,
    deactivateUser,
} from "../../../../services/userService";

export default function DetailEnqueteurScreen() {

    const { id } = useLocalSearchParams();

    const [enqueteur, setEnqueteur] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerEnqueteur();
    }, [id]);

    const chargerEnqueteur = async () => {
        try {

            const data = await getUserById(
                Number(id)
            );

            setEnqueteur(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const supprimerEnqueteur = () => {

        Alert.alert(
            t("confirmation"),
            t("confirmDeleteSurveyor"),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("delete"),
                    style: "destructive",
                    onPress: async () => {

                        try {

                            await deleteUser(
                                Number(id)
                            );

                            Alert.alert(t("success"),
                                t("surveyorDeleted")
                            );

                            router.back();

                        } catch (error) {

                            console.log(error);

                            Alert.alert(
                                t("error"),
                                t("surveyorDeleteError")
                            );
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#16A34A"
                />
            </View>
        );
    }

    const changerStatut = async () => {

        try {

            if (enqueteur.compteActif) {

                await deactivateUser(
                    Number(id)
                );

            } else {

                await activateUser(
                    Number(id)
                );
            }

            chargerEnqueteur();

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("statusUpdateError")
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
            <TouchableOpacity
                onPress={() =>
                    router.replace(
                        "/superviseurs/enqueteurs"
                    )
                }
                style={{
                    marginBottom: 20,
                }}
            >
                <Ionicons
                    name="arrow-back-circle"
                    size={36}
                    color="#16A34A"
                />
            </TouchableOpacity>


            {/* Profil */}
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 25,
                }}
            >
                <Ionicons
                    name="person-circle"
                    size={90}
                    color="#16A34A"
                />

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        marginTop: 10,
                    }}
                >
                    {enqueteur.nom}
                </Text>
            </View>

            {/* Carte détail */}
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
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

                <TouchableOpacity
                    onPress={() =>
                        router.push(
                            `/superviseurs/messages/conversation?destinataireId=${enqueteur.id}&nom=${enqueteur.nom}` as any
                        )
                    }
                    style={{
                        backgroundColor: "#2563EB",
                        padding: 15,
                        borderRadius: 12,
                        marginTop: 20,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons
                        name="chatbubble-ellipses"
                        size={22}
                        color="white"
                    />

                    <Text
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginLeft: 8,
                        }}
                    >
                        {t("sendMessage")}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15,
                    }}
                >
                    <Ionicons
                        name="mail"
                        size={22}
                        color="#16A34A"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 16,
                        }}
                    >
                        {enqueteur.email}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15,
                    }}
                >
                    <Ionicons
                        name="person"
                        size={22}
                        color="#16A34A"
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 16,
                        }}
                    >
                        {enqueteur.role}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name={
                            enqueteur.compteActif
                                ? "checkmark-circle"
                                : "close-circle"
                        }
                        size={22}
                        color={
                            enqueteur.compteActif
                                ? "#16A34A"
                                : "#DC2626"
                        }
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 16,
                            fontWeight: "bold",
                            color:
                                enqueteur.compteActif
                                    ? "#16A34A"
                                    : "#DC2626",
                        }}
                    >
                        {enqueteur.compteActif
                            ? t("active")
                            : t("inactive")}
                    </Text>
                </View>

            </View>

            <TouchableOpacity
                onPress={changerStatut}
                style={{
                    backgroundColor:
                        enqueteur.compteActif
                            ? "#DC2626"
                            : "#16A34A",
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
                        fontSize: 16,
                    }}
                >
                    {enqueteur.compteActif
                        ? t("deactivateAccount")
                        : t("activateAccount")}
                </Text>
            </TouchableOpacity>

            {/* Modifier */}
            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/superviseurs/enqueteurs/${id}/modifier` as any
                    )
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 25,
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
                    {t("edit")}
                </Text>
            </TouchableOpacity>

            {/* Supprimer */}
            <TouchableOpacity
                onPress={supprimerEnqueteur}
                style={{
                    backgroundColor: "#DC2626",
                    padding: 15,
                    borderRadius: 12,
                    marginTop: 15,
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
                    {t("delete")}
                </Text>
            </TouchableOpacity>

        </View>
    );
}