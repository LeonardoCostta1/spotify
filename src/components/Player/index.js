import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { secondsToMinutes } from "../../utils/secundsToMinutes";
import { useRecoilState, useRecoilValue } from "recoil";
import { filterTracks, indexTRackA, playtoggle, tracksAlbums } from "../../store/session";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import Slider from "@mui/material/Slider";
import "./styles.css";
const Player = () => {
  const music = useRef(null);
  const theme = useTheme();

  const [playSimble, setPlaySimble] = useState(">");
  const [duracao, setDuracao] = useState("00:00");
  const [current, setCurrent] = useState("00:00");
  const [tracks, setTracks] = useState();
  const [infoTRack, setInfoTrack] = useState({});
  const [duracaob, setDuracaob] = useState(0);
  const [currentb, setCurrentb] = useState(0);
  const [vol, setVol] = useState(0);

  const session = useRecoilValue(filterTracks);
  
  const [indexTrack, setIndexTracks] = useRecoilState(indexTRackA);
  const [playT, setPlayT] = useRecoilState(playtoggle);

  const play = () => {
    if(!playT){
      setPlayT(true)
      music.current.play()
    }else{
      music.current?.pause()
      setPlayT(false)
    }
    duration();
    // console.log(playT)
  };

  const duration = async () => {
    await setDuracao(secondsToMinutes(music.current.duration));
    await setDuracaob(music.current.duration);
  };

  const currentTime = async () => {
    await setCurrent(secondsToMinutes(music.current.currentTime));
    await setCurrentb(music.current.currentTime);
  };

  const addTrack = async () => {
    await setTracks(session[indexTrack].audio);
  };

  const addTrackName = async () => {
    await setInfoTrack(session[indexTrack]);
  };

  const nextTrack = async () => {
    duration();
    
    await indexTrack < session.length - 1
      ? setIndexTracks(indexTrack + 1)
      : setIndexTracks(0);
      setPlayT(false)
      setTimeout(() => {
        play();
      }, 1500);
  };

  const prevTrack = async () => {
    duration();
    await indexTrack === 0
      ? setIndexTracks(session.length - 1)
      : setIndexTracks(indexTrack - 1);
      setPlayT(false)
      setTimeout(() => {
        play();
      }, 1500);
  };

  const seek = (time) => {
    music.current.currentTime = time;
  };

  const seekVol = async (vol) => {
    music.current.volume = vol;
  };
  const volume = async () => {
    await setVol(music.current.volume);
  };

  const stop = () => {
    music.current.pause();
    music.current.currentTime = 0;
  };

  useEffect(() => {
    addTrack();
    addTrackName();
    volume();

    if (music.current.currentTime === music.current.duration) {
      stop();
      nextTrack();
      setTimeout(() => {
        play();
      }, 1000);
    }

  });

  return (
    <div className="player_wrapper">
      <Slider
        value={currentb}
        className="slider"
        size="small"
        min={0}
        max={duracaob}
        step={0.000001}
        aria-label="Small"
        valueLabelDisplay="off"
        onChange={(_, value) => seek(value)}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "#1DB854",
          "& .MuiSlider-track": {
            border: "none"
          },
          "& .MuiSlider-thumb": {
            width: 5,
            height: 5,
            backgroundColor: "#1DB854",
            "&:before": {
              boxShadow: "0 4px 8px #1DB854"
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none"
            }
          }
        }}
      />
      <audio ref={music} src={tracks} onTimeUpdate={currentTime}></audio>

      <div className="info_track_wrapper">
        <div className="cover_track">
          <img src={infoTRack.capa} alt="capa" />
        </div>
        <div className="info_container">
          <div className="track_name_artist">{infoTRack.artista}</div>
          <div className="track_name">{infoTRack.nome}</div>
        </div>
      </div>

      <div className="player_controls_container">
        <div className="timer">{current}</div>
        <button onClick={()=>prevTrack()}><SkipPreviousOutlinedIcon/></button>
        <button disabled={!tracks} value={playSimble} onClick={()=>play()}>
          {playT ? <PauseOutlinedIcon/> : <PlayArrowOutlinedIcon/> }
        </button>
        <button onClick={()=>nextTrack()}><SkipNextOutlinedIcon/></button>
        <div className="timer">{duracao}</div>
      </div>

      <div className="info_track_wrapper">
        <VolumeUpOutlinedIcon sx={{ fontSize: 15, color: "#999" }} />

        <Slider
          className="sliderB"
          size="small"
          defaultValue={100}
          step={0.1}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={(_, value) => seekVol(value / 100)}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#1DB854",
            "& .MuiSlider-track": {
              border: "none"
            },
            "& .MuiSlider-thumb": {
              width: 5,
              height: 5,
              backgroundColor: "#1DB854",
              "&:before": {
                boxShadow: "0 4px 8px #1DB854"
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none"
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Player;
