import {action, observable} from 'mobx';

import {userStore} from './user.store';
import {cookieService} from '../services/cookie.service';
// import {apiService} from '../services/api.service';

class AlarmStore {

  @action populateFields(cookie) {
    if (cookie.alarm) {
      this.alarmObject = cookie.alarm;
      this.timeIsPm = cookie.alarm.timeIsPm;
    }
  }

  @action toggleAmPm() {
    this.timeIsPm = !this.timeIsPm;
  }

  @action saveAlarm() {
    let cookie = JSON.parse(cookieService.getCookie('_brella'));
    cookie.alarm = this.alarmObject;
    cookie.alarm.timeIsPm = this.timeIsPm;
    cookie.isReturningUser = true;
    userStore.isReturningUser = true;
    cookieService.setCookie('_brella', JSON.stringify(cookie));
  }

  @action resetAlarm() {
    this.alarmObject = Object.assign({}, this.alarmDefaults);
    this.timeIsPm = false;
  }

  @observable timeIsPm = false;
  @observable alarmDefaults = {
    selectHour: '07',
    selectMinute: '00',
    selectRecurring: false,
    coord: {}
  }
  @observable alarmObject = Object.assign({}, this.alarmDefaults);
}

export const alarmStore = new AlarmStore();
