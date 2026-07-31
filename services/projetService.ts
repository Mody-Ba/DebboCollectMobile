import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getToken} from "@/services/authService";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";


const API_URL = "https://debbo-collect.onrender.com/api/projets";

const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const getProjets = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const getProjetById = async (id: number) => {
    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const createProjet = async (projet: any) => {
    const response = await axios.post(
        API_URL,
        projet,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const updateProjet = async (
    id: number,
    projet: any
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        projet,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const deleteProjet = async (id: number) => {
    await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: await getHeaders(),
        }
    );
};
export const assignerEnqueteur = async (
    projetId: number,
    enqueteurId: number
) => {

    const response = await axios.put(
        `${API_URL}/${projetId}/assigner-enqueteur/${enqueteurId}`,
        {},
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const exporterProjetExcel = async (projetId: number) => {

    const token = await getToken();

    const fileUri =
        FileSystem.documentDirectory +
        `Projet_${projetId}.xlsx`;

    const download = await FileSystem.downloadAsync(
        `${API_URL}/${projetId}/excel`,
        fileUri,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    await Sharing.shareAsync(download.uri);

};
export const getProjetsBailleur = async () => {

    const response = await axios.get(
        `${API_URL}/bailleur`,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const getDashboard = async () => {
    const response = await axios.get(
        "https://debbo-collect.onrender.com/api/statistiques/dashboard",
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const envoyerAuBailleur = async (id: number) => {

    const response = await axios.put(
        `${API_URL}/${id}/envoyer-bailleur`,
        {},
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};
export const getDashboardProjet = async (id: number) => {

    const response = await axios.get(
        `${API_URL}/${id}/dashboard`,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const terminerProjet = async (id: number) => {

    const response = await axios.put(
        `${API_URL}/${id}/terminer`,
        {},
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};
