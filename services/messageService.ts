import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://debbo-collect.onrender.com/api/messages";


async function getHeaders() {
    const token = await AsyncStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// Liste des conversations
export async function getConversations() {

    const response = await fetch(`${API}/conversations`, {
        headers: await getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Impossible de récupérer les conversations");
    }

    return response.json();
}

// Conversation entre deux utilisateurs
export async function getConversation(utilisateurId: number) {

    const response = await fetch(
        `${API}/conversation/${utilisateurId}`,
        {
            headers: await getHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Impossible de récupérer la conversation");
    }

    return response.json();
}

// Envoyer un message
export async function envoyerMessage(
    contenu: string,
    destinataireId: number
) {

    const response = await fetch(API, {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify({
            contenu,
            lu: false,
            destinataireId,
        }),
    });

    if (!response.ok) {
        throw new Error("Impossible d'envoyer le message");
    }

    return response.json();
}

export async function getNombreMessagesNonLus() {

    const response = await fetch(`${API}/non-lus`, {
        headers: await getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Impossible de récupérer le nombre de messages non lus");
    }

    return response.json();
}