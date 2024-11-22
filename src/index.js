import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import {Store, Persistor} from './store';

import Navigator from './routes';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

