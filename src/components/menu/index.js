import React, { useState, useRef, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./style.css";
import spotify from "../../assets/img/logo.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterTracks, indexTRackA, nameTrack, onlyAlbum } from "../../store/session";
import { useNavigate } from 'react-router-dom';
function Menu() {
  const [busca, setBusca] = useState("");
  const timeoutRef = useRef(null);
  const filterTracksn = useRecoilValue(filterTracks);
  const [only, setOnlyAlbum] = useRecoilState(onlyAlbum);

  const navigate = useNavigate();

  const search = (e) => {
    var filteredMusic = filterTracksn.findIndex(checkAge);

    function checkAge(age) {
      return age.nome === e.target.value
    }

    var onlyTrck = filterTracksn.find(function (el,fromIndex) {
      return fromIndex === filteredMusic
    });

    e.preventDefault()
    setBusca(e.target.value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if(onlyTrck){
        setOnlyAlbum([{ onlyTrck, index:filteredMusic }]);
        navigate('search');
      }else{
        setOnlyAlbum([]);
      }

    }, 1000);
  };

  return (
    <div className="menu_wrapper">
      <div className="logo_menu">
        <img src={spotify} alt="spotify" />
      </div>

      <div className="seacrh_bar">
        <form>
          <div className="forb_bg">
            <input
              type="text"
              value={busca}
              placeholder="pesquisar"
              onChange={search}
            />
            <button>
              <SearchOutlinedIcon sx={{ fontSize: 20, color: "#999" }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Menu;
