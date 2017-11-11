import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import WeatherIconBlock from '../components/weather-icon-block/weather-icon-block';

@inject('store')
@observer
export default class HomePage extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.userStore = this.props.store.userStore;
    this.weatherStore = this.props.store.weatherStore;
  }

  componentWillMount() {
    this.userStore.checkUser();
  }

  componentDidMount() {
    if (this.userStore.currentUser.settings.locationInput) {
      this.weatherStore.fetchCurrentWeatherByString(this.userStore.currentUser.settings.locationInput);
    } else {
      this.weatherStore.fetchCurrentWeatherByGeolocation()
    }
  }

  componentWillUnmount() {
    this.weatherStore.resetPage();
  }

  renderIsLoading = () => {
    return (
      <h1>Loading Home Page...</h1>
    )
  }

  renderWelcomeMsg = () => {
    let today = new Date();
    let curHr = today.getHours();
    let msg = 'Good Evening!';

    if (curHr < 12) {
      msg = 'Good Morning!';
    } else if (curHr < 18) {
      msg = 'Good Afternoon!';
    }
    return (<div className="welcomeMsg">{msg}</div>);
  }

  renderMainElements = () => {
    return (
      <div className="welcomeCard">
        {this.renderWelcomeMsg()}
        <WeatherIconBlock
          temp={this.weatherStore.displayTemp}
          location={this.weatherStore.displayLocation} />
        <div><Link to="/settings" className="bottomLink">Get Started</Link></div>
      </div>
    )
  }

  render() {
    return(
      <div className="container">
        {
          this.weatherStore.isLoading
           ? this.renderIsLoading()
           : this.renderMainElements()
        }
      </div>
    )
  }
}
