import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import {cookieService} from '../core/services/cookie.service';
import TextInput from '../components/text-input/text-input';

@inject('store')
@observer
export default class SettingsPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.userStore = this.props.store.userStore;
    this.settingsStore = this.props.store.settingsStore;
  }

  componentWillMount() {
    this.userStore.checkUser();
    if (this.userStore.isReturningUser) {
      const cookie = JSON.parse(cookieService.getCookie('_brella'));
      this.settingsStore.populateFields(cookie.settings);
    }
  }

  componentWillUnmount() {
    this.settingsStore.resetSettings();
  }

  handleOnChange = (newValue, id) => {
    this.settingsStore.settingsObject[id] = newValue;
  }

  saveSettings = () => {
    this.settingsStore.saveSettings();
  }

  renderLocationInput = () => {
    return (
      <div className="location-input-wrapper">
        <label htmlFor="locationInput">
          <h2>
            Location
          </h2>
        </label>
        <TextInput
          id="locationInput"
          placeholder="Leave blank to use current location"
          value={this.settingsStore.settingsObject.locationInput}
          handleOnChange={this.handleOnChange} />
      </div>
    )
  }


  render() {
    return(
      <div className="container">
        <h1>Settings</h1>
        {this.renderLocationInput()}
        <h2>Avatar</h2>
        <h2>Sliders</h2>
        <div><Link to="/">Home</Link></div>
        <div><Link to="/" onClick={this.saveSettings}>Done</Link></div>
      </div>
    )
  }

}
