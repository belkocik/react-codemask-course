import { APP_CONFIG } from "lib/config";
import { useTranslations } from "lib/hooks";
import React from "react";
import styled from "styled-components";

export const Footer = () => {
  const T = useTranslations();
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <CodemaskContainer>
        &copy; {year} {T.common.companyName}
      </CodemaskContainer>
      <LinkContainer>
        <Link href={APP_CONFIG.FLATICON_URL} target="_blank">
          {T.components.footer.flatIcons}
        </Link>
        <Link href={APP_CONFIG.LIBRE_TRANSLATE_URL} target="_blank">
          {T.components.footer.libreTranslate}
        </Link>
      </LinkContainer>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.foreground};
`;

const CodemaskContainer = styled.div`
  color: ${({ theme }) => theme.colors.typography};
`;

const LinkContainer = styled.div``;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.typography};
  text-decoration: underline;
  cursor: pointer;
  padding: 0 10px;
`;
