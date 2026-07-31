import axios from "axios";
import { getToken } from "./authService";
import * as Location from "expo-location";

const API_URL = "https://debbo-collect.onrender.com/api/collectes";

export const creerCollecte = async (
    projetId: number
) => {

    const token = await getToken();

    const { status } =
        await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {

        throw new Error("Permission GPS refusée");

    }

    const position =
        await Location.getCurrentPositionAsync({});

    const adresse =
        await Location.reverseGeocodeAsync({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });

    const ville =
        adresse[0]?.city ||
        adresse[0]?.subregion ||
        adresse[0]?.region ||
        "Inconnue";

    const response = await axios.post(
        API_URL,
        {
            dateCollecte:
                new Date().toISOString().split("T")[0],

            localisation: ville,

            latitude: position.coords.latitude,

            longitude: position.coords.longitude,

            projetId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getCollectes = async () => {

    const token = await getToken();

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getReponsesByCollecte = async (
    collecteId: number
) => {

    const token = await getToken();

    const response = await axios.get(
        `https://debbo-collect.onrender.com/api/reponses/collecte/${collecteId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const modifierReponse = async (
    reponseId: number,
    valeur: string,
    champId: number,
    collecteId: number
) => {
    const token = await getToken();

    const response = await axios.put(
        `https://debbo-collect.onrender.com/api/reponses/${reponseId}`,
        {
            valeur,
            champId,
            collecteId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const envoyerCollecte = async (collecteId: number) => {
    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${collecteId}/envoyer`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const validerCollecte = async (
    collecteId: number
) => {

    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${collecteId}/valider`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const demanderRevision = async (
    collecteId: number
) => {

    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${collecteId}/revision`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};