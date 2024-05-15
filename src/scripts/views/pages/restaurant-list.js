import DataSource from '../../data/data-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const RestaurantList = {
  async render() {
    return `
      <div class="hero">
          <picture>
            <source media="(min-width: 768px)" data-srcset="./images/heros/hero-image_1-large.webp" class="hero__bg lazyload">
            <source media="(min-width: 320px)" data-srcset="./images/heros/hero-image_1-small.webp" class="hero__bg lazyload">
            <img data-src="./images/heros/hero-image_1.jpg" class="hero__bg lazyload" alt="Hero Background">
          </picture>
          <div class="hero__sec">
            <div class="hero__content">
              <h1>Welcome to Hungry App</h1>
              <p>This is my final project submission from the Dicoding Indonesia class "Menjadi Front-End Web Developer Expert" using JavaScript native. This project submission covers web vitals, unit testing, best practice and more.</p>
              <button class="btn--text btn--scroll-to">Explore Now</button>
            </div>
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
