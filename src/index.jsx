import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {history} from './core/services/history.service';
import {AppContainer, module, render} from 'react-hot-loader';
import {Provider, observer} from 'mobx-react';
import {masterStore} from './core/stores/master.store.js';

import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import SettingsPage from './pages/settings-page';
import ConfigureAlarmPage from './pages/configure-alarm-page';

import '../styles/app.scss';

@observer class App extends React.Component {

  render() {
    return (
			<Router history={history}>
				<Provider store={masterStore}>
          <main id="main-content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/alarm" component={ConfigureAlarmPage} />
              <Route exact path="/error/404" component={ErrorPage} />
              <Route path="*" render={() => (
								<Redirect to="/error/404" />
							)} />
            </Switch>
          </main>
				</Provider>
			</Router>
    )
  }
}




ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

// Hot Module Replacement API
if (module && module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  });
}
