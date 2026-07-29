import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { changeLanguage } from "../i18n";

type Lang = "fr" | "en" | "ar";

type ContextType = {
    language: Lang;
    setLanguage: (lang: Lang) => Promise<void>;
    loading: boolean;
};

const LanguageContext = createContext<ContextType>({} as ContextType);

export function LanguageProvider({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const [language, setCurrentLanguage] = useState<Lang>("fr");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const saved = (await AsyncStorage.getItem("language")) as Lang | null;

            if (saved) {
                await i18n.changeLanguage(saved);
                setCurrentLanguage(saved);
            }

            setLoading(false);
        })();
    }, []);

    const setLanguage = async (lang: Lang) => {
        await changeLanguage(lang);
        setCurrentLanguage(lang);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                loading,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);