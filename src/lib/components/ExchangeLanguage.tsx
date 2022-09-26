import { Images } from "assets";
import React from "react";
import styled from "styled-components";

type ExchangeLanguageProps = {
  onClick(): void;
  hidden: boolean;
};

export const ExchangeLanguage: React.FunctionComponent<
  ExchangeLanguageProps
> = ({ onClick, hidden }) => {
  return (
    <ExchangeContainer>
      {!hidden && <Exchange src={Images.Exchange} onClick={onClick} />}
    </ExchangeContainer>
  );
};

const Exchange = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
`;

const ExchangeContainer = styled.div`
  width: 22px;
  height: 22px;
`;
