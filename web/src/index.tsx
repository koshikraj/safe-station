import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './routes/home/Home';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import PluginList from './routes/plugins/PluginList';
import { RelayPlugin } from './routes/samples/relay/RelayPlugin';
import { NotificationsProvider } from '@mantine/notifications';
import App from './App';

const router = createHashRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "/plugins",
    element: <PluginList />,
  },
  {
    path: "/relay/:pluginAddress",
    element: <RelayPlugin />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
