import React from "react";
import styled from "styled-components";

export const Confidence = () => {
  return (
    <Container>
      <Percentage>65%</Percentage>
      <Language>(Polish)</Language>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;
const Percentage = styled.span``;
const Language = styled.a`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;
