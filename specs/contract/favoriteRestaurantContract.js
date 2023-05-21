const itActsAsFavoriteRestaurantModel = favoriteRestaurants => {
  it('Should return the restaurant that has been added', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });

    expect(await favoriteRestaurants.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurants.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurants.getRestaurant(3)).toEqual(undefined);
  });

  it('Should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurants.putRestaurant({ aProperty: 'property' });
    expect(await favoriteRestaurants.getAllRestaurant()).toEqual([]);
  });

  it('Can return all of the restaurants that have been added', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });
    expect(await favoriteRestaurants.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('Should remove favorite restaurant', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });
    favoriteRestaurants.putRestaurant({ id: 3 });

    await favoriteRestaurants.deleteRestaurant(3);
    expect(await favoriteRestaurants.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('Should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurants.putRestaurant({ id: 1 });
    favoriteRestaurants.putRestaurant({ id: 2 });
    favoriteRestaurants.putRestaurant({ id: 3 });

    await favoriteRestaurants.deleteRestaurant(4);
    expect(await favoriteRestaurants.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteRestaurants.putRestaurant({ id: 1, name: 'restaurant a' });
    favoriteRestaurants.putRestaurant({ id: 2, name: 'restaurant b' });
    favoriteRestaurants.putRestaurant({ id: 3, name: 'restaurant abc' });
    favoriteRestaurants.putRestaurant({ id: 4, name: 'ini restaurant a' });

    expect(await favoriteRestaurants.searchRestaurants('restaurant a')).toEqual(
      [
        { id: 1, name: 'restaurant a' },
        { id: 3, name: 'restaurant abc' },
        { id: 4, name: 'ini restaurant a' },
      ]
    );
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
