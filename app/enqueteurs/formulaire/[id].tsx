import { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getChampsByProjet } from "../../../services/champService";
import { creerCollecte } from "../../../services/collectService";
import { creerReponse } from "../../../services/reponseService";
import { getProjetById } from "../../../services/projetService";
import { uploadMedia, creerMedia } from "../../../services/mediaService";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function FormulaireEnqueteur() {

    const { id } = useLocalSearchParams();

    const [champs, setChamps] = useState<any[]>([]);
    const [reponses, setReponses] = useState<any>({});
    const [preuves, setPreuves] = useState<any>({});
    const [projet, setProjet] = useState<any>(null);
    const { t } = useTranslation("enqueteur");

    useEffect(() => {
        chargerProjet();
        chargerChamps();
    }, [id]);

    const chargerProjet = async () => {
        const data = await getProjetById(Number(id));
        setProjet(data);
    };

    const chargerChamps = async () => {
        try {

            const data = await getChampsByProjet(
                Number(id)
            );

            setChamps(data);

        } catch (error) {

            console.log(error);
        }
    };

    const obtenirChampsVisibles = () => {

        return champs.filter((champ: any) => {

            // Question normale : toujours visible
            if (!champ.champParentId) {
                return true;
            }

            // Question conditionnelle
            const reponseParent =
                reponses[champ.champParentId];

            return (
                reponseParent ===
                champ.valeurDeclenchement
            );
        });
    };

    const enregistrer = async () => {

        const champsVisibles = obtenirChampsVisibles();

        const champSansPhoto = champsVisibles.find(
            (champ: any) =>
                champ.preuveObligatoire === true &&
                !preuves[champ.id]
        );

        const champSansReponse = champsVisibles.find((champ: any) => {

            const valeur = reponses[champ.id];

            return (
                valeur === undefined ||
                valeur === null ||
                String(valeur).trim() === ""
            );
        });

        if (champSansReponse) {
            Alert.alert(
                "Réponse obligatoire",
                `Répondez à la question : ${champSansReponse.question}`
            );

            return;
        }

        if (champSansPhoto) {
            Alert.alert(
                "Preuve obligatoire",
                `Ajoutez une photo pour : ${champSansPhoto.question}`
            );

            return;
        }

        try {

            const collecte = await creerCollecte(
                Number(id)
            );

            console.log(
                "Collecte créée =",
                collecte
            );

            for (const champ of champsVisibles) {

                const champId = champ.id;

                const reponse = await creerReponse(
                    reponses[champId],
                    Number(champId),
                    collecte.id
                );

                if (preuves[champId]) {

                    const url = await uploadMedia(
                        preuves[champId]
                    );

                    await creerMedia(
                        url,
                        reponse.id
                    );
                }
            }

            Alert.alert(
                t("success"),
                t("collectionSaved")
            );
            setReponses({});
            setPreuves({});


        } catch (error) {

            console.log(error);

            Alert.alert(
                t("error"),
                t("cannotSaveCollection")
            );
        }
    };

    const choisirPhoto = async (champId: number) => {

        Alert.alert(
            "Ajouter une preuve",
            "Choisissez une option",
            [
                {
                    text: "📷 Caméra",
                    onPress: async () => {

                        const permission =
                            await ImagePicker.requestCameraPermissionsAsync();

                        if (!permission.granted) {
                            Alert.alert(
                                "Permission refusée",
                                "La caméra est nécessaire."
                            );
                            return;
                        }

                        const resultat =
                            await ImagePicker.launchCameraAsync({
                                mediaTypes: ["images"],
                                quality: 0.8,
                            });

                        if (!resultat.canceled) {

                            setPreuves((prev: any) => ({
                                ...prev,
                                [champId]: resultat.assets[0].uri,
                            }));

                        }
                    },
                },
                {
                    text: "🖼 Galerie",
                    onPress: async () => {

                        const resultat =
                            await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ["images"],
                                quality: 0.8,
                            });

                        if (!resultat.canceled) {

                            setPreuves((prev: any) => ({
                                ...prev,
                                [champId]: resultat.assets[0].uri,
                            }));

                        }
                    },
                },
                {
                    text: "Annuler",
                    style: "cancel",
                },
            ]
        );
    };

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
                    marginBottom: 20,
                }}
            >
                {t("form")} - {projet?.nom}
            </Text>

            {obtenirChampsVisibles().map((champ: any) => (

                <View
                    key={champ.id}
                    style={{
                        backgroundColor: "white",
                        padding: 15,
                        borderRadius: 12,
                        marginBottom: 15,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        {champ.question}
                    </Text>

                    {champ.type === "TEXTE" && (
                        <TextInput
                            placeholder={t("yourAnswer")}
                            value={reponses[champ.id] || ""}
                            onChangeText={(text) =>
                                setReponses({
                                    ...reponses,
                                    [champ.id]: text,
                                })
                            }
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 10,
                                padding: 10,
                            }}
                        />
                    )}

                    {champ.type === "NOMBRE" && (
                        <TextInput
                            placeholder="0"
                            keyboardType="numeric"
                            value={reponses[champ.id] || ""}
                            onChangeText={(text) =>
                                setReponses({
                                    ...reponses,
                                    [champ.id]: text,
                                })
                            }
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 10,
                                padding: 10,
                            }}
                        />
                    )}

                    {champ.type === "DATE" && (
                        <TextInput
                            placeholder={t("datePlaceholder")}
                            value={reponses[champ.id] || ""}
                            onChangeText={(text) =>
                                setReponses({
                                    ...reponses,
                                    [champ.id]: text,
                                })
                            }
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 10,
                                padding: 10,
                            }}
                        />
                    )}

                    {champ.type === "OUI_NON" && (
                        <View
                            style={{
                                backgroundColor: "#F8FAFC",
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 10,
                            }}
                        >
                            <Picker
                                selectedValue={
                                    reponses[champ.id] || ""
                                }
                                onValueChange={(value) =>
                                    setReponses({
                                        ...reponses,
                                        [champ.id]: value,
                                    })
                                }
                            >
                                <Picker.Item
                                    label={t("select")}
                                    value=""
                                />

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
                    )}
                    {champ.type === "CHOIX_UNIQUE" && (

                        <Picker
                            selectedValue={reponses[champ.id] || ""}
                            onValueChange={(value) =>
                                setReponses({
                                    ...reponses,
                                    [champ.id]: value,
                                })
                            }
                        >
                            <Picker.Item
                                label={t("select")}
                                value=""
                            />

                            {champ.options
                                ?.split(";")
                                .map((option: string) => (

                                    <Picker.Item
                                        key={option}
                                        label={option}
                                        value={option}
                                    />

                                ))}

                        </Picker>

                    )}
                    {champ.type === "CHOIX_MULTIPLE" && (

                        champ.options
                            ?.split(";")
                            .map((option: string) => {

                                const valeurs =
                                    reponses[champ.id]
                                        ? reponses[champ.id].split(";")
                                        : [];

                                const coche =
                                    valeurs.includes(option);

                                return (

                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {

                                            let nouvellesValeurs;

                                            if (coche) {

                                                nouvellesValeurs =
                                                    valeurs.filter(
                                                        (v: string) => v !== option
                                                    );

                                            } else {

                                                nouvellesValeurs = [
                                                    ...valeurs,
                                                    option,
                                                ];

                                            }

                                            setReponses({
                                                ...reponses,
                                                [champ.id]:
                                                    nouvellesValeurs.join(";"),
                                            });

                                        }}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 8,
                                        }}
                                    >

                                        <Text
                                            style={{
                                                fontSize: 22,
                                                marginRight: 10,
                                            }}
                                        >
                                            {coche ? "☑" : "☐"}
                                        </Text>

                                        <Text>{option}</Text>

                                    </TouchableOpacity>

                                );

                            })

                    )}

                    {champ.preuveObligatoire && (

                        <View style={{ marginTop: 15 }}>

                            <TouchableOpacity
                                onPress={() => choisirPhoto(champ.id)}
                                style={{
                                    backgroundColor: "#2563EB",
                                    padding: 12,
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    📷 Ajouter une preuve
                                </Text>
                            </TouchableOpacity>

                            {preuves[champ.id] && (

                                <Image
                                    source={{ uri: preuves[champ.id] }}
                                    style={{
                                        width: "100%",
                                        height: 200,
                                        borderRadius: 12,
                                        marginTop: 10,
                                    }}
                                />

                            )}

                        </View>

                    )}
                </View>
            ))}

            <TouchableOpacity
                onPress={enregistrer}
                style={{
                    backgroundColor: "#16A34A",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 30,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {t("save")}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}