import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Tp11Zone.css'; // Import the CSS file
import CircularProgress from '@mui/material/CircularProgress';

const Tp11Zone = () => {
    const [musicUrl, setMusicUrl] = useState('');
    const [audioDuration, setAudioDuration] = useState(0);
    const [startTime, setStartTime] = useState(1);
    const [endTime, setEndTime] = useState(0);
    const [musicNumber , setMusicNumber] = useState(0);
    const audioRef = useRef(null);
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const fetchMusic = async () => {
    const randomNumber = Math.floor(Math.random() * 116);
    setMusicNumber(randomNumber);
    try {
        const response = await axios.get(`/music/${randomNumber}`, { 
        withCredentials:true ,
        headers: {
            'Content-Type': 'application/json',
        },
        });
        setMusicUrl(response.config.url);
    } catch (error) {
        console.error('Error fetching music file:', error);
    }
    };

    const handleLoadedMetadata = () => {
    if (audioRef.current) {
        setAudioDuration(audioRef.current.duration);
        setEndTime(audioRef.current.duration); // Set default end time to audio duration
    }
    };

    const handlePlaySegment = () => {
    if (audioRef.current) {
        audioRef.current.currentTime = startTime;
        audioRef.current.play();
        const interval = setInterval(() => {
        if (audioRef.current.currentTime >= endTime) {
            audioRef.current.pause();
            clearInterval(interval);
        }
        }, 100);
    }
    };

    const handleIdentify =  () => {
        setIsLoading(true);
        const parameters = [musicNumber, startTime, endTime];
        const params = new URLSearchParams();
        parameters.forEach((param) => {
            params.append('args', param);
        });
        axios.get(`/shazam/`, {params}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setResult(response.data.title);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
    <div className="container">
        <button onClick={fetchMusic} className="get-music-button">Récuperer une musique aléatoire</button>
        {musicUrl && (
        <div>
            <audio
            ref={audioRef}
            src={musicUrl}
            onLoadedMetadata={handleLoadedMetadata}
            controls
            className="audio"
            />
            <h2>Choisir un extrait</h2>
            <div className="time-selectors">
            <div className="time-selector">
                <label>Start Time: {startTime.toFixed(2)}s</label>
                <input
                type="range"
                min="1"
                max={audioDuration}
                value={startTime}
                step="0.1"
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="slider"
                />
            </div>
            <div className="time-selector">
                <label>End Time: {endTime.toFixed(2)}s</label>
                <input
                type="range"
                min={startTime}
                max={audioDuration}
                value={endTime}
                step="0.1"
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="slider"
                />
            </div>
            </div>
            <button onClick={handlePlaySegment} className="upload-button">Jouer l'extrait</button>
            <button onClick={handleIdentify} className="upload-button" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} style={{ color: "#008000" }} /> : "Identifier"}
            </button>
        {result && <h2>Résultat : {result}</h2>}
        </div>
        )}
    </div>
    );
};

export default Tp11Zone;
