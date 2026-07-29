import React from "react";
import { View, Text } from "react-native";

type Props = {
    titre: string;
    data: {
        valeur: string;
        nombre: number;
    }[];
};

export default function BarChartCard({ titre, data }: Props) {
    if (!data || data.length === 0) {
        return null;
    }

    const total = data.reduce((sum, item) => sum + item.nombre, 0);

    return (
        <View
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: 20,
                marginBottom: 25,
                elevation: 4,
            }}
        >
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: "800",
                    color: "#1E293B",
                    marginBottom: 25,
                }}
            >
                {titre}
            </Text>

            {data.map((item, index) => {
                const pourcentage =
                    total === 0 ? 0 : (item.nombre / total) * 100;

                return (
                    <View
                        key={index}
                        style={{
                            marginBottom: 22,
                        }}
                    >
                        {/* Nom + Pourcentage */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 8,
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: "#1E293B",
                                    marginRight: 10,
                                }}
                                numberOfLines={1}
                            >
                                {item.valeur}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    color: "#16A34A",
                                }}
                            >
                                {pourcentage.toFixed(1)}%
                            </Text>
                        </View>

                        {/* Barre de fond */}
                        <View
                            style={{
                                width: "100%",
                                height: 14,
                                backgroundColor: "#E5E7EB",
                                borderRadius: 8,
                                overflow: "hidden",
                            }}
                        >
                            {/* Barre verte */}
                            <View
                                style={{
                                    width: `${pourcentage}%`,
                                    height: "100%",
                                    backgroundColor: "#16A34A",
                                    borderRadius: 8,
                                }}
                            />
                        </View>

                        {/* Nombre de réponses */}
                        <Text
                            style={{
                                marginTop: 6,
                                fontSize: 13,
                                color: "#64748B",
                            }}
                        >
                            {item.nombre} réponse{item.nombre > 1 ? "s" : ""}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}