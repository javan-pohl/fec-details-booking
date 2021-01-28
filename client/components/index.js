import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { HashRouter, Route, Switch} from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('main'));

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/homes/:id" component={App}/>
    </Switch>
  </HashRouter>
  , document.getElementById('Javan'));
