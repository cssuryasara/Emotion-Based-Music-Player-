import React, {useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TrackSearchResult from '../searchResult/TrackSearchResult';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectaccessToken, setPlayingSong} from '../../features/appSlice';
import '../home/Home.css';
import '../search/Search.css'

function Search ({spotifyApi}) {
  const dispatch = useDispatch ();
  const [search, setSearch] = useState ('');
  const [searchResults, setSearchResults] = useState ([]);

  const accessToken = useSelector (selectaccessToken);
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
  function chooseTrack (track) {
    console.log (track);
    dispatch (setPlayingSong (track));
    setSearch ('');
  }
  return (
    <div className="dashBoard">
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
    </div>
  );
}

export default Search;
