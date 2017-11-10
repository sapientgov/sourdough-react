import {action, observable} from 'mobx';

import {apiService} from '../services/api.service';

class WeatherStore {

  @action fetchCurrentWeatherByGeolocation() {

    this.isLoading = true;

    if (navigator.geolocation) {
      console.log('ding!');
      return navigator.geolocation.getCurrentPosition((position) => {
        const success = (res) => {
          console.log('res', res.data);
          this.currentWeather = res.data;
          this.iconCode = res.data.weather[0].icon;
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
    this.isLoading = false;
  }

  @observable currentWeather = {};
  @observable iconCode = 'xxx';
  @observable isLoading = false;
}

export const weatherStore = new WeatherStore();
