import { useEffect, useState,useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Switch,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, router } from "expo-router";
import {createChamp, getChampsByProjet} from "../../../../../services/champService";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

export default function AjouterChampScreen() {

    const { id } = useLocalSearchParams();

    const [question, setQuestion] = useState("");
    const [type, setType] = useState("TEXTE");
    const [options, setOptions] = useState<string[]>([""]);
    const [preuveObligatoire, setPreuveObligatoire] = useState(false);
    const [typeStatistique, setTypeStatistique] = useState("AUCUNE");
    const { t } = useTranslation("superviseur");
    const [questionConditionnelle, setQuestionConditionnelle] =
        useState(false);

    const [champParentId, setChampParentId] =
        useState("");

    const [valeurDeclenchement, setValeurDeclenchement] =
        useState("true");

    const [questionsOuiNon, setQuestionsOuiNon] =
        useState<any[]>([]);

    useEffect(() => {

        if (
            type !== "CHOIX_UNIQUE" &&
            type !== "CHOIX_MULTIPLE"
        ) {
            setOptions([""]);
        }

    }, [type]);

    useFocusEffect(
        useCallback(() => {
            setQuestion("");
            setType("TEXTE");
            setOptions([""]);
            setPreuveObligatoire(false);
            setTypeStatistique("AUCUNE");

            setQuestionConditionnelle(false);
            setChampParentId("");
            setValeurDeclenchement("true");
            chargerQuestionsOuiNon();
        }, [id])
    );




    const chargerQuestionsOuiNon = async () => {
        try {

            const data = await getChampsByProjet(
                Number(id)
            );

            const questions = data.filter(
                (champ: any) =>
                    champ.type === "OUI_NON"
            );

            setQuestionsOuiNon(questions);

        } catch (error) {

            console.log(
                "Erreur chargement questions Oui/Non",
                error
            );
        }
    };


    const ajouterOption = () => {

        setOptions([...options, ""]);

    };

    const modifierOption = (index: number, valeur: string) => {

        const copie = [...options];

        copie[index] = valeur;

        setOptions(copie);

    };

    const supprimerOption = (index: number) => {

        if (options.length === 1) return;

        setOptions(
            options.filter((_, i) => i !== index)
        );

    };

    const viderFormulaire = () => {
        setQuestion("");
        setType("TEXTE");
        setOptions([""]);
        setPreuveObligatoire(false);
        setTypeStatistique("AUCUNE");


        setQuestionConditionnelle(false);
        setChampParentId("");
        setValeurDeclenchement("true");
    };

    const enregistrerChamp = async () => {

        if (!question.trim()) {

            Alert.alert(t("error"), t("questionRequired"));
            return;
        }
        if (questionConditionnelle && !champParentId) {

            Alert.alert(
                t("error"),
                "Choisissez la question principale"
            );

            return;
        }

        if (
            type === "CHOIX_UNIQUE" ||
            type === "CHOIX_MULTIPLE"
        ) {

            const optionsValides = options.filter(
                option => option.trim() !== ""
            );

            if (optionsValides.length < 2) {

                Alert.alert(t("error"), t("minimumOptions"));

                return;
            }

            try {

                await createChamp({
                    question,
                    type,
                    options: optionsValides.join(";"),
                    preuveObligatoire,
                    statistique:
                        typeStatistique === "AUCUNE"
                            ? null
                            : typeStatistique,
                    projetId: Number(id),

                    champParentId:
                        questionConditionnelle
                            ? Number(champParentId)
                            : null,

                    valeurDeclenchement:
                        questionConditionnelle
                            ? valeurDeclenchement
                            : null,
                });

                viderFormulaire();

                Alert.alert(t("success"), t("fieldAdded"));

                router.replace(
                    `/superviseurs/projets/${id}/champs`
                );

            } catch (error: any) {

                console.log("ERREUR =", error.response?.data);
                console.log("STATUS =", error.response?.status);
                console.log("OBJET =", JSON.stringify(error.response?.data, null, 2));

                Alert.alert(t("error"), t("fieldAddError"));
            }

            return;
        }

        try {

            await createChamp({
                question,
                type,
                options: "",
                preuveObligatoire,
                statistique:
                    typeStatistique === "AUCUNE"
                        ? null
                        : typeStatistique,
                projetId: Number(id),

                champParentId:
                    questionConditionnelle
                        ? Number(champParentId)
                        : null,

                valeurDeclenchement:
                    questionConditionnelle
                        ? valeurDeclenchement
                        : null,
            });

            viderFormulaire();

            Alert.alert(
                "Succès",
                "Champ ajouté avec succès"
            );

            router.replace(
                `/superviseurs/projets/${id}/champs`
            );

        } catch (error) {

            console.log(error);

            Alert.alert(
                "Erreur",
                "Impossible d'ajouter le champ"
            );
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
            }}
            contentContainerStyle={{
                padding: 20,
                paddingBottom: 50,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("addField")}
            </Text>

            <Text>{t("question")}</Text>

            <TextInput
                value={question}
                onChangeText={setQuestion}
                placeholder={t("exampleVillage")}
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 5,
                    marginBottom: 20,
                }}
            />

            <Text>{t("type")}</Text>

            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginTop: 5,
                    marginBottom: 20,
                }}
            >
                <Picker
                    selectedValue={type}
                    onValueChange={setType}
                >
                    <Picker.Item
                        label={t("text")}
                        value="TEXTE"
                    />

                    <Picker.Item
                        label={t("number")}
                        value="NOMBRE"
                    />

                    <Picker.Item
                        label={t("yesNo")}
                        value="OUI_NON"
                    />

                    <Picker.Item
                        label={t("singleChoice")}
                        value="CHOIX_UNIQUE"
                    />

                    <Picker.Item
                        label={t("multipleChoice")}
                        value="CHOIX_MULTIPLE"
                    />



                    <Picker.Item
                        label={t("date")}
                        value="DATE"
                    />
                </Picker>
                {(type === "CHOIX_UNIQUE" ||
                    type === "CHOIX_MULTIPLE") && (

                    <>
                        <Text
                            style={{
                                marginBottom: 10,
                                fontWeight: "bold",
                            }}
                        >
                            {t("options")}
                        </Text>

                        {options.map((option, index) => (

                            <View
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >

                                <TextInput
                                    value={option}
                                    onChangeText={(text) =>
                                        modifierOption(index, text)
                                    }
                                    placeholder={`${t("option")} ${index + 1}`}
                                    style={{
                                        flex: 1,
                                        backgroundColor: "white",
                                        padding: 15,
                                        borderRadius: 10,
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={() => supprimerOption(index)}
                                    style={{ marginLeft: 10 }}
                                >
                                    <Ionicons
                                        name="trash"
                                        size={24}
                                        color="red"
                                    />
                                </TouchableOpacity>

                            </View>

                        ))}

                        <TouchableOpacity
                            onPress={ajouterOption}
                            style={{
                                backgroundColor: "#16A34A",
                                padding: 12,
                                borderRadius: 10,
                                marginBottom: 20,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                + {t("addOption")}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {(
                type === "NOMBRE" ||
                type === "OUI_NON" ||
                type === "CHOIX_UNIQUE" ||
                type === "CHOIX_MULTIPLE"
            ) && (

                <>
                    <Text
                        style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                        }}
                    >
                        {t("statisticType")}
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <Picker
                            selectedValue={typeStatistique}
                            onValueChange={setTypeStatistique}
                        >
                            <Picker.Item
                                label={t("none")}
                                value="AUCUNE"
                            />

                            <Picker.Item
                                label={t("gender")}
                                value="SEXE"
                            />

                            <Picker.Item
                                label={t("age")}
                                value="AGE"
                            />

                            <Picker.Item
                                label={t("region")}
                                value="REGION"
                            />

                            <Picker.Item
                                label={t("household")}
                                value="MENAGE"
                            />
                        </Picker>
                    </View>

                </>

            )}


            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <Text style={{ fontWeight: "bold" }}>
                    {t("conditionalQuestion")}
                </Text>

                <Switch
                    value={questionConditionnelle}
                    onValueChange={(value) => {
                        setQuestionConditionnelle(value);

                        if (!value) {
                            setChampParentId("");
                            setValeurDeclenchement("true");
                        }
                    }}
                />
            </View>

            {questionConditionnelle && (
                <>
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        {t("parentQuestion")}
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <Picker
                            selectedValue={champParentId}
                            onValueChange={setChampParentId}
                        >
                            <Picker.Item
                                label={t("selectParentQuestion")}
                                value=""
                            />

                            {questionsOuiNon.map((champ: any) => (
                                <Picker.Item
                                    key={champ.id}
                                    label={champ.question}
                                    value={champ.id.toString()}
                                />
                            ))}
                        </Picker>
                    </View>

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        {t("showWhenAnswer")}
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <Picker
                            selectedValue={valeurDeclenchement}
                            onValueChange={setValeurDeclenchement}
                        >
                            <Picker.Item
                                label={t("yes")}
                                value="true"
                            />

                            <Picker.Item
                                label={t("no")}
                                value="false"
                            />
                        </Picker>
                    </View>
                </>
            )}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 30,
                }}
            >
                <Text>
                    {t("mandatoryProof")}
                </Text>

                <Switch
                    value={preuveObligatoire}
                    onValueChange={setPreuveObligatoire}
                />
            </View>



            <TouchableOpacity
                onPress={enregistrerChamp}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    {t("save")}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}