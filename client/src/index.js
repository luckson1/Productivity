import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import Store from './redux/Store';

import App from './App';
import { ContextProvider } from './context/ContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
     <ContextProvider>
    <App />
    </ContextProvider>
  </Provider>
);



