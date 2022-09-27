import styled from "styled-components";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Confidence,
  ExchangeLanguage,
  Loader,
  SelectLanguage,
  TextCounter,
  TextInput,
} from "lib/components";
import { AutoDetectedLanguage, Language, LanguageCode } from "lib/models";
import { SelectedLanguages } from "./types";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";
import { useAutoDetectedLanguage, useTranslateText } from "./actions";

type TranslatorScreenProps = {
  languages: Array<Language>;
};

export const TranslatorScreen: React.FunctionComponent<
  TranslatorScreenProps
> = ({ languages }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>(
    { source: LanguageCode.Auto, target: LanguageCode.English }
  );
  const [query, setQuery] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [autoDetectedLanguage, setAutoDetectedLanguage] =
    useState<AutoDetectedLanguage>(); // initial value is `undefined` is the braceles are empty
  const T = useTranslations();

  const {
    isLoading: isTranslatingText,
    hasError: hasErrorTranslatingText,
    fetch: translateText,
  } = useTranslateText(setTranslatedText);

  const {
    isLoading: isDetectingLanguage,
    hasError: hasErrorDetectingLanguage,
    fetch: autoDetectLanguage,
  } = useAutoDetectedLanguage(setAutoDetectedLanguage);

  const debouncedAction = useDebouncedCallback((debouncedQuery) => {
    if (debouncedQuery.length < 5) {
      return;
    }

    selectedLanguages.source === LanguageCode.Auto
      ? autoDetectLanguage(debouncedQuery)
      : translateText(debouncedQuery, selectedLanguages);
  }, 1000);

  return (
    <Container>
      <TranslatorContainer>
        <InputContainer>
          <SelectLanguage
            languages={languages}
            exclude={[selectedLanguages.target]}
            selectedLanguage={selectedLanguages.source}
            onChange={(newCode) => {
              setSelectedLanguages((prevState) => ({
                ...prevState,
                source: newCode,
              }));
            }}
          />
          <TextInput
            autoFocus
            value={query}
            onChangeText={(newQuery) => {
              if (newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                return;
              }

              setQuery(newQuery);
              debouncedAction(newQuery);
            }}
            placeholder={T.screens.translator.sourceInputPlaceholder}
          />
          {isDetectingLanguage && (
            <LoaderContainer>
              {isDetectingLanguage && <Loader />}
            </LoaderContainer>
          )}
          <InputFooter>
            <Confidence
              hasError={
                hasErrorDetectingLanguage &&
                selectedLanguages.source === LanguageCode.Auto
              }
              autoDetectedLanguage={autoDetectedLanguage}
              onClick={() => {
                setSelectedLanguages((prevState) => ({
                  ...prevState,
                  source: autoDetectedLanguage?.language as LanguageCode,
                }));
                setAutoDetectedLanguage(undefined);
                debouncedAction(query);
              }}
            />
            <TextCounter
              counter={query.length}
              limit={APP_CONFIG.TEXT_INPUT_LIMIT}
            />
          </InputFooter>
        </InputContainer>
        <ExchangeLanguage
          hidden={selectedLanguages.source === LanguageCode.Auto}
          onClick={() =>
            setSelectedLanguages((prevState) => ({
              source: prevState.target,
              target: prevState.source,
            }))
          }
        />
        <InputContainer>
          <SelectLanguage
            languages={languages}
            exclude={[selectedLanguages.source, LanguageCode.Auto]}
            selectedLanguage={selectedLanguages.target}
            onChange={(newCode) => {
              setSelectedLanguages((prevState) => ({
                ...prevState,
                target: newCode,
              }));
              debouncedAction(query);
            }}
          />
          <TextInput
            disabled
            value={translatedText}
            hasError={hasErrorDetectingLanguage}
          />
          <LoaderContainer>{isTranslatingText && <Loader />}</LoaderContainer>
        </InputContainer>
      </TranslatorContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${({ theme }) => theme.colors.typography};
`;

const TranslatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  padding: 5px 10px;
  height: 2px;
`;

const InputFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// const Message = styled.div`
//   color: ${({ theme }) => theme.colors.typography};
//   margin-top: 10px;
// `;
