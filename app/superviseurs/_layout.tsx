import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SuperviseurLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#16A34A",
                tabBarInactiveTintColor: "#6B7280",
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
                name="projets/index"
                options={{
                    title: "Projets",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="folder"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="enqueteurs/index"
                options={{
                    title: "Enquêteurs",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="people"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="bailleurs/index"
                options={{
                    title: "Bailleurs",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="business"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Routes cachées */}

            <Tabs.Screen
                name="projets/ajouter-projet"
                options={{
                    href: null,
                }}
            />



            <Tabs.Screen
                name="projets/[id]/modifier"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="bailleurs/ajouter-bailleur"
                options={{
                    href: null,
                }}
            />



            <Tabs.Screen
                name="bailleurs/[id]/modifier"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="bailleurs/[id]/index"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="projets/[id]/index"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="enqueteurs/ajouter-enqueteur"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="enqueteurs/[id]/index"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="enqueteurs/[id]/modifier"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="projets/[id]/champs/index"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="projets/[id]/champs/ajouter"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="projets/[id]/champs/apercu"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="projets/[id]/assigner-enqueteur"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="collectes/index"
                options={{
                    title: "Collectes",
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
                name="collectes/[id]"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="collectes/collecte/[id]"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="statistique"
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