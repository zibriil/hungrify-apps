class FootBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer class="footer">
            <p class="copyright">Copyright &copy; 2023 - Hungrify Apps by Em</p>
        </footer>
        `;
  }
}

customElements.define('foot-bar', FootBar);
