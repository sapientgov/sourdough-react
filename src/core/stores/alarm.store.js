import {action, observable} from 'mobx';

import {userStore} from './user.store';
import {weatherStore} from './weather.store';
import {apiService} from '../services/api.service';
import {cookieService} from '../services/cookie.service';

class AlarmStore {

  @action registerServiceWorker() {
    const publicKey = new Uint8Array([0x04,0x93,0x66,0xcb,0xf8,0x21,0xe4,0x43,0xf5,0xc3,0x2c,0x67,0xd2,0x8c,0xee,0xae,0x92,0x5f,0xc1,0xdd,0x72,0xa6,0xa0,0x5b,0xde,0xb2,0x56,0xc3,0x80,0xb8,0x12,0x71,0x63,0x68,0xf3,0xf9,0x4c,0x30,0x93,0xd1,0xc8,0xe0,0xd5,0x1f,0xcd,0x1c,0xe9,0x07,0xd2,0xae,0x95,0x68,0x78,0x7d,0x92,0x0e,0xa2,0xc3,0xe9,0x02,0x80,0xdf,0xb0,0xcd,0x6e]);
    console.log('PUBLICKEY', publicKey);
    if ('serviceWorker' in navigator) {
      // register a serviceWorker
      navigator.serviceWorker.register('js/service-worker.js')
      .then(function(registration) {
        console.log('getting service worker subscription...')

        // use pushManager to get subscription
        return registration.pushManager.getSubscription()
          .then(function(subscription) {

            if (subscription) {
              console.log('already subscribed');
              return subscription;
            }

            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKey
            })
            .then(function (subscription) {
                console.log('subscribed');
                return subscription;
            });
           })
           .then(function(subscription) {
             if (subscription === undefined) {
               document.getElementById('result').innerHTML = 'Try again';
               return;
             }

             console.log(JSON.stringify(subscription));

             // construct an HTTP request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/subscriptions', true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            // notify the user when subscribed
            xhr.onreadystatechange = function() {//Call a function when the state changes.
              if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                document.getElementById('result').innerHTML = 'Subscribed!';
              }
            }

            // send the collected data as JSON
          xhr.send(JSON.stringify(subscription));
         });
       });
    } else {
      console.log('Service workers are not supported.');
    }
}

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
    this.sendAlarmToServiceWorker();
  }

  @action sendAlarmToServiceWorker() {
    let data = {
      coord: {
        lat: weatherStore.coords.lat.toString(),
        lon: weatherStore.coords.lon.toString()
      },
      hour: this.alarmObject.selectHour,
      minute: this.alarmObject.selectMinute
    }
    console.log('DATA', data);
    const success = (res) => {
      console.log('success', res);
    }

    const fail = (res) => {
      console.log('fail', res);
    }

    return apiService.sendServiceWorkerSubscriptionData(data).then(success, fail);
  }

  @action resetAlarm() {
    this.alarmObject = Object.assign({}, this.alarmDefaults);
    this.timeIsPm = false;
  }

  @observable timeIsPm = false;
  @observable alarmDefaults = {
    selectHour: '07',
    selectMinute: '00',
    selectRecurring: false
  }
  @observable alarmObject = Object.assign({}, this.alarmDefaults);
}

export const alarmStore = new AlarmStore();
