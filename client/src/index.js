import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from './App';
import './index.css';
import store from "./state/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="980561439678-8dkln531dm56ljkn8jcvbmslabo246ps.apps.googleusercontent.com">
    <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);