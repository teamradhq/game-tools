import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom';
import App from '@src/App.tsx';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

export const RouterProvider = (): React.JSX.Element => <Provider router={router} />;
