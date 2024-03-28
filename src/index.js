import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import reportWebVitals from './reportWebVitals';
import App from './Component/App';
import { Provider } from 'react-redux';
import store from './Store/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>

  </>
);
// puri application ko store ke andar wrap kr diya jisse uske sare feature use kr sake..

reportWebVitals();
