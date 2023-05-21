import DrawerInitiator from '../utils/drawer-initiator';
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
    this._content.innerHTML = await page.render();
    const skipLinkElement = document.querySelector('#skipLink');
    const mainContent = document.querySelector('#mainContent');
    skipLinkElement.addEventListener('click', event => {
      event.preventDefault();
      mainContent.focus();
    });

    if (window.navigator.onLine) {
      await page.afterRender();
    } else {
      mainContent.innerHTML += '<h3 class="disconnected">No internet :(</h3>';
    }
  }
}

export default App;
