import { createGlobalStyle, css } from "styled-components";

export const Default = css`
  body {
    background-color: ${({ theme }) => theme.pallet.bodyBackground2};
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }

  .router-outlet {
    margin-left: ${({ theme }) => theme.metrics.sidebarWidth};
    padding-top: ${({ theme }) => theme.metrics.topNavHeight};
  }
`;

export const DefaultStyle = createGlobalStyle`
  ${Default}
`;
