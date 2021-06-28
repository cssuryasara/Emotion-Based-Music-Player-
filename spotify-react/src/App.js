import React from 'react';
import './App.css';
import ImageCapture from './components/imageCapture/ImageCapture';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Predict from './components/predict/Predict';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
