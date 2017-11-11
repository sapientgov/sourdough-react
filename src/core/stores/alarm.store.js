import {action, observable} from 'mobx';

import {userStore} from './user.store';
import {cookieService} from '../services/cookie.service';

class AlarmStore {

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
