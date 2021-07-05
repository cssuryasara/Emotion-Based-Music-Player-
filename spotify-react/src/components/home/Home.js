import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import {
  loginuser,
  selectopenSearch,
  setaccessToken,
  setPlayingSong,
  setReload,
} from '../../features/appSlice';
import useAuth from '../../components/useAuth';
import './Home.css';
import '../search/Search.css';

import Songs from '../../components/Songs';
import Search from '../search/Search';
const spotifyApi = new SpotifyWebApi ({
  clientId: 'ed876f89ac4b48528b050cf012707391',
});
function Home({code}) {
  const accessToken = useAuth (code);
  const dispatch = useDispatch ();
  const [track, settrack] = useState ([]);
  const [newReleases, setnewReleases] = useState ([]);
  const openSearch = useSelector (selectopenSearch);
  const [savedTracks, setsavedTracks] = useState ([]);

  const getRecentPlayedSongs = () => {
    spotifyApi.getMe ().then (
      function (data) {
        dispatch (loginuser (data.body));
        // console.log('Some information about the authenticated user', data.body);
      },
      function (err) {
        // console.log('Something went wrong!', err);
      }
    );

    spotifyApi.getNewReleases ({limit: 10, offset: 0, country: 'IN'}).then (
      function (data) {
        setnewReleases (
          data.body.albums.items.map (songs => {
            // console.log(songs);

            const smallestAlbumImage = songs.images.reduce (
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              songs.images[0]
            );
            return {
              artist: songs.artists[0].name,
              title: songs.name,
              uri: songs.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      },
      function (err) {
        // console.log('Something went wrong!', err);
      }
    );

    spotifyApi
      .getMySavedTracks ({
        limit: 10,
        offset: 1,
      })
      .then (
        function (data) {
          // console.log (data.body);
          setsavedTracks (
            data.body.items.map (songs => {
              const smallestAlbumImage = songs.track.album.images.reduce (
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                songs.track.album.images[0]
              );
              return {
                artist: songs.track.artists[0].name,
                title: songs.track.name,
                uri: songs.track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          );
        },
        function (err) {
          console.log ('Something went wrong!', err);
        }
      );

    spotifyApi
      .getMyRecentlyPlayedTracks ({
        limit: 20,
      })
      .then (
        function (data) {
          settrack (
            data.body.items.map (track => {
              const smallestAlbumImage = track.track.album.images.reduce (
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest;
                },
                track.track.album.images[0]
              );
              return {
                artist: track.track.artists[0].name,
                title: track.track.name,
                uri: track.track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          );
        },
        function (err) {
          // console.log('Something went wrong!', err);
        }
      );
  };

  function chooseTrack (track) {
    console.log (track);
    dispatch (setPlayingSong (track));
  }

  useEffect (
    () => {
      if (!accessToken) return;
      spotifyApi.setAccessToken (accessToken);
      dispatch (setaccessToken (accessToken));
      dispatch (setReload (accessToken));
      getRecentPlayedSongs ();
    },
    [accessToken]
  );


  return (
    <div className="home">
      {!openSearch
        ? <div className="home__songs">
            <h3>Recently Played</h3>
            <div className="home__recentlyPlayed">
              {track.map (songs => {
                return <Songs songs={songs} chooseTrack={chooseTrack} />;
              })}
            </div>
            <h3>New Releases</h3>

            <div className="home__newRelease">
              {newReleases.map (songs => {
                return <Songs songs={songs} chooseTrack={chooseTrack} />;
              })}
            </div>
            <h3>Your Favourites</h3>

            <div className="home__savedTracks">
              {savedTracks.map (songs => {
                return <Songs songs={songs} chooseTrack={chooseTrack} />;
              })}
            </div>
          </div>
        : <Search spotifyApi={spotifyApi} />}

    </div>
  );
}

export default Home;
