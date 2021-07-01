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

  .root-content {
    margin-left: ${({ theme }) => theme.metrics.sidebarWidth};
    padding-top: ${({ theme }) => theme.metrics.topNavHeight};
  }

  .react-contextmenu {
    background-color: ${({ theme }) =>
      theme.pallet.contextMenuBackgroundColour} !important;
    padding: 0px !important;
    border: none !important;
    border-radius: 0px !important;

    hr {
      border-color: ${({ theme }) =>
        theme.pallet.buttonBackgroundColour} !important;
      margin: 5px 0;
    }

    .react-contextmenu-item {
      text-align: center;
      padding: 10px 15px !important;
      cursor: pointer;
      border: none !important;

      &:hover {
        background-color: ${({ theme }) =>
          theme.pallet.buttonBackgroundColour} !important;
        border: none !important;
      }

      &:focus {
        border: none !important;
      }
    }
  }

  .btn-primary {
    background-color: ${({ theme }) => theme.pallet.buttonBackgroundColour};
    border: 0;

    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) =>
        theme.pallet.buttonBackgroundHoverColour} !important;
      border: 0 !important;
      box-shadow: none !important;
    }
  }

  .btn-default {
    border: 0;
    background-color: #333;
    color: #eee;

    &:hover,
    &:focus,
    &:active {
      background-color: #555 !important;
      color: #eee !important;
      border: 0 !important;
      box-shadow: none !important;
    }
  }
`;

export const DefaultStyle = createGlobalStyle`
  ${Default}
`;
