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
          this.conditionRes(res.data);
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

  @action conditionRes(resData) {
    this.iconCode = resData.weather[0].icon;
    this.displayTemp = parseInt(resData.main.temp);
    this.displayLocation = resData.name;
  }

  @action resetPage() {
    this.currentWeather = {};
    this.isLoading = true;
  }

  @observable currentWeather = {};
  @observable iconCode = 'xxx';
  @observable displayTemp = '--';
  @observable displayLocation = '';
  @observable isLoading = true;
}

export const weatherStore = new WeatherStore();
