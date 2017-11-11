import {action, observable} from 'mobx';

import {userStore} from './user.store';
import {cookieService} from '../services/cookie.service';

class SettingsStore {

  @action populateFormFields(settingsObject) {
    this.settingsObject = settingsObject;
    console.log('populateFormFields settingsObject', settingsObject, this.settingsObject);
  }

  @action saveSettings() {
    let cookie = JSON.parse(cookieService.getCookie('_brella'));
    cookie.settings = this.settingsObject;
    cookie.isReturningUser = true;
    userStore.isReturningUser = true;
    cookieService.setCookie('_brella', JSON.stringify(cookie));
  }

  @action resetSettings() {
    this.settingsObject = Object.assign({}, this.settingsDefaults);
  }

  @observable settingsDefaults = {
    locationInput: ''
  }

  @observable settingsObject = Object.assign({}, this.settingsDefaults);
}

export const settingsStore = new SettingsStore();
