import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function AdminLayout() {

    const { t } = useTranslation("menu");

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
                    title: t("home"),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="superviseurs"
                options={{
                    title: t("supervisors"),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="etat"
                options={{
                    title: t("state"),
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
                name="ajouter-superviseur"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="superviseur/[id]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="modifier-superviseur/[id]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="message/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="message/conversation"
                options={{ href: null }}
            />
        </Tabs>
    );
}