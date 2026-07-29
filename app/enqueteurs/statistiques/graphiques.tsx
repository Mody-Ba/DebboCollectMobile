import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

import {

    getStatistiquesQuestionsEnqueteur,
} from "@/services/statistiqueService";
import { PieChart } from "react-native-chart-kit";

import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function StatistiquesEnqueteur() {


    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation("enqueteur");

    useEffect(() => {
        chargerGraphiques();
    }, []);

    const chargerGraphiques = async () => {

        try {

            const stats =
                await getStatistiquesQuestionsEnqueteur();

            setQuestions(stats);

        } catch (e) {

            console.log(e);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F5F7FA",

                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#16A34A"
                />

                <Text
                    style={{
                        marginTop: 10,
                    }}
                >
                    {t("loading")}
                </Text>

            </View>

        );

    }

    return (

        <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#F5F7FA",
                }}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: 70,
                    paddingBottom: 40,


                }}
            >

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 25,

                }}
            >

                <TouchableOpacity
                    onPress={() =>
                        router.replace(
                            "/enqueteurs/statistiques"
                        )
                    }
                >
                    <Ionicons
                        name="arrow-back-circle"
                        size={42}
                        color="#16A34A"
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        marginLeft: 15,
                    }}
                >
                    {t("allCharts")}
                </Text>

            </View>

                {questions
                    .filter(
                        (question) =>
                            question.type === "CHOIX_UNIQUE" ||
                            question.type === "CHOIX_MULTIPLE"
                    )
                    .map((question) => {

                        const couleurs = [
                            "#16A34A",
                            "#2563EB",
                            "#F59E0B",
                            "#DC2626",
                            "#7C3AED",
                            "#06B6D4",
                            "#EC4899",
                        ];

                        const data = question.reponses.map(
                            (reponse: any, index: number) => ({
                                name: reponse.valeur,
                                population: reponse.nombre,
                                color: couleurs[index % couleurs.length],
                                legendFontColor: "#374151",
                                legendFontSize: 13,
                            })
                        );

                        return (

                            <View
                                key={question.champId}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    padding: 20,
                                    marginBottom: 20,
                                    elevation: 4,
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                    }}
                                >
                                    {question.question}
                                </Text>

                                <PieChart
                                    data={data}
                                    width={Dimensions.get("window").width - 80}
                                    height={220}
                                    accessor="population"
                                    backgroundColor="transparent"
                                    paddingLeft="10"
                                    absolute
                                    chartConfig={{
                                        color: () => "#000",
                                    }}
                                />

                            </View>

                        );

                    })}

            </ScrollView>

        );
    }

