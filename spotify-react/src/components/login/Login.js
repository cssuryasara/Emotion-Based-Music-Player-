import React from 'react';
import './Login.css';
import Button from '@material-ui/core/Button';
import spotifylogo from '../../img/Spotify-Logo.svg'
const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=ed876f89ac4b48528b050cf012707391&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-recently-played%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Login () {
  return (
    <div className="login">
      <img src={spotifylogo} alt=""/>
      <Button
        variant="contained"
        className="login__button"
        href={AUTH_URL}
      >
        Login With Spotify
      </Button>
    </div>
  );
}
