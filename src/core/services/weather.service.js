import apiService from './api.service';

class WeatherService {
  
  findGeolocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(this.fetchWeather);
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }
  
  fetchGeolocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('position', latitude, longitude);
    
    return apiService.getCurrentWeatherByGeolocation(latitude, longitude);
  }
}

export default weatherService = new WeatherService();