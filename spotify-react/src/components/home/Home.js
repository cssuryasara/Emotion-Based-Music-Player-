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
import useAuth from '../../useAuth';
import SearchIcon from '@material-ui/icons/Search';
import './Home.css';
import '../search/Search.css';

import TrackSearchResult from '../searchResult/TrackSearchResult';
import Songs from '../../Songs';
const spotifyApi = new SpotifyWebApi ({
  clientId: 'ed876f89ac4b48528b050cf012707391',
});
function Home({code}) {
  const accessToken = useAuth (code);
  const dispatch = useDispatch ();
  const [track, settrack] = useState ([]);
  const [newReleases, setnewReleases] = useState ([]);
  const openSearch = useSelector (selectopenSearch);
  const [search, setSearch] = useState ('');
  const [searchResults, setSearchResults] = useState ([]);
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
    spotifyApi.getUserPlaylists ('Happy').then (
      function (data) {
        console.log ('Retrieved playlists', data.body);
      },
      function (err) {
        console.log ('Something went wrong!', err);
      }
    );
    spotifyApi.searchPlaylists ('happy', {limit: 5}).then (
      function (data) {
        const r = Math.round (Math.random () * 4);
        console.log (r);
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
              const rr = Math.round (Math.random () * 19);
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
    setSearch ('');
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

  useEffect (
    () => {
      if (!search) return setSearchResults ([]);
      if (!accessToken) return;

      let cancel = false;
      spotifyApi.searchTracks (search).then (res => {
        if (cancel) return;
        setSearchResults (
          res.body.tracks.items.map (track => {
            const smallestAlbumImage = track.album.images.reduce (
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return image;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      });

      return () => (cancel = true);
    },
    [search, accessToken]
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
        : <div className="dashBoard">
            <div className="header__middle">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={e => setSearch (e.target.value)}
              />
              {/* <input placeholder="Search mail" type="text"/> */}
            </div>
            <div className="searchlist" style={{overflowY: 'auto'}}>
              {searchResults.map (track => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
            </div>
          </div>}

    </div>
  );
}

export default Home;
