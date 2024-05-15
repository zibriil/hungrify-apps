class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <a href="#restaurants" id="skipLink" class="skip__link"
            >Skip To Content <i class="fa fa-angles-right"></i
        ></a>
        <div class="app-bar__menu">
          <button id="hamburgerButton" type="button" aria-label="Hamburger Button">
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <div class="app-bar__brand">
            <h1>Hungry App</h1>
        </div>
        <nav id="drawer" class="app-bar__navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#/favorite">Favorite</a></li>
            <li>
              <a href="https://www.linkedin.com/in/m-izrofi/" target="_blank">About Us</a>
            </li>
          </ul>
        </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
