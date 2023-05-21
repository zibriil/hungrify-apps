import DataSource from '../../data/data-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const RestaurantList = {
  async render() {
    return `
      <div class="hero">
          <picture>
            <source media="(min-width: 768px)" srcset="./images/heros/hero-image_1-large.jpg" class="hero__bg lazyload" type="image/jpeg">
            <img src="./images/heros/hero-image_1-small.jpg" class="hero__bg lazyload" alt="Hero Background">
          </picture>
          <div class="hero__content">
            <h1>Welcome to Hungrify Apps</h1>
            <p>Hungrify is a site that displays a collection of catalogs of famous restaurants in Indonesia</p>
            <button class="btn--text btn--scroll-to">Explore Now</button>
          </div>
      </div>
      <div class="content m_content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="loader"></div>
        <div id="restaurants" class="restaurants"></div>
      </div>
      `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const loader = document.querySelector('#loader');
    loader.classList.add('loader');
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const mainContent = document.querySelector('.m_content');
    btnScrollTo.addEventListener('click', () => {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    });

    const restaurants = await DataSource.restaurantList();
    restaurants.forEach(restaurant => {
      loader.classList.remove('loader');
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },
};

export default RestaurantList;
