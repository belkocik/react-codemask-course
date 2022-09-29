import { LanguageCode } from "lib/models/language";
import { Language } from "../../lib/models/language";

export type SelectedLanguages = {
  source: LanguageCode;
  target: LanguageCode;
};

export type AutoDetectedLanguageRequest = {
  q: string;
};

export type TranslateTextRequest = {
  q: string;
  source: LanguageCode;
  target: LanguageCode;
  format: string;
};

export type TranslateTextResponse = {
  translatedText: string;
};
