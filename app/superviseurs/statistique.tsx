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

import { getProjets } from "@/services/projetService";

export default function StatistiquesScreen() {

    const [dashboard, setDashboard] = useState<any>(null);
    const [questionsStats, setQuestionsStats] = useState<any[]>([]);
    const [localisations, setLocalisations] = useState<any[]>([]);
    const [projets, setProjets] = useState<any[]>([]);
    const [projetId, setProjetId] = useState<number | null>(null);
    const [region, setRegion] = useState("");
    const { t } = useTranslation("superviseur");

    const {projetId: projetIdParam} = useLocalSearchParams();

    useEffect(() => {
        chargerProjets();
    }, []);

    useEffect(() => {

        if (projetId !== null) {
            chargerDashboard();
        }

    }, [projetId, region]);
    const chargerProjets = async () => {
        try {

            const data = await getProjets();

            setProjets(data);

            if (projetIdParam) {

                setProjetId(Number(projetIdParam));

            } else if (data.length > 0) {

                setProjetId(data[0].id);

            }

        } catch (error) {

            console.log("Erreur chargement des projets :", error);

        }
    };
    const chargerDashboard = async () => {

        if (projetId === null) return;

        try {



            const dashboardData = await getDashboard(projetId, region);
            setDashboard(dashboardData);

            const questionsData = await getStatistiquesQuestions(
                projetId,
                region
            );

            setQuestionsStats(questionsData);

            const localisationData = await getCollectesParRegion(
                projetId,
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
                    {t("statisticsTitle")}
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

                {!projetIdParam && (

                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 12,
                            marginBottom: 20,
                            elevation: 2,
                        }}
                    >
                        <Picker
                            selectedValue={projetId}
                            onValueChange={(value) =>
                                setProjetId(Number(value))
                            }
                        >
                            {projets.map((projet) => (
                                <Picker.Item
                                    key={projet.id}
                                    label={projet.nom}
                                    value={projet.id}
                                />
                            ))}
                        </Picker>
                    </View>

                )}

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

                    <DashboardCard
                        titre={t("validated")}
                        valeur={dashboard.collectesValidees}
                        icone="checkmark-circle"
                        couleur="#2563EB"
                        pourcentage={dashboard.pourcentageValidation}
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
                            titre={t("elderly")}
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
                    {t("filterRegion")}

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
