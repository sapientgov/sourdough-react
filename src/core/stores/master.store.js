import {userStore} from './user.store';
import {weatherStore} from './weather.store';
import {settingsStore} from './settings.store';

class MasterStore {

  constructor() {
    this.weatherStore = weatherStore;
    this.userStore = userStore;
    this.settingsStore = settingsStore;
  }

}
export const masterStore = new MasterStore();
