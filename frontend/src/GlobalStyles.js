import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(155, 155, 155, 0.5);
      border-radius: 20px;
      border: transparent;
    }
  }
  html {
    background: rgb(238, 245, 255);
    font-family: 'Montserrat', sans-serif;
  }

  a {
    color: white;
    text-decoration: none;
  }
  h3 {
    font-weight: 100;
    font-size: 1.3rem;
  }
`;

// LIGHTGREEN
// background-color: rgb(207, 219, 213);
// color: rgb(207, 219, 213);

// Tan
// background-color: rgb(232, 237, 223);
// color: rgb(232, 237, 223);

// YELLOW
// background-color: rgb(245, 203, 92);
// color: rgb(245, 203, 92);

// DARKGREY
// background-color: rgb(51, 53, 51);
// color: rgb(36, 36, 35);

// BLACK
// background-color: rgb(36, 36, 35);
// color: rgb(51, 53, 51);

export default GlobalStyles;
