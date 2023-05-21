const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('No restaurant to display', '.restaurant-item__not__found');
});

Scenario('liking and unliking restaurant', async ({ I }) => {
  I.see('No restaurant to display', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__title a', 10);
  I.seeElement('.restaurant-item__title a');

  const firstRestaurant = locate('.restaurant-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.restaurant-item');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('No restaurant to display', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__title a', 10);
  I.seeElement('.restaurant-item__title a');

  const titles = [];

  for (let i = 1; i < 3; i += 1) {
    I.click(locate('.restaurant-item__title a').at(i));
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant-item__title'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');

  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter(
    title => title.indexOf(searchQuery) !== -1
  );

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant-item__title').at(index + 1)
    );
    assert.strictEqual(title, visibleTitle);
  });
});
