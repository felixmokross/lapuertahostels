import { getSupportedLocales } from "@/common/locales";
import { UIFieldServerComponent } from "payload";
import { TranslateField } from "./TranslateField";

export const TranslateFieldServer: UIFieldServerComponent =
  async function TranslateFieldServer() {
    return <TranslateField locales={await getSupportedLocales()} />;
  };
