import React from 'react';

function Songs({songs, chooseTrack}) {
  function handlePlay () {
    chooseTrack (songs);
  }
  return (
    <div className="home_songs"     style={{ cursor: "pointer" }} onClick={handlePlay}>
      <img src={songs.albumUrl} alt="" />
      <h5>{songs.title}</h5>
    </div>
  );
}

export default Songs;
