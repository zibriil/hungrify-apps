import 'regenerator-runtime'; /* for async await transpile */

/* Styles */
import '../styles/app.css';

import App from './views/app';
import swRegister from './utils/swRegister';

/* Components */
import './components/app-bar.js';
import './components/foot-bar.js';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
