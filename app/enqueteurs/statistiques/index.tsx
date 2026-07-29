import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
    getDashboardEnqueteur,
    getStatistiquesQuestionsEnqueteur,
    getCollectesParRegionEnqueteur,
} from "@/services/statistiqueService";
import DashboardCard from "@/components/DashboardCard";
import { useTranslation } from "react-i18next";
import BarChartCard from "@/components/BarChartCard";
import { Picker } from "@react-native-picker/picker";


export default function StatistiquesEnqueteur() {

    const [dashboard, setDashboard] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [localisations, setLocalisations] = useState<any[]>([]);
    const [region, setRegion] = useState("");
    const { t } = useTranslation("enqueteur");

    useEffect(() => {

        chargerDashboard();

    }, [region]);

    const chargerDashboard = async () => {

        try {

            const data = await getDashboardEnqueteur(region);

            const stats =
                await getStatistiquesQuestionsEnqueteur(region);

            setDashboard(data);
            setQuestions(stats);

            const regions =
                await getCollectesParRegionEnqueteur(region);

            setLocalisations(regions);

        } catch (e) {

            console.log(e);

        }

    };

    if (!dashboard) {

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
                        marginTop: 15,
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
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
        >

            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
            >
                {t("myStatistics")}
            </Text>

            <Text
                style={{
                    color: "#6B7280",
                    marginBottom: 20,
                    fontSize: 15,
                }}
            >
                {t("statisticsDescription")}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >

                <DashboardCard
                    titre={t("myCollections")}
                    valeur={dashboard.totalCollectes}
                    icone="clipboard"
                    couleur="#16A34A"
                    pourcentage={100}
                />



                {dashboard.nombreHommes > 0 && (

                    <DashboardCard
                        titre={t("men")}
                        valeur={dashboard.nombreHommes}
                        icone="man"
                        couleur="#3B82F6"
                    />

                )}

                {dashboard.nombreFemmes > 0 && (

                    <DashboardCard
                        titre={t("women")}
                        valeur={dashboard.nombreFemmes}
                        icone="woman"
                        couleur="#EC4899"
                    />

                )}

                {dashboard.nombreEnfants > 0 && (

                    <DashboardCard
                        titre={t("children")}
                        valeur={dashboard.nombreEnfants}
                        icone="happy"
                        couleur="#F59E0B"
                    />

                )}

                {dashboard.nombreAdultes > 0 && (

                    <DashboardCard
                        titre={t("adults")}
                        valeur={dashboard.nombreAdultes}
                        icone="people"
                        couleur="#10B981"
                    />

                )}

                {dashboard.nombrePersonnesAgees > 0 && (

                    <DashboardCard
                        titre={t("seniors")}
                        valeur={dashboard.nombrePersonnesAgees}
                        icone="accessibility"
                        couleur="#8B5CF6"
                    />

                )}

                {dashboard.cartesDynamiques?.map((carte: any, index: number) => (

                    <DashboardCard
                        key={index}
                        titre={carte.titre}
                        valeur={carte.nombre}
                        icone="bar-chart"
                        couleur="#F97316"
                        pourcentage={carte.pourcentage}
                    />

                ))}

            </View>

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                {t("filterByRegion")}
            </Text>

            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    marginBottom: 25,
                    elevation: 2,
                }}
            >

                <Picker
                    selectedValue={region}
                    onValueChange={(value) => setRegion(value)}
                >

                    <Picker.Item
                        label={t("allRegions")}
                        value=""
                    />

                    {localisations.map((item) => (

                        <Picker.Item
                            key={item.region}
                            label={item.region}
                            value={item.region}
                        />

                    ))}

                </Picker>

            </View>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 15,
                }}
            >
                {t("formStatistics")}
            </Text>

            {questions
                .filter(
                    (question) =>
                        question.type === "CHOIX_UNIQUE" ||
                        question.type === "CHOIX_MULTIPLE"
                )
                .map((question, index) => (

                    <BarChartCard
                        key={index}
                        titre={question.question}
                        data={question.reponses}
                    />

                ))}

        </ScrollView>


        );

    }
