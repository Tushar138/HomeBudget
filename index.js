/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider, useDispatch} from 'react-redux';
import store from './src/redux/store';
import { useEffect } from 'react';
import { fetchInitialBudgetEntries } from './src/redux/action';

const AppRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => AppRedux);
