import DrawerInitiator from '../utils/drawer-initiator';
import CONFIG from '../globals/config';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const cacheIsExists = await this.cacheCheckExistence(CONFIG.CACHE_NAME);
    this._content.innerHTML = await page.render();
    const skipLinkElement = document.querySelector('#skipLink');
    const mainContent = document.querySelector('#mainContent');
    skipLinkElement.addEventListener('click', event => {
      event.preventDefault();
      mainContent.focus();
    });

    if (window.navigator.onLine || cacheIsExists) {
      await page.afterRender();
    } else {
      mainContent.innerHTML += '<h3 class="disconnected">No internet :(</h3>';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async cacheCheckExistence(cacheName) {
    try {
      const cacheExists = await caches.has(cacheName);
      if (cacheExists) {
        console.log(`Cache "${cacheName}" exists`);
      } else {
        console.log(`Cache "${cacheName}" does not exist`);
      }
      return cacheExists;
    } catch (error) {
      console.error('Error checking cache existence:', error);
      return false;
    }
  }
}

export default App;
