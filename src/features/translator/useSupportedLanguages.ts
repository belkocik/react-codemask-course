import { APP_CONFIG } from "lib/config";
import { Language } from "lib/models";
import { useState } from "react";

export const useSupportedLanguages = (
  onSuccess: (languages: Array<Language>) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

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
        .then(onSuccess)
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };
};
