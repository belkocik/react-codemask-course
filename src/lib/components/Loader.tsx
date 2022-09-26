import React from "react";
import styled from "styled-components";
import { ReactNode } from "react";

interface LoaderProps {
  children?: ReactNode;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({ children }) => {
  return (
    <LoaderContainer>
      <ActivityIndicator />
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
    </LoaderContainer>
  );
};

const ActivityIndicator = styled.div`
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  animation: loading 1s linear infinite alternate;

  @keyframes loading2 {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
`;

const ChildrenContainer = styled.div`
  text-align: center;
`;

const LoaderContainer = styled.div`
  width: 100%;
`;
