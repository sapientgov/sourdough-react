import {action, observable} from 'mobx';

import {apiService} from '../services/api.service';

class WeatherStore {

  @action fetchCurrentWeatherByString(string) {
    this.isLoading = true;

    const success = (res) => {
      this.currentWeather = res.data;
      console.log('weather: ', this.currentWeather);
      this.conditionRes(res.data);
      this.isLoading = false;
      return res.data;
    }

    const fail = () => {
      console.log('Search failed! Will default to geolocation');
      return this.fetchCurrentWeatherByGeolocation();
    }

    return apiService.getCurrentWeatherByString(string).then(success, fail);
  }

  @action fetchCurrentWeatherByGeolocation() {
    this.isLoading = true;
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition((position) => {
        const success = (res) => {
          this.currentWeather = res.data;
          this.conditionRes(res.data);
          this.isLoading = false;
          return res.data;
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

  @action updateUserWeather(user) {
    if (user.settings && user.settings.locationInput) {
      this.fetchCurrentWeatherByString(user.settings.locationInput);
    } else {
      this.fetchCurrentWeatherByGeolocation();
    }
  }

  @action conditionRes(resData) {
    this.iconCode = resData.weather[0].icon;
    this.displayTemp = parseInt(resData.main.temp);
    this.displayLocation = resData.name;
    this.tempHi = resData.main.temp_max;
    this.tempLo = resData.main.temp_min;
  }

  @action resetPage() {
    this.currentWeather = {};
    this.isLoading = true;
  }

  @observable currentWeather = {};
  @observable iconCode = 'xxx';
  @observable displayTemp = '--';
  @observable displayLocation = '';
  @observable tempHi = '';
  @observable tempLo = '';
  @observable isLoading = true;
}

export const weatherStore = new WeatherStore();
