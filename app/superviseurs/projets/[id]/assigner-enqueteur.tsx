import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getUsers } from "../../../../services/userService";
import { assignerEnqueteur } from "../../../../services/projetService";
import { useTranslation } from "react-i18next";

export default function AssignerEnqueteurScreen() {

    const { id } = useLocalSearchParams();

    const [enqueteurs, setEnqueteurs] = useState<any[]>([]);

    const { t } = useTranslation("superviseur");

    useFocusEffect(
        useCallback(() => {
            chargerEnqueteurs();
        }, [])
    );

    const chargerEnqueteurs = async () => {
        try {

            const users = await getUsers();

            const liste = users.filter(
                (u: any) => u.role === "ENQUETEUR"
            );

            setEnqueteurs(liste);

        } catch (error) {

            console.log(error);
        }
    };

    const assigner = async (enqueteurId: number) => {
        try {

            await assignerEnqueteur(
                Number(id),
                enqueteurId
            );

            Alert.alert(
                t("success"),
                t("surveyorAssigned")
            );
            router.push(`/superviseurs/projets/${id}` as any);

        } catch (error: any) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("surveyorAssignError")
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
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("chooseSurveyor")}
            </Text>

            <FlatList
                data={enqueteurs}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() =>
                            assigner(item.id)
                        }
                        style={{
                            backgroundColor: "white",
                            padding: 18,
                            borderRadius: 15,
                            marginBottom: 15,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {item.nom}
                        </Text>

                        <Text
                            style={{
                                color: "#64748B",
                                marginTop: 5,
                            }}
                        >
                            {item.email}
                        </Text>

                        <Text
                            style={{
                                marginTop: 10,
                                color: item.compteActif
                                    ? "#16A34A"
                                    : "#DC2626",
                                fontWeight: "bold",
                            }}
                        >
                            {item.compteActif
                                ? t("active")
                                : t("inactive")}
                        </Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    );
}