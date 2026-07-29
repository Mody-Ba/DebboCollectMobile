import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EnqueteurLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Accueil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="projets/index"
                options={{
                    title: "Mes projets",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="folder" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="collectes/index"
                options={{
                    title: "Mes collectes",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="clipboard"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="statistiques/index"
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
                name="projets/[id]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="collectes/[id]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="formulaire/[id]"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="collectes/projet/[id]"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="statistiques/graphiques"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="messages/index"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="messages/conversation"
                options={{
                    href: null,
                }}
            />





        </Tabs>
    );
}