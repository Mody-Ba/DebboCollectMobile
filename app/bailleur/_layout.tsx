import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BailleurLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#16A34A",
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: "Accueil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="statistiques"
                options={{
                    title: "Statistiques",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="stats-chart"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="graphiques"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="messages/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="messages/conversation"
                options={{ href: null }}
            />

        </Tabs>
    );
}