import {weatherStore} from './weather.store';

class MasterStore {

  constructor() {
    this.weatherStore = weatherStore;
  }

}
export const masterStore = new MasterStore();
