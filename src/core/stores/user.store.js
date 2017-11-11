import {action, observable} from 'mobx';

import {cookieService} from '../services/cookie.service';
import {weatherStore} from './weather.store';

class UserStore {

  @action checkUser() {
    if (document.cookie.indexOf('_brella') < 0) {
      this.setInitialCookie();
    } else {
      this.getReturnUser();
    }
  }

  @action setInitialCookie() {
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
  }

  @action getReturnUser() {
    this.currentUser = JSON.parse(cookieService.getCookie('_brella'));
    console.log('this.currentUser', this.currentUser);
    this.isReturningUser = this.currentUser.isReturningUser;
    // const searchString = this.currentUser.settings.locationInput || '';
    // weatherStore.fetchCurrentWeatherByString('')
    // .then(res => {
    //   console.log('res', res);
    //   this.currentUser.geolocation = {
    //     lat: res.coord.lat,
    //     lon: res.coord.lon
    //   }
    //   cookieService.setCookie('_brella', JSON.stringify(this.currentUser));
    // });
  }

  @observable isReturningUser = false;
  @observable currentUser = {};

}

export const userStore = new UserStore();
