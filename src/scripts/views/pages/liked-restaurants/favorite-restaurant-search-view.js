/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  generateMarkup() {
    return `
        <div class="content">
            <div class="favorite__search">
                <h2 class="content__heading">Your Liked Restaurant</h2>
                <div class="inline__search">
                    <input id="query" type="text" placeholder="Search restaurants...">
                </div>
            </div>
            <div id="restaurants" class="restaurants"></div>
        </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', e => {
      callback(e.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (acc, restaurant) =>
          acc.concat(createRestaurantItemTemplate(restaurant)),
        ''
      );
    } else html = this._getEmptyRestaurantTemplate();

    document.getElementById('restaurants').innerHTML = html;
    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">No restaurant to display</div>';
  }
}

export default FavoriteRestaurantSearchView;
