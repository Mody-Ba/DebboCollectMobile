import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Image } from "react-native";
import { getMediasByReponse } from "../../../services/mediaService";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    getReponsesByCollecte,
    modifierReponse,
    envoyerCollecte,
    getCollectes,
} from "../../../services/collectService";

export default function DetailCollecte() {

    const { id } = useLocalSearchParams();

    const [reponses, setReponses] = useState<any[]>([]);

    const [statut, setStatut] = useState("");

    const { t } = useTranslation("enqueteur");

    const [medias, setMedias] = useState<any>({});


    useEffect(() => {
        chargerReponses();
    }, [id]);

    const chargerReponses = async () => {
        try {

            const data = await getReponsesByCollecte(
                Number(id)
            );

            setReponses(data);

            const toutesLesPhotos: any = {};

            for (const reponse of data) {

                const mediasReponse =
                    await getMediasByReponse(reponse.id);

                if (mediasReponse.length > 0) {

                    toutesLesPhotos[reponse.id] =
                        mediasReponse[0].url;

                }
            }

            setMedias(toutesLesPhotos);

            const collectes = await getCollectes();

            const collecte = collectes.find(
                (c: any) => c.id === Number(id)
            );
            setStatut(collecte?.statut || "");

            console.log(
                "STATUT =",
                collecte?.statut
            );

        } catch (error) {
            console.log(error);
        }
    };

    const changerValeur = (reponseId: number, valeur: string) => {
        setReponses(
            reponses.map((r) =>
                r.id === reponseId
                    ? { ...r, valeur }
                    : r
            )
        );
    };

    const enregistrerModifications = async () => {
        try {
            for (const r of reponses) {
                await modifierReponse(
                    r.id,
                    r.valeur,
                    r.champId,
                    r.collecteId
                );
            }

            Alert.alert(
                t("success"),
                t("changesSaved")
            );
            router.replace("/enqueteurs/collectes");

        } catch (error) {
            console.log(error);

            Alert.alert(
                t("error"),
                t("cannotEditCollection")
            );
        }
    };

    const envoyer = async () => {
        try {
            await envoyerCollecte(Number(id));

            Alert.alert(
                t("success"),
                t("collectionSent")
            );
            router.replace("/enqueteurs/collectes");

        } catch (error) {
            console.log(error);

            Alert.alert(
                t("error"),
                t("cannotSendCollection")
            );
        }
    };

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: "#F5F7FA",
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
                {t("collection")} #{id}
            </Text>

            <Text
                style={{
                    color: "red",
                    fontSize: 18,
                    marginBottom: 20,
                }}
            >
                {t("numberOfAnswers")} : {reponses.length}
            </Text>

            <FlatList
                data={reponses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            marginBottom: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginBottom: 8,
                                fontSize: 16,
                            }}
                        >
                            {item.nomChamp}
                        </Text>

                        <TextInput
                            value={item.valeur}
                            onChangeText={(text) =>
                                changerValeur(item.id, text)
                            }
                            editable={
                                statut !== "VALIDEE" &&
                                statut !== "EN_ATTENTE"
                            }
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                borderRadius: 10,
                                padding: 10,
                            }}
                        />

                        {medias[item.id] && (

                            <Image
                                source={{
                                    uri: medias[item.id].startsWith("http")
                                        ? medias[item.id]
                                        : `https://debbo-collect.onrender.com${medias[item.id].startsWith("/") ? "" : "/uploads/"}${medias[item.id]}`,
                                }}
                                style={{
                                    width: "100%",
                                    height: 220,
                                    borderRadius: 12,
                                    marginTop: 15,
                                }}
                                resizeMode="cover"
                            />

                        )}

                        {item.commentaireSuperviseur && (
                            <View
                                style={{
                                    backgroundColor: "#FEF2F2",
                                    padding: 10,
                                    borderRadius: 10,
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#DC2626",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {t("supervisorComment")}
                                </Text>

                                <Text
                                    style={{
                                        color: "#991B1B",
                                        marginTop: 5,
                                    }}
                                >
                                    {item.commentaireSuperviseur}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            />

            {(statut === "ENREGISTREE" || statut === "EN_REVISION") && (
                <>
                    <TouchableOpacity
                        onPress={enregistrerModifications}
                        style={{
                            backgroundColor: "#16A34A",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 10,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                            {t("saveChanges")}
                        </Text>
                    </TouchableOpacity>


                </>
            )}
        </View>
    );
}