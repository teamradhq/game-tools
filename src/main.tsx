import './styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

import { RouterProvider } from './router';
import { store } from './store';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <RouterProvider />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
