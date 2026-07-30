import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.2.70:8080/users";

const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const getUsers = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const createBailleur = async (bailleur: any) => {
    const response = await axios.post(
        `${API_URL}/bailleurs`,
        bailleur,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};
export const getUserById = async (id: number) => {
    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const updateUser = async (
    id: number,
    utilisateur: any
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        utilisateur,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};
export const deleteUser = async (id: number) => {
    await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: await getHeaders(),
        }
    );
};
export const activateUser = async (id: number) => {
    const response = await axios.put(
        `${API_URL}/${id}/activate`,
        {},
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};

export const deactivateUser = async (id: number) => {
    const response = await axios.put(
        `${API_URL}/${id}/deactivate`,
        {},
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};
export const createEnqueteur = async (enqueteur: any) => {
    const response = await axios.post(
        `${API_URL}/enqueteurs`,
        enqueteur,
        {
            headers: await getHeaders(),
        }
    );

    return response.data;
};