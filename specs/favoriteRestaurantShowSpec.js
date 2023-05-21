import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderMarkup = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.generateMarkup();
  };

  beforeEach(() => {
    renderMarkup();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });
  });
  it('should show the information that no restaurants have been liked', done => {
    document
      .getElementById('restaurants')
      .addEventListener('restaurants:updated', () => {
        expect(
          document.querySelectorAll('.restaurant-item__not__found').length
        ).toEqual(1);
        done();
      });

    const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    favoriteRestaurants.getAllRestaurant.and.returnValues([]);

    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants,
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurant', done => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            2
          );
          done();
        });
      const favoriteRestaurants = spyOnAllFunctions(
        FavoriteRestaurantIdb,
        false
      );
      favoriteRestaurants.getAllRestaurant.and.returnValues([
        {
          id: 21,
          name: 'Restaurant 1',
          rating: 4,
          description: 'Lorem ipsum dolor sit amet',
        },
        {
          id: 23,
          name: 'Restaurant 3',
          rating: 45,
          description: 'Lorem ipsum dolor sit amet simplified',
        },
      ]);
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
