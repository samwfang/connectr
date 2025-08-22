import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  fontWeights: {
    normal: 200,
    medium: 300,
    bold: 400,
  }, components: {
    Button: {
      variants: {
        minimalist: {
          bg: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          fontWeight: '300',
          textTransform: 'lowercase',
          letterSpacing: '0.5px',
          borderRadius: 'full',
          px: 8,
          py: 6,
          _hover: {
            bg: 'rgba(0, 0, 0, 0.9)',
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s ease',
        },
        minimalistOutline: {
          bg: 'transparent',
          color: 'black',
          border: '1px',
          borderColor: 'rgba(0, 0, 0, 0.3)',
          fontWeight: '300',
          textTransform: 'lowercase',
          letterSpacing: '0.5px',
          borderRadius: 'full',
          px: 8,
          py: 6,
          _hover: {
            bg: 'rgba(0, 0, 0, 0.05)',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
