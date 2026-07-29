import axios from "axios";
import { getToken } from "./authService";

const API_URL = "https://debbo-collect.onrender.com/api/reponses";

export const creerReponse = async (
    valeur: string,
    champId: number,
    collecteId: number
) => {

    const token = await getToken();

    const response = await axios.post(
        API_URL,
        {
            valeur,
            champId,
            collecteId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const ajouterCommentaire = async (
    reponseId: number,
    commentaire: string
) => {

    const token = await getToken();

    const response = await axios.put(
        `${API_URL}/${reponseId}/commentaire`,
        JSON.stringify(commentaire),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};