import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DashboardCharts from "@/components/DashboardCharts";
import { useEffect, useState } from "react";
import { getStatistiquesQuestions } from "@/services/statistiqueService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function GraphiquesScreen() {

    const { projetId } = useLocalSearchParams();

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {

        if (projetId) {
            charger();
        }

    }, [projetId]);

    const charger = async () => {

        if (!projetId) return;

        try {

            const data = await getStatistiquesQuestions(
                Number(projetId)
            );

            setQuestions(data);

        } catch (e) {

            console.log(e);

        }

    };
    return (

        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
        >
            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#111827"
                />

                <Text
                    style={{
                        fontSize: 18,
                        marginLeft: 8,
                        fontWeight: "600",
                    }}
                >
                    Retour
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    padding: 20,
                    paddingTop: 60,
                }}
            >

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Tous les graphiques
                </Text>

                <DashboardCharts
                    questions={questions}
                    afficherTout={true}
                />

            </View>

        </ScrollView>

    );

}