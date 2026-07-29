import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import frAuth from "./locales/fr/auth.json";
import enAuth from "./locales/en/auth.json";
import arAuth from "./locales/ar/auth.json";

import frMenu from "./locales/fr/menu.json";
import enMenu from "./locales/en/menu.json";
import arMenu from "./locales/ar/menu.json";

import frCommon from "./locales/fr/common.json";
import enCommon from "./locales/en/common.json";
import arCommon from "./locales/ar/common.json";

import frMessages from "./locales/fr/messages.json";
import enMessages from "./locales/en/messages.json";
import arMessages from "./locales/ar/messages.json";

import frSuperviseur from "./locales/fr/superviseur.json";
import enSuperviseur from "./locales/en/superviseur.json";
import arSuperviseur from "./locales/ar/superviseur.json";

import frEnqueteur from "./locales/fr/enqueteur.json";
import enEnqueteur from "./locales/en/enqueteur.json";
import arEnqueteur from "./locales/ar/enqueteur.json";

import frBailleur from "./locales/fr/bailleur.json";
import enBailleur from "./locales/en/bailleur.json";
import arBailleur from "./locales/ar/bailleur.json";

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: "v4",

        resources: {
            fr: {
                auth: frAuth,
                menu: frMenu,
                common: frCommon,
                messages: frMessages,
                superviseur: frSuperviseur,
                enqueteur: frEnqueteur,
                bailleur: frBailleur,
            },

            en: {
                auth: enAuth,
                menu: enMenu,
                common: enCommon,
                messages: enMessages,
                superviseur: enSuperviseur,
                enqueteur: enEnqueteur,
                bailleur: enBailleur,


            },

            ar: {
                auth: arAuth,
                menu: arMenu,
                common: arCommon,
                messages: arMessages,
                superviseur: arSuperviseur,
                enqueteur: arEnqueteur,
                bailleur: arBailleur,


            },
        },

        lng: Localization.getLocales()[0]?.languageCode || "fr",
        fallbackLng: "fr",

        defaultNS: "auth",

        ns: [
            "auth",
            "menu",
            "common",
            "messages",
            "superviseur",
            "enqueteur",
            "bailleur"

],

        interpolation: {
            escapeValue: false,
        },
    });

async function loadLanguage() {
    if (typeof window === "undefined") {
        return "fr";
    }

    const language = await AsyncStorage.getItem("language");

    if (language) {
        await i18n.changeLanguage(language);
    }
}

loadLanguage();

export async function changeLanguage(lang: "fr" | "en" | "ar") {
    await AsyncStorage.setItem("language", lang);
    await i18n.changeLanguage(lang);
}

export default i18n;