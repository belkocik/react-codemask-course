import styled, { ThemeProvider } from "styled-components";
import { TranslatorScreen, translatorActions } from "features/translator";
import { theme } from "lib/styles";
import { Footer, Header } from "lib/components";
import { useTranslations } from "lib/hooks";

import { Loader, Message } from "lib/components";
import { useState, useEffect } from "react";
import { Language } from "lib/models/language";

export const App = () => {
  const T = useTranslations();
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const {
    isLoading,
    hasError,
    fetch: getSupportedLanguages,
  } = translatorActions.useSupportedLanguages(setLanguages);

  useEffect(() => {
    getSupportedLanguages();
  }, []);

  const getLayout = () => {
    if (isLoading) {
      return (
        <FetchLoaderContainer>
          <Loader>
            <LoaderText>{T.screen.translator.loading}</LoaderText>
          </Loader>
        </FetchLoaderContainer>
      );
    }

    if (hasError) {
      return (
        <CenterContainer>
          <Message
            withButton={true}
            message={T.screen.translator.error}
            onClick={() => getSupportedLanguages()}
          />
        </CenterContainer>
      );
    }

    if (languages.length === 0) {
      return (
        <CenterContainer>
          <Message message={T.screen.translator.empty} />;
        </CenterContainer>
      );
    }
    return <TranslatorScreen languages={languages} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        {getLayout()}
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FetchLoaderContainer = styled.div`
  width: 50%;
  align-self: center;
  display: flex;
`;

const LoaderText = styled.div``;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
