import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const TpPage = (TpInfo) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    let formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('args', 300);
    formData.append('args', 2);
    formData.append('args', 0.01);

    console.log("requesting");
    axios.post('/upload/TP6', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log(response.data);
        setResult(response.data.processed_image_url
        );
    })
    .catch(error => {
        console.error(error);
    });
  };

  return (
    <div>
      <Dropzone 
        onDrop={acceptedFiles => {
          setSelectedFile(acceptedFiles[0]);
          setPreview(URL.createObjectURL(acceptedFiles[0]));
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {preview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Preview" style={imageStyles} />
        </div>
      )}
      <button onClick={handleFileUpload} disabled={!selectedFile}>Upload Image</button>
      {result && (
        <div>
          <h3>Processed Image:</h3>
          <img src={`http://127.0.0.1:5000${result}`} alt="Processed" style={imageStyles} />
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '20px 0'
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '400px',
  margin: '20px 0'
};

export default TpPage;
