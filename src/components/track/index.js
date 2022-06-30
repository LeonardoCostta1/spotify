import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { indexTRackA, onlyAlbum } from "../../store/session";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Track() {
  const navigate = useNavigate();
  const [only, setOnlyAlbum] = useRecoilState(onlyAlbum);
  const [indexTrack, setIndexTracks] = useRecoilState(indexTRackA);
  // console.log(only[0].onlyTrck)

  useEffect(() => {
    if (only.length == 0) {
      return navigate("/");
    }
  }, [only]);

  return (
    <div className="track_container">
      <div className="category_albums">
        {only.map((album, index) => {
           console.log(album.index);
          return (
            <div key={album.onlyTrck.id} className="card" onClick={()=>setIndexTracks(album.index)}>
              <div className="cover">
                <img src={album.onlyTrck.capa} alt="cover" />
              </div>
              <div className="title">{album.onlyTrck.artista}</div>
              <div className="track">{album.onlyTrck.nome}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Track;
