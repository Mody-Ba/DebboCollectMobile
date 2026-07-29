import { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Switch,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getChampsByProjet } from "../../../../../services/champService";
import { useTranslation } from "react-i18next";

export default function ApercuFormulaireScreen() {

    const { id } = useLocalSearchParams();

    const [champs, setChamps] = useState<any[]>([]);

    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerChamps();
    }, [id]);

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

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#F5F7FA",
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                {t("formPreview")}
            </Text>

            {champs.map((champ: any) => (

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
                            placeholder={t("answer")}
                            editable={false}
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        />
                    )}

                    {champ.type === "NOMBRE" && (
                        <TextInput
                            placeholder="0"
                            editable={false}
                            keyboardType="numeric"
                            style={{
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        />
                    )}

                    {champ.type === "DATE" && (
                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            📅 {t("selectDate")}
                        </Text>
                    )}

                    {champ.type === "PHOTO" && (
                        <Text
                            style={{
                                color: "#64748B",
                            }}
                        >
                            📷 {t("takePhoto")}
                        </Text>
                    )}

                    {champ.type === "OUI_NON" && (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Switch value={false} />

                            <Text
                                style={{
                                    marginLeft: 10,
                                }}
                            >
                                {t("yesNo")}
                            </Text>
                        </View>
                    )}
                    {champ.type === "CHOIX_UNIQUE" && (

                        <View>

                            {champ.options?.split(";").map((option: string, index: number) => (

                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginRight: 10,
                                        }}
                                    >
                                        ○
                                    </Text>

                                    <Text>{option}</Text>

                                </View>

                            ))}

                        </View>

                    )}
                    {champ.type === "CHOIX_MULTIPLE" && (

                        <View>

                            {champ.options?.split(";").map((option: string, index: number) => (

                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginRight: 10,
                                        }}
                                    >
                                        ☐
                                    </Text>

                                    <Text>{option}</Text>

                                </View>

                            ))}

                        </View>

                    )}
                </View>
            ))}
        </ScrollView>
    );
}