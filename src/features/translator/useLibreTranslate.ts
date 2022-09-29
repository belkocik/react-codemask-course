import { useState } from "react";
import { AutoDetectedLanguage, LanguageCode } from "lib/models";
import { SelectedLanguages } from "./types";
import { useDebouncedCallback } from "use-debounce";
import { useAutoDetectedLanguage, useTranslateText } from "./actions";

export const useLibreTranslate = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>(
    { source: LanguageCode.Auto, target: LanguageCode.English }
  );
  const [query, setQuery] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [autoDetectedLanguage, setAutoDetectedLanguage] =
    useState<AutoDetectedLanguage>(); // initial value is `undefined` is the braceles are empty

  const {
    isLoading: isDetectingLanguage,
    hasError: hasErrorDetectingLanguage,
    fetch: autoDetectLanguage,
  } = useAutoDetectedLanguage(setAutoDetectedLanguage);

  const {
    isLoading: isTranslatingText,
    hasError: hasErrorTranslatingText,
    fetch: translateText,
  } = useTranslateText(setTranslatedText);

  const debouncedAction = useDebouncedCallback((debouncedQuery) => {
    if (debouncedQuery.length < 5) {
      return;
    }

    selectedLanguages.source === LanguageCode.Auto
      ? autoDetectLanguage({
          q: debouncedQuery,
        })
      : translateText({
          q: debouncedQuery,
          source: selectedLanguages.source,
          target: selectedLanguages.target,
          format: "text",
        });
  }, 1000);

  return {
    selectedLanguages,
    query,
    setQuery,
    translatedText,
    autoDetectedLanguage,
    isDetectingLanguage,
    hasErrorDetectingLanguage,
    isTranslatingText,
    hasErrorTranslatingText,
    debouncedAction,
    setSelectedLanguages,
    setAutoDetectedLanguage,
  };
};
