import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://debbo-collect.onrender.com";

export const getSuperviseurs = async (): Promise<any> => {

    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};
export const getSuperviseurById = async (
    id: number,

) => {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const activateSuperviseur = async (
    id: number,

) => {

    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
        `${API_URL}/users/${id}/activate`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deactivateSuperviseur = async (
    id: number,
) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
        `${API_URL}/users/${id}/deactivate`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const createSuperviseur = async (
    superviseur: any,

) => {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/users/superviseurs`,
        superviseur,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const updateSuperviseur = async (
    id: number,
    superviseur: any
) => {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/users/${id}`,
        superviseur,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const deleteSuperviseur = async (
    id: number

) => {
    const token = await AsyncStorage.getItem("token");

    await axios.delete(
        `${API_URL}/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};