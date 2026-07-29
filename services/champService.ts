import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://debbo-collect.onrender.com/api/champs";

const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const getChampsByProjet = async (
    projetId: number
) => {

    const response = await axios.get(
        `${API_URL}/projet/${projetId}`,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const createChamp = async (
    champ: any
) => {

    const response = await axios.post(
        API_URL,
        champ,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const updateChamp = async (
    id: number,
    champ: any
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        champ,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const deleteChamp = async (
    id: number
) => {

    await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: await getHeaders(),
        }
    );
};