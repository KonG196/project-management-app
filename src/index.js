import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // Імпортуємо Store Redux
import './styles/global.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Імпортуємо тему Material-UI

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Обгортаємо додаток Redux Provider */}
      <ThemeProvider theme={theme}> {/* Додаємо ThemeProvider */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
