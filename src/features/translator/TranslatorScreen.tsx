import styled from "styled-components";
import React, { useEffect } from "react";
import {
  Confidence,
  ExchangeLanguage,
  Loader,
  SelectLanguage,
  TextCounter,
  TextInput,
} from "lib/components";
import { useSupportedLanguages } from "./useSupportedLanguages";

export const TranslatorScreen: React.FunctionComponent = () => {
  const {
    isLoading,
    hasError,
    fetch: getSupportedLanguages,
  } = useSupportedLanguages((languages) => console.log(languages));

  useEffect(() => {
    getSupportedLanguages();
  }, []);

  return (
    <Container>
      <TranslatorContainer>
        <InputContainer>
          <SelectLanguage />
          <TextInput />
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
          <InputFooter>
            <Confidence />
            <TextCounter />
          </InputFooter>
        </InputContainer>
        <ExchangeLanguage />
        <InputContainer>
          <SelectLanguage />
          <TextInput />
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
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
`;

const InputFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
