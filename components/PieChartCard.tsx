import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type Props = {
    titre: string;
    data: any[];
    compact?: boolean;
};

export default function PieChartCard({
                                         titre,
                                         data,
                                         compact = false,
                                     }: Props) {

    if (data.length === 0) {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: compact ? 12 : 20,
                    marginBottom: 20,
                    elevation: 3,
                }}
            >
                <Text
                    style={{
                        fontSize: compact ? 16 : 20,
                        fontWeight: "bold",
                        marginBottom: 15,
                    }}
                >
                    {titre}
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: "#6B7280",
                        paddingVertical: compact ? 20 : 40,
                        fontSize: compact ? 13 : 16,
                    }}
                >
                    Aucune donnée disponible
                </Text>
            </View>
        );
    }

    return (

        <View
            style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: compact ? 12 : 20,
                marginBottom: 20,
                elevation: 3,
            }}
        >

            <Text
                numberOfLines={2}
                style={{
                    fontSize: compact ? 15 : 20,
                    fontWeight: "bold",
                    marginBottom: 15,
                }}
            >
                {titre}
            </Text>

            <View
                style={{
                    alignItems: "center",
                }}
            >

                <PieChart
                    data={data}
                    donut
                    radius={compact ? 55 : 95}
                    innerRadius={compact ? 32 : 55}
                    showText
                    textColor="white"
                    textSize={compact ? 11 : 16}
                    strokeWidth={2}
                    showValuesAsLabels
                />

            </View>

            <View
                style={{
                    marginTop: compact ? 12 : 20,
                }}
            >
                {data.map((item: any, index: number) => (

                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: compact ? 6 : 10,
                        }}
                    >

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >

                            <View
                                style={{
                                    width: compact ? 10 : 14,
                                    height: compact ? 10 : 14,
                                    borderRadius: 20,
                                    backgroundColor: item.color,
                                    marginRight: 8,
                                }}
                            />

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: compact ? 12 : 16,
                                    flex: 1,
                                }}
                            >
                                {item.label}
                            </Text>

                        </View>

                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: compact ? 12 : 16,
                                marginLeft: 5,
                            }}
                        >
                            {item.value}
                        </Text>

                    </View>

                ))}
            </View>

        </View>

    );

}