import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { getLibrary } from './config/web3';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App/>
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>
);