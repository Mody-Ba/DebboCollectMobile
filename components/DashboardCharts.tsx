import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import PieChartCard from "./PieChartCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    questions: any[];
    projetId?: number | null;
    afficherTout?: boolean;
};

export default function DashboardCharts({
                                            questions,
                                            projetId,
                                            afficherTout = false,
                                        }: Props) {

    const ouvrirTousLesGraphiques = async () => {

        const role = await AsyncStorage.getItem("role");

        if (role === "BAILLEUR") {

            router.push({
                pathname: "/bailleur/graphiques",
                params: { projetId },
            });

        } else {

            router.push({
                pathname: "/superviseurs/graphiques",
                params: { projetId },
            });

        }

    };

    const questionsGraphiques = afficherTout
        ? questions.filter(
            (question) =>
                question.type === "CHOIX_UNIQUE" ||
                question.type === "CHOIX_MULTIPLE"
        )
        : questions
            .filter(
                (question) =>
                    question.type === "CHOIX_UNIQUE" ||
                    question.type === "CHOIX_MULTIPLE"
            )
            .slice(0, 4);

    return (

        <View
            style={{
                marginTop: 25,
            }}
        >

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    Graphiques
                </Text>

                {!afficherTout &&
                    questions.filter(
                        (q) =>
                            q.type === "CHOIX_UNIQUE" ||
                            q.type === "CHOIX_MULTIPLE"
                    ).length > 4 && (

                        <TouchableOpacity
                            onPress={ouvrirTousLesGraphiques}
                            style={{
                                borderWidth: 1,
                                borderColor: "#16A34A",
                                borderRadius: 10,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#16A34A",
                                    fontWeight: "bold",
                                }}
                            >
                                Voir tout
                            </Text>
                        </TouchableOpacity>

                    )}

            </View>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >

                {questionsGraphiques.map((question, index) => {

                    const pieData = (question.reponses ?? []).map(
                        (item: any, i: number) => ({

                            value: item.nombre,

                            text: item.nombre.toString(),

                            label: item.valeur,

                            color: [
                                "#16A34A",
                                "#2563EB",
                                "#EA580C",
                                "#9333EA",
                                "#DC2626",
                                "#0891B2",
                                "#EAB308",
                                "#7C3AED",
                            ][i % 8],

                        })
                    );

                    if (pieData.length === 0) {
                        return null;
                    }

                    return (

                        <View
                            key={index}
                            style={{
                                width: "48%",
                                marginBottom: 18,
                            }}
                        >

                            <PieChartCard
                                titre={question.question}
                                data={pieData}
                                compact={true}
                            />

                        </View>

                    );

                })}

            </View>

        </View>

    );

}