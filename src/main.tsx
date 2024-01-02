import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

import './index.css';
import { store } from './store';
import App from './App.tsx';
import { theme } from '@src/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
