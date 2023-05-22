import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = query => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.generateMarkup();
  };

  const constructorPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructorPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed be the user', () => {
      searchRestaurants('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('restaurant a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        'restaurant a'
      );
    });

    it('should show the found restaurants found by Favorite Restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(1);

      presenter._showFoundRestaurants([
        { id: 1, name: 'Restaurant Satu' },
        { id: 2, name: 'Restaurant Dua' },
      ]);
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });

    it('should show the name of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, name: 'Restaurant Satu' }]);
      expect(
        document.querySelectorAll('.restaurant-item__title').item(0).textContent
      ).toEqual('Restaurant Satu');

      presenter._showFoundRestaurants([
        { id: 1, name: 'Restaurant Satu' },
        { id: 2, name: 'Restaurant Dua' },
      ]);

      const restaurantNames = document.querySelectorAll(
        '.restaurant-item__title'
      );

      expect(restaurantNames.item(0).textContent).toEqual('Restaurant Satu');
      expect(restaurantNames.item(1).textContent).toEqual('Restaurant Dua');
    });

    it('should show - when the restaurant returned does not contain a name', done => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll(
            '.restaurant-item__title'
          );
          expect(restaurantNames.item(0).textContent).toEqual('-');
          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([{ id: 444 }]);

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('   ');
      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', done => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);

          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', done => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(
            0
          );

          done();
        });

      favoriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([]);

      searchRestaurants('restaurant a');
    });
  });
});
