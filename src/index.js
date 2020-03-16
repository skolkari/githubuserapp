import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Notfound from './components/NotFound/NotFound';
import './index.css';

import * as serviceWorker from './serviceWorker';

import UserReducer from './reducers'

const store = createStore(UserReducer)

ReactDOM.render(<Provider store={store}>
  <Router>
    <div>
      <Switch>
        <Route path="/" component={App} />        
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
