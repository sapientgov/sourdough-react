import axios from 'axios';

const openWeatherBase = 'https://api.openweathermap.org/data/2.5/weather';

const key = '2a7287058d9b4af3f07a96bec5652e03';

class ApiService {

  getCurrentWeatherByGeolocation(latitude, longitude) {
    return axios.get(`${openWeatherBase}?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${key}`);
  }

  getCurrentWeatherByString(string) {
    return axios.get(`${openWeatherBase}?q=${string}&units=imperial&APPID=${key}`);
  }
}

export const apiService = new ApiService();
