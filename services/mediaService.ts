import axios from "axios";
import { getToken } from "./authService";

const API_URL = "https://debbo-collect.onrender.com/api/medias";

export const uploadMedia = async (imageUri: string) => {
    try {
        console.log("IMAGE URI =", imageUri);

        const token = await getToken();
        const extension = imageUri.toLowerCase().endsWith(".png")
            ? "png"
            : "jpg";

        const formData = new FormData();

        formData.append("file", {
            uri: imageUri,
            name: `photo_${Date.now()}.${extension}`,
            type: extension === "png"
                ? "image/png"
                : "image/jpeg",
        } as any);

        const response = await axios.post(
            `${API_URL}/upload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Ne pas mettre Content-Type ici
                    // Axios ajoutera multipart/form-data avec boundary
                },
            }
        );

        console.log("UPLOAD RÉUSSI =", response.data);

        return response.data;

    } catch (error: any) {
        console.log("ERREUR UPLOAD STATUS =", error.response?.status);
        console.log("ERREUR UPLOAD DATA =", error.response?.data);
        console.log("ERREUR UPLOAD MESSAGE =", error.message);

        throw error;
    }
};
export const creerMedia = async (
    url: string,
    reponseId: number
) => {

    const token = await getToken();

    console.log("MEDIA =", {
        type: "PHOTO",
        url,
        reponseId,
    });

    const response = await axios.post(
        API_URL,
        {
            url,
            reponseId,
            type: "PHOTO",
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 60000, // 60 secondes pour les uploads
        }
    );

    return response.data;
};

export const getMediasByReponse = async (
    reponseId: number
) => {

    const token = await getToken();

    const response = await axios.get(
        `${API_URL}/reponse/${reponseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};