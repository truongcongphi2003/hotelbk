import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import '../public/css/tailwind.css';
import store from '@/redux/store';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
