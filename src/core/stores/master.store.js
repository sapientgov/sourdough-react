import {userStore} from './user.store';
import {weatherStore} from './weather.store';
import {settingsStore} from './settings.store';
import {alarmStore} from './alarm.store';

class MasterStore {

  constructor() {
    this.weatherStore = weatherStore;
    this.userStore = userStore;
    this.settingsStore = settingsStore;
    this.alarmStore = alarmStore;
  }

}
export const masterStore = new MasterStore();
