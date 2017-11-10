import 'axios' from axios;

const openWeatherBase = 'http://samples.openweathermap.org/data/2.5/weather';

class ApiService {
  
  getCurrentWeatherByGeolocation(latitude, longitude) {
    return axios.get(`${openWeatherBase}?lat=${latitude}&lon=${longitude}`);
  }
}

export default const apiService = new ApiService();