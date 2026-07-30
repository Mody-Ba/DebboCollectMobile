import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://debbo-collect.onrender.com/api/auth";

export const login = async (
    email: string,
    password: string
) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;
};
export const saveToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem("token");
};

export const removeToken = async () => {
    await AsyncStorage.removeItem("token");
};

export const saveRole = async (role: string) => {
    await AsyncStorage.setItem("role", role);
};

export const getRole = async () => {
    return await AsyncStorage.getItem("role");
};