class FootBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer class="footer">
            <p class="copyright">Copyright &copy; 2023 - Hungry App | All rights reserved.</p>
        </footer>
        `;
  }
}

customElements.define('foot-bar', FootBar);
