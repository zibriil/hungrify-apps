class FavoriteRestaurantSearchPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching(latestQuery => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    const foundRestaurants =
      this.latestQuery.length > 0
        ? await this._favoriteRestaurants.searchRestaurants(this.latestQuery)
        : await this._favoriteRestaurants.getAllRestaurant();

    foundRestaurants ? this._showFoundRestaurants(foundRestaurants) : '';
  }

  _showFoundRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
