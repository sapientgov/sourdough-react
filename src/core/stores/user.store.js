import {action, observable} from 'mobx';

import {cookieService} from '../services/cookie.service';

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
    this.isReturningUser = this.currentUser.isReturningUser;
    console.log('currentUser', this.currentUser);
  }

  @observable isReturningUser = false;
  @observable currentUser = {};

}

export const userStore = new UserStore();
