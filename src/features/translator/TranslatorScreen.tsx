import styled from "styled-components";
import React from "react";

export const TranslatorScreen: React.FunctionComponent = () => {
  return <Container>Hello world!</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${({ theme }) => theme.colors.typography};
`;
