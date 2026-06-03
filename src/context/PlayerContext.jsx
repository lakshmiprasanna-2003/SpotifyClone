import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playWithId = (id) => {
    const selectedSong = songsData.find((song) => song.id === id);

    if (selectedSong) {
      setTrack(selectedSong);
    }
  };
  const previous = async() => {
    if (track.id>0){
        await setTrack(songsData[track.id-1]);
        await audioRef.current.play();
        setIsPlaying(true);
    }
  }
  const next = async() => {
    if (track.id<songsData.length-1){
        await setTrack(songsData[track.id+1]);
        await audioRef.current.play();
        setIsPlaying(true);
    }
  }
  const seekSong= async(e)=>{
    audioRef.current.currentTime=(e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration;
    await audioRef.current.play();
    setIsPlaying(true);
    
  }

  useEffect(() => {
    if (audioRef.current && track) {
      audioRef.current.load();

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Playback error:", err);
        });
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      if (!audio.duration) return;

      if (seekBar.current) {
        seekBar.current.style.width = `${
          (audio.currentTime / audio.duration) * 100
        }%`;
      }

      setDuration({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    playAudio,
    pauseAudio,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;