import React from 'react';
import ImageCapture from './components/imageCapture/ImageCapture';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Predict from './components/predict/Predict';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/login/Login';
import Navbarr from './components/navbar/Navbarr';
import {useSelector} from 'react-redux';
import {selectaccessToken, selectplayingSong, selectUser} from './features/appSlice';
import Home from './components/home/Home';
import Player from './components/player/Player';

const code = new URLSearchParams (window.location.search).get ('code');

function App () {
  const user = useSelector (selectUser);
  const accessToken=useSelector(selectaccessToken)
  const playingSong=useSelector(selectplayingSong)

  return (
    <Router>
      {user ? <Navbarr /> : null}

      <div className="App">
        <Switch>

          <Route path="/capture">
            <ImageCapture />

          </Route>
          <Route path="/predict">
            <Predict />

          </Route>
        
          <Route path="/">
            {code ? <Home code={code} />: <Login />}

          </Route>
        </Switch>
      </div>
      <div className="songplayer">
        <Player accessToken={accessToken} trackUri={playingSong?.uri} />
      </div>
    </Router>
  );
}
export default App;
