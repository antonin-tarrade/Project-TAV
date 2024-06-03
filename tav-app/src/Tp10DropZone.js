import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Dropzone from 'react-dropzone';
import './Tp10DropZone.css'
import CircularProgress from '@mui/material/CircularProgress';

const Tp10DropZone = ({tpParameters}) => {
    const [selectedFile,setSelectedFile] = useState('');
    const [previewAudioUrl,setPreviewAudioUrl] = useState('');
    const [resultAudioUrl,setResultAudioUrl] = useState('');
    const [taux,setTaux] = useState('');
    const [resultImg,setResultImg] = useState('');
    const [parameters,setParameters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
       setParameters(tpParameters)
    }, [tpParameters]);


    const handleSubmit = () => {
        setIsLoading(true);
        setResultAudioUrl('');
        setResultImg('');
        setTaux('');
        if (!selectedFile) return;
        let formData = new FormData();
        formData.append('audio',selectedFile);
        parameters.forEach((param) => {
            formData.append('args', param);
        });
        axios.post("/audio/",formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                }
        })
        .then(response => {
            setResultAudioUrl(response.data.audio_url);
            setResultImg(response.data.image_url);
            setTaux(response.data.taux)
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
        });
    }
    return (
        <div>            
            <Dropzone 
            onDrop={acceptedFiles => {
                setSelectedFile(acceptedFiles[0]);
                setPreviewAudioUrl(URL.createObjectURL(acceptedFiles[0]));
            }}
            >
        {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone-card">
                <input {...getInputProps()} />
                <p>Glisser-déposer un audio ici, ou cliquer pour en sélectionner un</p>
            </div>
        )}
        </Dropzone>
        <div className='tp10-dropzone'>
            {   previewAudioUrl &&
                <audio src={previewAudioUrl} controls/>
            }
            <button 
            onClick={handleSubmit} 
            className='upload-button' 
            type="button"
            disabled={!selectedFile|| isLoading}
            >
                {isLoading ? <CircularProgress size={24} style={{ color: "#008000" }} /> : "Compresser"}
            </button>
            
            {resultAudioUrl && <div className='audio-results'>
                
            <h2>Resultats :</h2>
                <div className='audio-compressed'>
                    <h3> Audio compressé (taux de compression = {taux.toFixed(2)} %) : </h3>
                    <audio src={resultAudioUrl} controls/>
                </div>
            {resultImg && (
                <div className="result-image-container">
                    <h3> Sonnogrames :</h3>
                    <img src={`http://127.0.0.1:5000${resultImg}`} alt="Processed" className="image-preview" />
                </div>
            )}
            </div>}
        </div>
        </div>
    )
}

export default Tp10DropZone;