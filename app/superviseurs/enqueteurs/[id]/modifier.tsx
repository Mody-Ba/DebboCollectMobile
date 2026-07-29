import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    getUserById,
    updateUser,
} from "../../../../services/userService";

export default function ModifierEnqueteurScreen() {

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

            Alert.alert(
                t("error"),
                t("loadSurveyorError")
            );
        } finally {

            setLoading(false);
        }
    };

    const modifierEnqueteur = async () => {
        try {

            await updateUser(
                Number(id),
                enqueteur
            );

            Alert.alert(
                t("success"),
                t("surveyorUpdated")
            );

            router.replace("/superviseurs/enqueteurs");

        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("surveyorUpdateError")
            );
        }
    };

    if (loading || !enqueteur) {
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
                {t("editSurveyor")}
            </Text>

            <Text style={{ marginBottom: 5 }}>
                {t("name")}
            </Text>

            <TextInput
                value={enqueteur.nom || ""}
                onChangeText={(text) =>
                    setEnqueteur({
                        ...enqueteur,
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
                {t("email")}
            </Text>

            <TextInput
                value={enqueteur.email || ""}
                onChangeText={(text) =>
                    setEnqueteur({
                        ...enqueteur,
                        email: text,
                    })
                }
                autoCapitalize="none"
                keyboardType="email-address"
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 25,
                }}
            />

            <TouchableOpacity
                onPress={modifierEnqueteur}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 18,
                    borderRadius: 12,
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
                    {t("saveChanges")}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}