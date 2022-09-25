import React from "react";
import styled from "styled-components";

export const TextCounter = () => {
  return <Counter>0/5000</Counter>;
};

const Counter = styled.div`
  color: ${({ theme }) => theme.colors.typography};
`;
