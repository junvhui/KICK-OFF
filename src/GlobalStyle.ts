import { createGlobalStyle } from 'styled-components';
import SUITE from './Assets/font/SUITE-Regular.woff2';
import ESAM from './Assets/font/esamanruM.woff2';

const GlobalStyle = createGlobalStyle`    
     @font-face {
        font-family: "SUITE";
        src: local("SUITE"), url(${SUITE}) format('woff2'); 
        font-weight: 900;
    }

    @font-face {
        font-family: "ESAM";
        src: local("ESAM"), url(${ESAM}) format('woff2'); 
        font-weight: 900;
    }


    body{
    background-color: #2f2f2f;
    height: 140rem;
  }

`;

export default GlobalStyle;
