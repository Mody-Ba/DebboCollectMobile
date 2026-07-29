import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
    localisations: any[];
};

export default function LocalisationStats({
                                              localisations,
                                          }: Props) {

    const total = localisations.reduce(
        (sum, item) => sum + item.nombre,
        0
    );

    return (

        <View
            style={{
                marginTop: 30,
            }}
        >

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Répartition par localisation
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >

                {/* Carte */}

                <MapView
                    style={{
                        flex: 1,
                    }}
                    region={
                        localisations.length > 0
                            ? {
                                latitude: localisations[0].latitude,
                                longitude: localisations[0].longitude,
                                latitudeDelta: 2,
                                longitudeDelta: 2,
                            }
                            : undefined
                    }
                >

                    {localisations.map((item: any) => (

                        <Marker
                            key={item.region}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            title={item.region}
                            description={`${item.nombre} collecte(s)`}
                        />

                    ))}

                </MapView>

                {/* Liste */}

                <View
                    style={{
                        width: "48%",
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 15,
                    }}
                >

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginBottom: 20,
                            fontSize: 18,
                        }}
                    >
                        Collectes par région
                    </Text>

                    {localisations.map((item, index) => {

                        const pourcentage =
                            total === 0
                                ? 0
                                : Math.round(
                                    (item.nombre * 100) /
                                    total
                                );

                        return (

                            <View
                                key={`${item.region}-${index}`}
                                style={{
                                    marginBottom: 18,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 5,
                                    }}
                                >

                                    <Text>
                                        {item.region}
                                    </Text>

                                    <Text>
                                        {item.nombre}
                                    </Text>

                                </View>

                                <View
                                    style={{
                                        height: 8,
                                        backgroundColor: "#E5E7EB",
                                        borderRadius: 10,
                                    }}
                                >

                                    <View
                                        style={{
                                            width: `${pourcentage}%`,
                                            height: 8,
                                            backgroundColor: "#16A34A",
                                            borderRadius: 10,
                                        }}
                                    />

                                </View>

                            </View>

                        );

                    })}

                </View>

            </View>

        </View>

    );

}