import { Images } from "assets";
import React from "react";
import styled from "styled-components";

export const ExchangeLanguage = () => {
  return <Exchange src={Images.Exchange} />;
};

const Exchange = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
`;
