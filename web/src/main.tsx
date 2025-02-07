import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';
import { isEnvBrowser } from './utils/misc';
import { Provider } from 'react-redux';
import { store } from './store';

import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

const root = document.getElementById('root');
if (isEnvBrowser()) {
  root!.style.backgroundImage = 'url("https://r2.fivemanage.com/1HmlXP8c0itFbXHi4ACgz/images/20250204053252_1.jpg")';
  root!.style.backgroundSize = 'cover';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
