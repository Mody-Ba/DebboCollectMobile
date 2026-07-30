import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://192.168.2.70:8080/api/lots";

export const creerLot = async (
    projetId: number
) => {

    const token = await getToken();

    const response = await axios.post(
        API_URL,
        {
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

export const getLots = async () => {

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

export const getLotById = async (
    id: number
) => {

    const token = await getToken();

    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const validerLot = async (
    id: number
) => {

    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${id}/valider`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const demanderRevisionLot = async (
    id: number
) => {

    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${id}/revision`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};