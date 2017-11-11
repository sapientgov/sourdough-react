import {action, observable} from 'mobx';

import {apiService} from '../services/api.service';

class WeatherStore {

  @action fetchCurrentWeatherByString(string) {
    this.isLoading = true;

    const success = (res) => {
      this.currentWeather = res.data;
      console.log('weather: ', this.currentWeather);
      this.isLoading = false;
    }

    const fail = (res) => {
      console.log('FAIL!!', res);
    }

    return apiService.getCurrentWeatherByString(string).then(success, fail);
  }

  @action fetchCurrentWeatherByGeolocation() {
    this.isLoading = true;
    if (navigator.geolocation) {
      console.log('ding!');
      return navigator.geolocation.getCurrentPosition((position) => {
        const success = (res) => {
          this.currentWeather = res.data;
          console.log('weather: ', this.currentWeather);
          this.isLoading = false;
        }

        const fail = (res) => {
          console.log('FAIL!!', res);
        }

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        return apiService.getCurrentWeatherByGeolocation(latitude, longitude).then(success, fail);
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }


  @action resetPage() {
    this.currentWeather = {};
    this.isLoading = true;
  }

  @observable currentWeather = {};
  @observable isLoading = true;
}

export const weatherStore = new WeatherStore();
