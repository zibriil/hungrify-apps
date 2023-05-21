/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
// import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    // return `
    //     <div class="content">
    //         <h1 class="content__heading">Your Favorited Restaurant</h1>
    //         <div id="restaurants" class="restaurants"></div>
    //     </div>
    //     `;
    return view.generateMarkup();
  },

  async afterRender() {
    // const restaurantsContainer = document.querySelector('#restaurants');
    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();

    // if (restaurants.length === 0) {
    //   const linkBackToHome = document.createElement('a');
    //   linkBackToHome.setAttribute('href', '/');
    //   linkBackToHome.classList.add('link__back');
    //   linkBackToHome.innerHTML = 'Back to the Future ➡️';

    //   restaurantsContainer.style.gridTemplateColumns = '1fr';
    //   restaurantsContainer.innerHTML +=
    //     '<h3 class="show__message">No restaurant to like yet</h3>';

    //   restaurantsContainer.append(linkBackToHome);
    // } else {
    //   restaurants.forEach(restaurant => {
    //     console.log(restaurant);
    //     restaurantsContainer.innerHTML +=
    //       createRestaurantItemTemplate(restaurant);
    //   });
    // }

    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
  },
};

export default Favorite;
