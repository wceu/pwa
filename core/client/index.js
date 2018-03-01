/* eslint-disable global-require, no-underscore-dangle */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { hydrate } from 'react-emotion';
import { addPackage } from 'worona-deps';
import App from '../components/App';
import { importPromises } from '../components/Universal';
import initStore from '../store';
import * as buildModule from '../packages/build';
import * as settingsModule from '../packages/settings';
import * as analyticsModule from '../packages/analytics';

// Define core modules.
const coreModules = [
  { name: 'build', namespace: 'build', module: buildModule },
  { name: 'settings', namespace: 'settings', module: settingsModule },
  { name: 'analytics', namespace: 'analytics', module: analyticsModule },
];

// Get activated packages.
const packages = Object.values(window['wp-pwa'].initialState.build.packages);

let store = null;
const stores = {};

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component
        store={store}
        core={coreModules.map(({ name, module }) => ({
          name,
          Component: module.default,
        }))}
        packages={packages}
        stores={stores}
      />
    </AppContainer>,
    document.getElementById('root'),
  );
};

const init = async () => {
  // Adds server generated styles to emotion cache.
  hydrate(window['wp-pwa'].emotionIds);

  // Wait for activated packages.
  const pkgEntries = Object.entries(window['wp-pwa'].initialState.build.packages);
  const pkgPromises = pkgEntries.map(([namespace, name]) => importPromises({ name, namespace }));
  const pkgModules = await Promise.all(pkgPromises);

  // Load reducers and sagas.
  const reducers = {};
  const clientSagas = {};

  const mapModules = pkg => {
    if (pkg.module.Store) pkg.module.store = pkg.module.Store.create({});
    if (pkg.module.store) stores[pkg.namespace] = pkg.module.store;
    if (pkg.module.reducers) reducers[pkg.namespace] = pkg.module.reducers(pkg.module.store);
    if (pkg.module.clientSagas) clientSagas[pkg.name] = pkg.module.clientSagas;

    addPackage({ namespace: pkg.namespace, module: pkg.module });
  };

  coreModules.forEach(mapModules);
  pkgModules.forEach(mapModules);

  // Init store.
  store = initStore({
    reducer: combineReducers(reducers),
    initialState: window['wp-pwa'].initialState,
  });

  // Start all the client sagas.
  store.dispatch(buildModule.actions.clientStarted());
  const params = { stores };
  if (clientSagas) Object.values(clientSagas).forEach(saga => store.runSaga(saga, params));
  store.dispatch(buildModule.actions.clientSagasInitialized());

  // Start App.
  render(App);

  // Inform that the client has been rendered.
  store.dispatch(buildModule.actions.clientRendered());
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../components/App.js', () => {
    const Component = require('../components/App').default;
    render(Component);
  });
  module.hot.accept('../components/Universal.js', () => {
    const Component = require('../components/App').default;
    render(Component);
  });
}

init();
