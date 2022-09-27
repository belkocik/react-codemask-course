import { APP_CONFIG } from "lib/config";
import { useTranslations } from "lib/hooks";
import { AutoDetectedLanguage, Language, LanguageCode } from "lib/models";
import { useState } from "react";
import { SelectedLanguages } from "./types";

export const useSupportedLanguages = (
  onSuccess: (languages: Array<Language>) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const T = useTranslations();

  return {
    isLoading,
    hasError,
    fetch: () => {
      setIsLoading(true);
      setHasError(false);
      fetch(`${APP_CONFIG.API_URL}/languages`)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw response;
        })
        .then((response) => response.json())
        .then((languages) => {
          const allLanguages: Array<Language> = [
            {
              code: LanguageCode.Auto,
              name: T.common.autoTranslate,
            },
          ].concat(languages);
          onSuccess(allLanguages);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};

export const useAutoDetectedLanguage = (
  onSuccess: (autoDetectedLanguage: AutoDetectedLanguage) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  return {
    isLoading,
    hasError,
    fetch: (query: string) => {
      setIsLoading(true);
      setHasError(false);
      fetch(`${APP_CONFIG.API_URL}/detect`, {
        method: "POST",
        body: JSON.stringify({
          q: query,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw response;
        })
        .then((response) => response.json())
        .then(([autoDetectedLanguage]) => onSuccess(autoDetectedLanguage))
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};

export const useTranslateText = (
  onSuccess: (translatedText: string) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  return {
    isLoading,
    hasError,
    fetch: (query: string, selectedLanguages: SelectedLanguages) => {
      setIsLoading(true);
      setHasError(false);
      fetch(`${APP_CONFIG.API_URL}/translate`, {
        method: "POST",
        body: JSON.stringify({
          q: query,
          source: selectedLanguages.source,
          target: selectedLanguages.target,
          format: "text",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw response;
        })
        .then((response) => response.json())
        .then(({ translatedText }) => onSuccess(translatedText))
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};
