import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getProjetById } from "../../../services/projetService";
import { Alert } from "react-native";
import { creerLot } from "../../../services/lotCollectService";
import { useTranslation } from "react-i18next";

export default function DetailProjetEnqueteur() {

    const { id } = useLocalSearchParams();

    const { t } = useTranslation("enqueteur");

    const [projet, setProjet] = useState<any>(null);

    useEffect(() => {
        chargerProjet();
    }, []);

    const chargerProjet = async () => {

        try {

            const data = await getProjetById(
                Number(id)
            );

            setProjet(data);

        } catch (error) {

            console.log(error);
        }
    };

    const envoyerLot = async () => {

        try {

            const lot = await creerLot(
                Number(id)
            );

            Alert.alert(
                t("success"),
                `${t("batchCreatedWith")} ${lot.nombreCollectes} ${t("collections")}`
            );
        } catch (error: any) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("noCollectionToSend")
            );
        }
    };

    if (!projet) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{t("loading")}</Text>
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
                paddingTop: 70,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("assignedProject")}
            </Text>

            <View
                style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 16,
                    marginBottom: 25,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginBottom: 15,
                    }}
                >
                    {projet.nom}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name="location"
                        size={18}
                        color="#16A34A"
                    />

                    <Text
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {projet.zoneGeographique}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name="calendar"
                        size={18}
                        color="#F59E0B"
                    />

                    <Text
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {projet.dateDebut} - {projet.dateFin}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Ionicons
                        name="clipboard"
                        size={18}
                        color="#2563EB"
                    />

                    <Text
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {projet.type}
                    </Text>
                </View>

                <Text
                    style={{
                        marginTop: 10,
                        color: "#475569",
                    }}
                >
                    {projet.description}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() =>
                    router.push(
                        `/enqueteurs/formulaire/${id}`
                    )
                }
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 14,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                    }}
                >
                    {t("fillForm")}
                </Text>
            </TouchableOpacity>



        </View>
    );
}