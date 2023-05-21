import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = restaurant => `
  <article class="restaurant-item" data-id="${restaurant.id}">
    <div class="restaurant-item__header">
      <p class="restaurant-item__rating">⭐<span class="rate">${
        restaurant.rating || '-'
      }</span></p>
      <img
      src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}"
      alt="${restaurant.name || '-'}"
      class="skeleton restaurant-item__thumbnail lazyload"
      />
      <span class="restaurant-item__city">${restaurant.city || '-'}</span>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant-item__title"><a href="/#/detail/${restaurant.id}">${
  restaurant.name || '-'
}</a></h3>
      <p class="restaurant-item__description">${
        restaurant.description || '-'
      }</p>
    </div>
  </article>
`;

const createRestaurantDetailTemplate = restaurant => `
  <div class="restaurant__head">
    <h2 class="restaurant-item__title">${restaurant.name || '-'}</h2>
    <div class="restaurant-img__container">
        <p class="restaurant__location"><span class="address">${
          restaurant.address || '-'
        }, Kota ${restaurant.city || '-'}</span></p>
        <img src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}" alt="${
  restaurant.name || '-'
}" class="skeleton restaurant__img lazyload" />
    </div>
  </div>
  <div class="restaurant-item__info">
    <hr/>
    <div class="restaurant__description">
      <h3>Description</h3>
      <p>${restaurant.description || '-'}</p>
    </div>
    <hr/>
    <div class="categories">
      <h3>Categories</h3>
      <ul>
        ${restaurant.categories
          .map(category => `<li>${category.name || '-'}</li>`)
          .join('')}
      </ul>
    </div>
    <hr/>
    <div class="menus">
      <div class="food__menu">
        <h3>Food Menu</h3>
        <ul>
          ${restaurant.menus.foods
            .map(food => `<li>${food.name || '-'}</li>`)
            .join('')}
        </ul>
      </div>
      <div class="drink__menu">
        <h3>Drink Menu</h3>
        <ul>
          ${restaurant.menus.drinks
            .map(drink => `<li>${drink.name || '-'}</li>`)
            .join('')}
        </ul>
    </div>
  </div>
  <hr/>
`;

const createFormCustomerReviewTemplate = () => `
<div class="customer__reviews">
    <form action="" method="post" class="post-review">
      <h3>Post Review</h3>
        <div class="form__group">
          <label for="name">Name<sup>*</sup></label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="form__group">
          <label for="review">Review</label>
          <textarea
          id="review"
          name="review"
          rows="5"
          ></textarea>
        </div>
      <button type="button" id="buttonPostReview" class="button--post__review" aria-label="Review Button">Send</button>
    </form>

    <div class="reviews">
      <h3>Customer Reviews</h3>
    </div>
  </div>
`;

const createCustomerReviewListTemplate = reviews => `
  <ul class="list__review">
    ${reviews
      .map(cr => {
        const { name, review, date } = cr;
        return `
        <li class="item__review">
          <div class="name__date">
            <h4 class="name">${name}</h4>
            <p class="date">${date}</p>
          </div>
          <p class="review">${review}</p>
        </li>
        `;
      })
      .join('')}
  </ul>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createFormCustomerReviewTemplate,
  createCustomerReviewListTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
