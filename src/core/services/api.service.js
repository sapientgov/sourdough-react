import axios from 'axios';

const openWeatherBase = 'https://api.openweathermap.org/data/2.5/weather';

const key = 'cccc0acf70ee5b8988645290e99073bc';

class ApiService {

  getCurrentWeatherByGeolocation(latitude, longitude) {
    return axios.get(`${openWeatherBase}?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${key}`);
  }

  getCurrentWeatherByString(string) {
    return axios.get(`${openWeatherBase}?q=${string}&units=imperial&APPID=${key}`);
  }

  sendServiceWorkerSubscriptionData(data) {
    return axios({
      method: 'post',
      url: 'https://34.235.79.153/api/subscriptions',
      data: data
    });
  }
}

export const apiService = new ApiService();
