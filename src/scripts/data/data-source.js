import API_ENDPOINT from '../globals/api-endpoints';

class DataSource {
  static async restaurantList() {
    const response = await fetch(`${API_ENDPOINT.RESTAURANT_LIST}`);
    if (!response.ok) return;
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(`${API_ENDPOINT.DETAIL(id)}`);
    if (!response.ok) return;
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(review) {
    const response = await fetch(API_ENDPOINT.POST_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) return;
    const responseJson = await response.json();
    return responseJson;
  }
}

export default DataSource;
