import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import allReducers from './redux/reducer/index';
import { createStore } from 'redux';
const store = createStore(
  allReducers
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
