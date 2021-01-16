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
      background-color: rgb(36, 36, 35);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(155, 155, 155, 0.5);
      border-radius: 20px;
      border: transparent;
    }
  }

  html {
    font-family: 'Montserrat', sans-serif;
    background: ${({ theme }) => theme.medBg};
    min-height: 100vh;
  }
  a {
    color: ${({ theme }) => theme.lightText};
    text-decoration: none;
  }
  h3 {
    font-weight: 100;
    font-size: 1.3rem;
  }
  input {
    font-family: "Montserrat", sans-serif;
    padding: 0.25rem;
    border: none;
    border-radius: 2px;
    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyles;
