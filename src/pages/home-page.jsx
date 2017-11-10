import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

@inject('store')
@observer
export default class HomePage extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.weatherStore = this.props.store.weatherStore;
  }

  componentWillMount() {
    this.weatherStore.fetchCurrentWeatherByGeolocation()
    console.log('weather: ', this.weatherStore.currentWeather);
  }

  componentWillUnmount() {
    this.weatherStore.resetPage();
  }

  renderIsLoading = () => {
    return (
      <h1>Loading...</h1>
    )
  }

  renderMainElements = () => {
    return (
      <div className="main-elements">
        <h1>{this.weatherStore.currentWeather.main.temp}</h1>
        <h2>{this.weatherStore.currentWeather.name}</h2>
        <div><Link to="/settings">Settings</Link></div>
        <div><Link to="/alarm">Alarm</Link></div>
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
