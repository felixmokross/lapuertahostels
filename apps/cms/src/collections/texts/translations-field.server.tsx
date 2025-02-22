import { getSupportedLocales } from "@/common/locales";
import { UIFieldServerComponent } from "payload";
import { TranslationsField } from "./translations-field";

export const TranslationsFieldServer: UIFieldServerComponent =
  async function TranslateFieldServer() {
    return <TranslationsField locales={await getSupportedLocales()} />;
  };
