import { LanguageCode } from "./language";

export type AutoDetectedLanguage = {
  confidence: number;
  language: LanguageCode;
};
