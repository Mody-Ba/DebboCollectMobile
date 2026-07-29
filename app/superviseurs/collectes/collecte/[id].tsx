import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import {
    getReponsesByCollecte,
} from "../../../../services/collectService";

import {
    ajouterCommentaire,
} from "../../../../services/reponseService";

import {
    getMediasByReponse,
} from "../../../../services/mediaService";

const SERVER_URL = "https://debbo-collect.onrender.com";

export default function DetailCollecteSuperviseur() {
    const { id } = useLocalSearchParams();

    const [reponses, setReponses] = useState<any[]>([]);
    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerReponses();
    }, [id]);

    const construireUrlPhoto = (url: string) => {
        if (!url) {
            return "";
        }

        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }

        if (url.startsWith("/")) {
            return `${SERVER_URL}${url}`;
        }

        return `${SERVER_URL}/uploads/${url}`;
    };

    const chargerReponses = async () => {
        try {
            const data = await getReponsesByCollecte(Number(id));

            const reponsesAvecMedias = await Promise.all(
                data.map(async (reponse: any) => {
                    try {
                        const medias = await getMediasByReponse(
                            reponse.id
                        );

                        console.log(
                            `MÉDIAS RÉPONSE ${reponse.id} =`,
                            medias
                        );

                        return {
                            ...reponse,
                            medias: Array.isArray(medias)
                                ? medias
                                : [],
                        };

                    } catch (error) {
                        console.log(
                            `Erreur médias réponse ${reponse.id} =`,
                            error
                        );

                        return {
                            ...reponse,
                            medias: [],
                        };
                    }
                })
            );

            setReponses(reponsesAvecMedias);

        } catch (error) {
            console.log("ERREUR CHARGEMENT RÉPONSES =", error);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("collection")}
            </Text>

            <FlatList
                data={reponses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 10,
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

                        <Text
                            style={{
                                color: "#475569",
                                fontSize: 15,
                            }}
                        >
                            {t("answer")} : {item.valeur}
                        </Text>

                        {item.medias?.length > 0 && (
                            <View style={{ marginTop: 15 }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        marginBottom: 8,
                                    }}
                                >
                                    Preuve
                                </Text>

                                {item.medias.map((media: any) => {
                                    const photoUrl =
                                        construireUrlPhoto(media.url);

                                    console.log(
                                        "URL PHOTO SUPERVISEUR =",
                                        photoUrl
                                    );

                                    return (
                                        <Image
                                            key={media.id}
                                            source={{ uri: photoUrl }}
                                            resizeMode="cover"
                                            style={{
                                                width: "100%",
                                                height: 220,
                                                borderRadius: 12,
                                                marginBottom: 10,
                                                backgroundColor: "#E2E8F0",
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        )}

                        <Text
                            style={{
                                marginTop: 10,
                                fontWeight: "bold",
                            }}
                        >
                            {t("supervisorComment")}
                        </Text>

                        <TextInput
                            placeholder={t("addComment")}
                            placeholderTextColor="#94A3B8"
                            value={item.commentaireSuperviseur || ""}
                            onChangeText={(text) => {
                                setReponses((anciennesReponses) =>
                                    anciennesReponses.map((reponse) =>
                                        reponse.id === item.id
                                            ? {
                                                ...reponse,
                                                commentaireSuperviseur: text,
                                            }
                                            : reponse
                                    )
                                );
                            }}
                            multiline
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                backgroundColor: "white",
                                borderRadius: 10,
                                padding: 12,
                                marginTop: 5,
                                minHeight: 80,
                                textAlignVertical: "top",
                            }}
                        />

                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    await ajouterCommentaire(
                                        item.id,
                                        item.commentaireSuperviseur
                                    );

                                    alert(t("commentSaved"));

                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                            style={{
                                backgroundColor: "#2563EB",
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}
                            >
                                {t("saveComment")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}