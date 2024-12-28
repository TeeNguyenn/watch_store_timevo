import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/main.scss';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CartProvider>
            <Provider store={store}>
                <App />
                <ToastContainer />
            </Provider>
        </CartProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
