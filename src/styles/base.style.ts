import { createGlobalStyle } from 'styled-components';

const BaseStyle = createGlobalStyle`
  html,
  body {
    margin: 0px;
    padding: 0px;
    min-height: 100%;
    height: 100%;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.5em;
    line-height: 1.6;
    font-weight: 400;
    font-family: sans-serif;
    color: darkslategrey;
    background: gainsboro;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 300;
  }
  h1 {
    font-size: 4rem;
    line-height: 1.2;
    letter-spacing: -0.1rem;
  }
  h2 {
    font-size: 3.6rem;
    line-height: 1.25;
    letter-spacing: -0.1rem;
  }
  h3 {
    font-size: 3rem;
    line-height: 1.3;
    letter-spacing: -0.1rem;
  }
  h4 {
    font-size: 2.4rem;
    line-height: 1.35;
    letter-spacing: -0.08rem;
  }
  h5 {
    font-size: 1.8rem;
    line-height: 1.5;
    letter-spacing: -0.05rem;
  }
  h6 {
    font-size: 1.5rem;
    line-height: 1.6;
    letter-spacing: 0;
  }
  @media (min-width: 550px) {
    h1 {
      font-size: 5rem;
    }
    h2 {
      font-size: 4.2rem;
    }
    h3 {
      font-size: 3.6rem;
    }
    h4 {
      font-size: 3rem;
    }
    h5 {
      font-size: 2.4rem;
    }
    h6 {
      font-size: 1.5rem;
    }
  }
  p {
    margin-top: 0;
  }
  a {
    color: lightseagreen;
    transition: transform 100ms ease-out;
    display: inline-block;
    text-decoration: none;
  }
  a:hover {
    //transform: scale(1.05);
    text-decoration: underline;
  }
  hr {
    margin-top: 3rem;
    margin-bottom: 3.5rem;
    border-width: 0;
    border-top: 1px solid #e1e1e1;
  }
  .u-full-width {
    width: 100%;
    box-sizing: border-box;
  }
  .u-max-full-width {
    max-width: 100%;
    box-sizing: border-box;
  }
  .u-pull-right {
    float: right;
  }
  .u-pull-left {
    float: left;
  }
`;

export default BaseStyle;
