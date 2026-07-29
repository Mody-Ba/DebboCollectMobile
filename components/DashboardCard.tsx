import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    titre: string;
    valeur: number;
    icone: keyof typeof Ionicons.glyphMap;
    couleur: string;

    // Nouveau (optionnel)
    pourcentage?: number;
};

export default function DashboardCard({
                                          titre,
                                          valeur,
                                          icone,
                                          couleur,
                                          pourcentage,
                                      }: Props) {

    return (

        <View
            style={{
                backgroundColor: "white",
                width: "48%",
                borderRadius: 18,
                padding: 18,
                marginBottom: 15,
                elevation: 4,
            }}
        >

            <Ionicons
                name={icone}
                size={34}
                color={couleur}
            />

            <Text
                style={{
                    marginTop: 12,
                    fontWeight: "600",
                    color: "#64748B",
                    fontSize: 18,
                }}
            >
                {titre}
            </Text>

            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginTop: 8,
                }}
            >
                {valeur}
            </Text>

            {pourcentage !== undefined && (

                <Text
                    style={{
                        marginTop: 6,
                        color: couleur,
                        fontWeight: "700",
                        fontSize: 16,
                    }}
                >
                    {pourcentage} %
                </Text>

            )}

        </View>

    );

}