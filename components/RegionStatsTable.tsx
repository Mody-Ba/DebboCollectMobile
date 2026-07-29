import { View, Text } from "react-native";
import * as Progress from "react-native-progress";

type Props = {
    localisations: any[];
};

export default function RegionStatsTable({
                                             localisations,
                                         }: Props) {

    const total = localisations.reduce(
        (sum, item) => sum + item.nombre,
        0
    );

    return (

        <View
            style={{
                backgroundColor: "white",
                borderRadius: 18,
                padding: 20,
                marginTop: 25,
                elevation: 3,
            }}
        >

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Répartition par région
            </Text>

            {localisations.map((item, index) => {

                const pourcentage =
                    total === 0
                        ? 0
                        : item.nombre / total;

                return (

                    <View
                        key={index}
                        style={{
                            marginBottom: 18,
                        }}
                    >

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 6,
                            }}
                        >

                            <Text
                                style={{
                                    fontWeight: "600",
                                }}
                            >
                                {item.region}
                            </Text>

                            <Text>
                                {item.nombre}
                            </Text>

                        </View>

                        <Progress.Bar
                            progress={pourcentage}
                            width={null}
                            height={10}
                            borderWidth={0}
                            color="#2563EB"
                            unfilledColor="#E5E7EB"
                        />

                    </View>

                );

            })}

        </View>

    );

}