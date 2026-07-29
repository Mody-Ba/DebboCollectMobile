import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Alert } from "react-native";
import { createProjet } from "../../../services/projetService";
import { router } from "expo-router";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { getUsers } from "../../../services/userService";
import { useTranslation } from "react-i18next";

export default function AjouterProjetScreen() {

    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [zoneGeographique, setZoneGeographique] = useState("");
    const [type, setType] = useState("");
    const [bailleurs, setBailleurs] = useState<any[]>([]);
    const [bailleurId, setBailleurId] = useState<number | null>(null);

    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const { t } = useTranslation("superviseur");

    useEffect(() => {
        chargerBailleurs();
    }, []);

    const chargerBailleurs = async () => {
        try {
            const data = await getUsers();

            const listeBailleurs = data.filter(
                (u: any) => u.role === "BAILLEUR"
            );

            setBailleurs(listeBailleurs);


        } catch (error) {
            console.log(error);
        }
    };

    const viderFormulaire = () => {
        setNom("");
        setDescription("");
        setZoneGeographique("");
        setType("");
        setDateDebut("");
        setDateFin("");
        setBailleurId(null);
    };

    const enregistrerProjet = async () => {
        try {

            const projet = {
                nom,
                description,
                zoneGeographique,
                dateDebut,
                dateFin,
                type,
                bailleurId,
            };

            console.log("PROJET =", projet);

            await createProjet(projet);
            viderFormulaire();

            Alert.alert(
                t("success"),
                t("projectCreated")
            );

            router.replace("/superviseurs/projets");

        } catch (error) {
            console.log(error);

            Alert.alert(
                t("error"),
                t("projectCreateError")
            );
        }
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
                    marginBottom: 25,
                }}
            >
                {t("addProject")}
            </Text>

            <Text style={{ marginBottom: 5 }}>
                {t("projectName")}
            </Text>

            <TextInput
                value={nom}
                onChangeText={setNom}
                placeholder={t("projectName")}
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
                value={description}
                onChangeText={setDescription}
                placeholder={t("description")}
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
                value={zoneGeographique}
                onChangeText={setZoneGeographique}
                placeholder={t("exampleSenegal")}
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
                value={type}
                onChangeText={setType}
                placeholder={t("exampleHealth")}
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
                value={dateDebut}
                onChangeText={setDateDebut}
                placeholder="2026-06-08"
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
                value={dateFin}
                onChangeText={setDateFin}
                placeholder="2026-07-08"
                style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 12,
                    marginBottom: 15,
                }}
            />

            <Text style={{ marginBottom: 5 }}>
                {t("donor")}
            </Text>

            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    marginBottom: 25,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    overflow: "hidden",
                }}
            >
                <Picker
                    selectedValue={bailleurId}
                    onValueChange={(value) => setBailleurId(value)}
                    mode="dropdown"
                >
                    <Picker.Item
                        label={t("selectDonor")}
                        value={null}
                    />

                    {bailleurs.map((bailleur) => (
                        <Picker.Item
                            key={bailleur.id}
                            label={bailleur.nom}
                            value={bailleur.id}
                        />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity
                onPress={enregistrerProjet}
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
                    {t("save")}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}