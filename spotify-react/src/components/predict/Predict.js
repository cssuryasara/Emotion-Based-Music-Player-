import {Button} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import predictlogo from '../../img/predict.svg';
import {
  resetEverything,
  resetpredictedValue,
  selectCameraImage,
  SelectemotionCSSClass,
  SelectPredictedValue,
  setCameraImage,
  setEmotionCSSClass,
  setPictureTaken,
  setPredictedValue,
} from '../../features/CameraSlice';
import './Predict.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';
import SpotifyWebApi from 'spotify-web-api-node';
import {selectaccessToken, setPlayingSong} from '../../features/appSlice';
const spotifyApi = new SpotifyWebApi ({
  clientId: 'ed876f89ac4b48528b050cf012707391',
});
function Predict () {
  const cameraImage = useSelector (selectCameraImage);
  const prediction = useSelector (SelectPredictedValue);
  const emotionCSSClass = useSelector (SelectemotionCSSClass);
  const accessToken = useSelector (selectaccessToken);
  const dispatch = useDispatch ();
  const history = useHistory ();
  const [emotion, setemotion] = useState ();
  const resetPrediction = () => {
    dispatch (resetEverything ());

    history.replace ('/capture');
  };

  useEffect (
    () => {
      if (!cameraImage) {
        history.replace ('/capture');
      } else {
        spotifyApi.setAccessToken (accessToken);
      }
    },
    [cameraImage, history, accessToken]
  );
  const playSongOnEmotion = emotion => {
    spotifyApi.searchPlaylists (emotion, {limit: 5}).then (
      function (data) {
        const r = Math.round (Math.random () * 4);
        console.log (r);
        // console.log(data.body.playlists)
        // console.log(data.body.playlists.items[r].name)
        const playid = data.body.playlists.items[r].id;
        console.log ('Found playlists are', playid);
        spotifyApi
          .getPlaylistTracks (playid, {
            offset: 1,
            limit: 20,
            fields: 'items',
          })
          .then (
            function (data) {
              const rr = Math.round (
                Math.random () * (data.body.items.length - 1)
              );
              console.log (rr);
              const trackk = data.body.items[rr].track;
              console.log ('The playlist contains these tracks', trackk);
              const smallestAlbumImage = trackk.album.images.reduce (
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                trackk.album.images[0]
              );
              const etrack = {
                artist: trackk.artists[0].name,
                title: trackk.name,
                uri: trackk.uri,
                albumUrl: smallestAlbumImage.url,
              };
              dispatch (setPlayingSong (etrack));
            },
            function (err) {
              console.log ('Something went wrong!', err);
            }
          );
      },
      function (err) {
        console.log ('Something went wrong!', err);
      }
    );
  };

  const predict = () => {
    const image = cameraImage.replace ('data:image/jpeg;base64,', '');
    let message = {
      image: image,
    };
    axios
      .post (' http://localhost:5000/predict', JSON.stringify (message))
      .then (data => {
        console.log (data.data);
        if (data.data.status === 500) {
          alert (data.data.predictedValue);
        } else {
          dispatch (setPredictedValue (data.data.predictedValue));
          setemotion (data.data.cssClass);
          playSongOnEmotion (data.data.cssClass);
        }
        dispatch (setEmotionCSSClass (data.data.cssClass));
      })
      .catch (error => {
        alert (error);
        console.log (error);
      });
  };
  const convertBase64 = file => {
    return new Promise ((resolve, reject) => {
      const fileReader = new FileReader ();
      fileReader.readAsDataURL (file);
      fileReader.onload = () => {
        resolve (fileReader.result);
      };
      fileReader.onerror = error => {
        reject (error);
      };
    });
  };
  const hiddenFileInput = useRef (null);

  const handleClick = event => {
    hiddenFileInput.current.click ();
  };

  const handleFileRead = async event => {
    const file = event.target.files[0];
    const base64 = await convertBase64 (file);
    dispatch (setCameraImage (base64));
    dispatch (setPictureTaken (true));
    dispatch (resetpredictedValue ());
  };

  return (
    <div className={`predict ${emotionCSSClass}`}>
      <div className="predict__imageContainer">
        <div className="predict__image">
          <img
            height="437"
            width="583"
            src={cameraImage}
            className="predict__image"
            alt=""
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileRead}
            encType="multipart/form-data"
            className="imageCapture__inputfile"
          />
          <RefreshIcon onClick={handleClick} className="RefershIcon" />

          <h3>{prediction}</h3>
        </div>

      </div>
      <div className="predict__buttons">
        <Button
          onClick={!prediction ? predict : resetPrediction}
          className="predict__button"
        >
          {!prediction
            ? <img src={predictlogo} className="predictlogo" alt="logo" />
            : <ArrowBackIcon />}

          {!prediction ? 'predict Image' : 'Go Back'}

        </Button>
        {prediction
          ? <Button
              className="predict__button"
              onClick={() => playSongOnEmotion (emotion)}
            >
              <MusicNoteOutlinedIcon />Play Another Song
            </Button>
          : null}
      </div>
    </div>
  );
}

export default Predict;
