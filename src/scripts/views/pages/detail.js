import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';
import {
  createRestaurantDetailTemplate,
  createFormCustomerReviewTemplate,
  createCustomerReviewListTemplate,
} from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DataSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    restaurantContainer.innerHTML += createFormCustomerReviewTemplate();
    restaurantContainer.innerHTML += createCustomerReviewListTemplate(
      restaurant.customerReviews
    );

    const listReview = document.querySelector('.list__review');
    const reviewerName = document.querySelector('#name');
    const message = document.querySelector('#review');
    const buttonReview = document.querySelector('#buttonPostReview');
    buttonReview.addEventListener('click', async () => {
      const reviews = await DataSource.addReview({
        id: url.id,
        name: reviewerName.value,
        review: message.value,
      });
      if (!reviews) return;
      listReview.innerHTML = createCustomerReviewListTemplate(
        reviews.customerReviews
      );
      reviewerName.value = '';
      message.value = '';
    });

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });
  },
};

export default Detail;
