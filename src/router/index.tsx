import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom';
import React from 'react';
import { HomePage } from '@src/router/HomePage.tsx';
import { TimerPage } from '@src/router/TimerPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/game-timer',
    element: <TimerPage />,
  },
]);

export const RouterProvider = (): React.JSX.Element => <Provider router={router} />;
