import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

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
    // if (this.userStore.currentUser.settings.locationInput) {
    //   this.weatherStore.fetchCurrentWeatherByString(this.userStore.currentUser.settings.locationInput);
    // } else {
    //   this.weatherStore.fetchCurrentWeatherByGeolocation();
    // }
  }

  componentWillUnmount() {
    this.weatherStore.resetPage();
  }

  renderIsLoading = () => {
    return (
      <h1 className="loadingMsg">Loading Home Page...</h1>
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
      <div className="returningVisitorCard">
        <div className="avatar" aria-hidden="true"></div>
        <div className="bottomCard">
          <div className="clothingMsg">Sleeves</div>
          <h1>{this.weatherStore.displayTemp}<span className="degIcon">&deg;</span></h1>
          <h2>{this.weatherStore.displayLocation}</h2>
          <div className="hiLow">H {this.weatherStore.tempHi}&deg; &nbsp; L {this.weatherStore.tempLo}&deg;</div>
        </div>
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
