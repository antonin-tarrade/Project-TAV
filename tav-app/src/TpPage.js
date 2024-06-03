import React, { useState } from 'react';
import axios from 'axios';
import './TpPage.css';

const TpPage = ({ tp }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [additionalParameters , setAdditionalParameters] = useState([]);
  const [parameters, setParameters] = useState(tp.parameters.map((param) => param.default));

  const handleFileUpload = async () => {
    setResult('');
    if (!selectedFile) return;
    let formData = new FormData();
    formData.append('image', selectedFile);
    parameters.forEach((param) => {
      formData.append('args', param);
    });

    additionalParameters.forEach((param) => {
      formData.append('additionalArgs', param);
    });

    axios.post(`/upload/TP${tp.number}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setResult(response.data.processed_image_url);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="tp-page-container">
      {tp.title && <h1 className="tp-title">{tp.title}</h1>}
      <form className="tp-parameters-form">
        <h2>Paramètres : </h2>
        {tp.parameters.map((param, i) => (
          <label key={i} className="tp-parameter-label">
            {param.description} ({param.type}): {parameters[i]}
            <input 
              type="range" 
              value={parameters[i]} 
              min={param.min}
              max={param.max}
              step={param.type === 'int' ? 1 : 0.01}
              onChange={e => {
                const newParameters = [...parameters];
                newParameters[i] = e.target.value;
                setParameters(newParameters);
              }} 
              className="tp-slider"
            />
          </label>
        ))}
      </form>
      {parameters && tp.dropzone(setSelectedFile, setPreview, setAdditionalParameters,parameters)}
      {preview && (
        <div className="image-preview-container">
          <h3>Aperçu de l'image:</h3>
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}
      {tp.type !== 'audio' && 

      <button onClick={handleFileUpload} disabled={!selectedFile} className="upload-button">
        Traiter l'image
        </button>
      
      }
      {result && (
        <div className="result-image-container">
          <h3>Image traitée:</h3>
          <img src={`http://127.0.0.1:5000${result}`} alt="Processed" className="image-preview" />
        </div>
      )}
    </div>
  );
};

export default TpPage;
