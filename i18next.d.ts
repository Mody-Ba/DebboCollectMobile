import "i18next";

import frAuth from "./locales/fr/auth.json";
import frMenu from "./locales/fr/menu.json";
import frCommon from "./locales/fr/common.json";
import frMessages from "./locales/fr/messages.json";
import frAdmin from "./locales/fr/admin.json";
import superviseur from "./locales/fr/superviseur.json";
import enqueteur from "./locales/fr/enqueteur.json";
import Bailleur from "./locales/fr/bailleur.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "auth";
        resources: {
            auth: typeof frAuth;
            menu: typeof frMenu;
            common: typeof frCommon;
            messages: typeof frMessages;
            admin: typeof frAdmin;
            superviseur: typeof superviseur;
            enqueteur: typeof enqueteur;
            bailleur: typeof Bailleur;

        };
    }
}