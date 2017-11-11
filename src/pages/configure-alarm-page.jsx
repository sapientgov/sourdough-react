import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import {cookieService} from '../core/services/cookie.service';

import SelectInput from '../components/select-input/select-input';

@inject('store')
@observer
export default class ConfigureAlarmPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.userStore = this.props.store.userStore;
    this.alarmStore = this.props.store.alarmStore;
  }

  componentWillMount() {
    this.userStore.checkUser();
    if (this.userStore.isReturningUser) {
      const cookie = JSON.parse(cookieService.getCookie('_brella'));
      this.alarmStore.populateFields(cookie);
    }
  }

  componentWillUnmount() {
    this.alarmStore.resetAlarm();
  }

  handleOnChange = (newValue, id) => {
    this.alarmStore.alarmObject[id] = newValue;
  }

  renderTimeSettings = () => {

    const hourOptions = [
      {title: '01'},
      {title: '02'},
      {title: '03'},
      {title: '04'},
      {title: '05'},
      {title: '06'},
      {title: '07'},
      {title: '08'},
      {title: '09'},
      {title: '10'},
      {title: '11'},
      {title: '12'}
    ]

    const minuteOptions = [
      {title: '00'},
      {title: '10'},
      {title: '20'},
      {title: '30'},
      {title: '40'},
      {title: '50'}
    ]

    return (
      <div className="time-settings-wrapper">
        <label htmlFor="selectHour">
          Hour
        </label>
        <SelectInput
          id="selectHour"
          value={this.alarmStore.alarmObject.selectHour}
          placeholder={this.alarmStore.alarmObject.selectHour}
          handleOnChange={this.handleOnChange}
          optionsList={hourOptions} />
        <label htmlFor="selectMinute">
          Minute
        </label>
        <SelectInput
          id="selectMinute"
          value={this.alarmStore.alarmObject.selectMinute}
          placeholder={this.alarmStore.alarmObject.selectMinute}
          handleOnChange={this.handleOnChange}
          optionsList={minuteOptions} />
      </div>
    )
  }

  handleAmPmOnChange = (e) => {
    this.alarmStore.toggleAmPm();
  }

  renderAmPm = () => {
    return (
      <div className="am-pm-wrapper">
        <fieldset className="form-group">
          <label htmlFor="time-am">
            <input
              type="radio"
              id="time-am"
              value="timeIsAm"
              onChange={this.handleAmPmOnChange}
              checked={!this.alarmStore.timeIsPm}/>
              AM
          </label>
          <label htmlFor="time-pm">
            <input
              type="radio"
              id="time-pm"
              value="timeIspm"
              onChange={this.handleAmPmOnChange}
              checked={this.alarmStore.timeIsPm}/>
              PM
          </label>
        </fieldset>
      </div>
    )
  }

  saveAlarm = () => {
    this.alarmStore.saveAlarm();
  }

  render() {
    return(
      <div className="container">
        <h1>Alarm</h1>
        <h2>Time</h2>
          {this.renderTimeSettings()}
          {this.renderAmPm()}
        <div><Link to="/">Home</Link></div>
        <div><Link to="/" onClick={this.saveAlarm}>Done</Link></div>
      </div>
    )
  }

}
