import React from "react"
import "./TrackSearchResult.css"
export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="trackSearchResult"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img alt="" src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}
