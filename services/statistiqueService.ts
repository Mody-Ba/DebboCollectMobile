import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/services/authService";

const API_URL = "http://192.168.2.70:8080/api/statistiques";

const getHeaders = async () => {

    const token = await AsyncStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

};

export const getDashboard = async (
    projetId: number,
    region?: string
) => {

    let url = `${API_URL}/dashboard/${projetId}`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};

export const getStatistiquesQuestions = async (
    projetId: number,
    region?: string
) => {

    let url = `${API_URL}/questions/${projetId}`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};

export const getLocalisationStats = async (
    projetId: number,
    region?: string
) => {

    let url = `${API_URL}/localisation/${projetId}`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};

export const getDashboardAccueil = async () => {

    const token = await getToken();

    const response = await axios.get(
        `${API_URL}/dashboard-accueil`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};

export const getDashboardEnqueteur = async (
    region?: string
) => {

    let url = `${API_URL}/dashboard-enqueteur`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};
export const getStatistiquesQuestionsEnqueteur = async (
    region?: string
) => {

    let url = `${API_URL}/questions-enqueteur`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};

export const getCollectesParRegion = async (
    projetId: number,
    region?: string
) => {

    let url = `${API_URL}/localisation/${projetId}`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};

export const getCollectesParRegionEnqueteur = async (
    region?: string
) => {

    let url = `${API_URL}/localisation-enqueteur`;

    if (region && region !== "") {
        url += `?region=${encodeURIComponent(region)}`;
    }

    const response = await axios.get(url, {
        headers: await getHeaders(),
    });

    return response.data;

};