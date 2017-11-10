import React from 'react';
import {observer, inject} from 'mobx-react';


@inject('store')
@observer
export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.weatherStore = this.props.store.weatherStore;
  }

  componentWillMount() {
    this.weatherStore.fetchCurrentWeatherByGeolocation()
    console.log('weather: ', this.weatherStore.currentWeather);
  }

  render() {
    return(
      <div className="container">
        <h1>Hello</h1>
        <h2>Is there anybody out there?</h2>
      </div>
    )
  }

}
