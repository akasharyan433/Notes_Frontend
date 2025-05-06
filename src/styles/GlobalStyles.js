import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-primary: #1E2124;
    --bg-secondary: #2B2F33;
    --bg-tertiary: #36393F;
    --accent: #FFD700;
    --text-primary: #FFFFFF;
    --text-secondary: #B9BBBE;
    --danger: #ED4245;
    --success: #57F287;
    --border-radius: 8px;
    --transition: all 0.3s ease;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    /* Responsive breakpoints */
    --breakpoint-sm: 480px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
  }
  
  body.light-mode {
    --bg-primary: #F5F5F5;
    --bg-secondary: #FFFFFF;
    --bg-tertiary: #EAEAEA;
    --text-primary: #333333;
    --text-secondary: #666666;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  a {
    color: var(--accent);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      filter: brightness(0.85);
    }
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: var(--border-radius);
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    transition: var(--transition);
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      filter: brightness(0.95);
    }
    
    @media (max-width: 480px) {
      padding: 8px 14px;
      font-size: 13px;
    }
  }

  input, textarea {
    font-family: inherit;
    width: 100%;
    padding: 12px 16px;
    border-radius: var(--border-radius);
    border: 1px solid var(--bg-tertiary);
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    font-size: 14px;
    outline: none;
    transition: var(--transition);
    
    &:focus {
      border-color: var(--accent);
    }
    
    &::placeholder {
      color: var(--text-secondary);
    }
    
    @media (max-width: 480px) {
      padding: 10px 14px;
      font-size: 13px;
    }
  }
  
  /* Responsive image handling */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Utilities for responsive layouts */
  .hide-on-mobile {
    @media (max-width: 768px) {
      display: none !important;
    }
  }
  
  .show-on-mobile {
    display: none !important;
    
    @media (max-width: 768px) {
      display: block !important;
    }
  }
`;

export default GlobalStyles;