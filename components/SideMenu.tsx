import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { changeLanguage } from "../i18n";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

type Props = {
    visible: boolean;
    onClose: () => void;
    role: "ADMIN" | "SUPERVISEUR" | "ENQUETEUR" | "BAILLEUR";
};

export default function SideMenu({
                                     visible,
                                     onClose,
                                     role,
                                 }: Props) {

    const { t } = useTranslation("menu");

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                }}
            >

                <View
                    style={{
                        width: 280,
                        backgroundColor: "white",
                        paddingTop: 70,
                        paddingHorizontal: 20,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "#16A34A",
                            marginBottom: 40,
                        }}
                    >
                        DebboCollect
                    </Text>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        onPress={() => {

                            onClose();

                            if (role === "ADMIN") {
                                router.push("/admin/message" as any);
                            } else if (role === "SUPERVISEUR") {
                                router.push("/superviseurs/messages" as any);
                            } else if (role === "ENQUETEUR") {
                                router.push("/enqueteurs/messages" as any);
                            } else {
                                router.push("/bailleur/messages" as any);
                            }

                        }}
                    >

                        <Ionicons
                            name="chatbubbles"
                            size={24}
                            color="#16A34A"
                        />

                        <Text
                            style={{
                                marginLeft: 15,
                                fontSize: 18,
                            }}
                        >
                            {t("messages")}
                        </Text>

                    </TouchableOpacity>



                </View>

                <Pressable
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    onPress={onClose}
                />

            </View>

        </Modal>
    );
}