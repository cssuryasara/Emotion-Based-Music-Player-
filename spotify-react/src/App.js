import React from 'react';
import './App.css';
import ImageCapture from './components/imageCapture/ImageCapture';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Predict from './components/predict/Predict';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams (window.location.search).get ('code');

function App () {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path="/capture">
            <ImageCapture />

          </Route>
          <Route path="/predict">
            <Predict />

          </Route>
          <Route path="/">
            {code ? <Dashboard code={code} /> : <Login />}

          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
