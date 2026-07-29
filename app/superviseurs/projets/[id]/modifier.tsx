import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
    getProjetById,
    updateProjet,
} from "../../../../services/projetService";
import { useTranslation } from "react-i18next";

export default function ModifierProjetScreen() {

    const { id } = useLocalSearchParams();

    const [projet, setProjet] = useState<any>(null);
    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerProjet();
    }, [id]);

    const chargerProjet = async () => {
        try {

            const data = await getProjetById(
                Number(id)
            );

            console.log("DETAIL PROJET =", data);

            setProjet(data);

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("projectLoadError")
            );
        }
    };

    const modifierProjet = async () => {

        try {

            await updateProjet(
                Number(id),
                projet
            );

            Alert.alert(
                t("success"),
                t("projectUpdated")
            );

            router.replace(
                `/superviseurs/projets/${id}` as any
            );

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("projectUpdateError")
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
        <ScrollView
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
                    marginBottom: 25,
                }}
            >
                {t("editProject")}
            </Text>

            <Text style={{ marginBottom: 5 }}>
                {t("projectName")}
            </Text>

            <TextInput
                value={projet.nom || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        nom: text,
                    })
                }
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("description")}
            </Text>

            <TextInput
                value={projet.description || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        description: text,
                    })
                }
                multiline
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                    minHeight: 100,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("geographicalArea")}
            </Text>

            <TextInput
                value={projet.zoneGeographique || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        zoneGeographique: text,
                    })
                }
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("type")}
            </Text>

            <TextInput
                value={projet.type || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        type: text,
                    })
                }
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("startDate")}
            </Text>

            <TextInput
                value={projet.dateDebut || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        dateDebut: text,
                    })
                }
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("endDate")}
            </Text>

            <TextInput
                value={projet.dateFin || ""}
                onChangeText={(text) =>
                    setProjet({
                        ...projet,
                        dateFin: text,
                    })
                }
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 25,
                }}
            />

            <TouchableOpacity
                onPress={modifierProjet}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 30,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {t("editProject")}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}