import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";

import DashboardCard from "@/components/DashboardCard";
import BarChartCard from "@/components/BarChartCard";
import { useTranslation } from "react-i18next";

import {
    getDashboard,
    getStatistiquesQuestions,
    getCollectesParRegion,
} from "@/services/statistiqueService";

export default function StatistiquesScreen() {

    const [dashboard, setDashboard] = useState<any>(null);
    const [questionsStats, setQuestionsStats] = useState<any[]>([]);
    const [localisations, setLocalisations] = useState<any[]>([]);
    const [region, setRegion] = useState("");
    const { t } = useTranslation("bailleur");

    const { projetId } = useLocalSearchParams();
    useEffect(() => {

        if (projetId) {

            chargerDashboard(Number(projetId));

        }

    }, [projetId, region]);

    const chargerDashboard = async (id: number) => {

        try {



            const dashboardData = await getDashboard(id, region);
            setDashboard(dashboardData);

            const questionsData = await getStatistiquesQuestions(
                id,
                region
            );

            setQuestionsStats(questionsData);

            const localisationData = await getCollectesParRegion(
                id,
                region
            );

            setLocalisations(localisationData);

        } catch (error) {

            console.log("Erreur chargement statistiques :", error);

        }

    };
    if (!dashboard) {
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
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
        >
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
                        marginBottom: 10,
                    }}
                >
                    {t("statistics")}
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

                {/* Choix du projet */}


                {/* Cartes */}

                {/* Cartes */}

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >

                    <DashboardCard
                        titre={t("collections")}
                        valeur={dashboard.totalCollectes}
                        icone="stats-chart"
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

                {/* Filtre Région */}

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

                {/* Statistiques */}

                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginBottom: 15,
                    }}
                >
                    {t("formStatistics")}
                </Text>

                {questionsStats
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

            </View>

        </ScrollView>
    );

}
