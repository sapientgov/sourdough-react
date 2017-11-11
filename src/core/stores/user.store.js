import {action, observable} from 'mobx';

import {cookieService} from '../services/cookie.service';
import {weatherStore} from './weather.store';

class UserStore {

  @action checkUser() {
    if (document.cookie.indexOf('_brella') < 0) {
      this.setInitialCookie();
    } else {
      const cookie = cookieService.getCookie('_brella');
      console.log('cookie', cookie);
      cookie.isReturningUser
        ? this.notReturningUser()
        : this.getReturningUser();
    }
  }

  @action setInitialCookie() {
    this.isReturningUser = false;
    navigator.geolocation.getCurrentPosition((position) => {
      const initialCookie = {
        isReturningUser: false,
        geolocation: {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      }
      cookieService.setCookie('_brella', JSON.stringify(initialCookie));
    })
    this.notReturningUser();
  }

  @action notReturningUser() {
    weatherStore.fetchCurrentWeatherByGeolocation();
    this.isReturningUser = false;
  }

  @action getReturningUser() {
    this.currentUser = JSON.parse(cookieService.getCookie('_brella'));
    this.isReturningUser = this.currentUser.isReturningUser;
    weatherStore.updateUserWeather(this.currentUser);
  }

  @observable isReturningUser = false;
  @observable currentUser = {};

}

export const userStore = new UserStore();
