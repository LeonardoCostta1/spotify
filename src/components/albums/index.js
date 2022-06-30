import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterTracks,
  indexTRackA,
  playtoggle,
  tracksAlbums
} from "../../store/session";

import "./style.css";
function Albums() {
  const albums = useRecoilValue(tracksAlbums);
  const [track, setIndexTrack] = useRecoilState(indexTRackA);
  const [playT, setPlayT] = useRecoilState(playtoggle);
  const add = (track) => {
    setIndexTrack(track);
    setPlayT(false);
  };


  return (
    <div className="albums_wrapper">
      <div className="category_albums">
      {albums.map((album, index) => {
        console.log(album)
              return (
                <div key={album.id} className="card" onClick={() => add(index)}>
                  <div className="cover">
                    <img src={album.capa} alt="cover" />
                  </div>
                  <div className="title">{album.artista}</div>
                  <div className="track">{album.nome}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Albums;
