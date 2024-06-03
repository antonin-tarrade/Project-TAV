import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const MAX_WIDTH = 800; // Définissez la largeur maximale souhaitée pour le canevas
const MAX_HEIGHT = 600; // Définissez la hauteur maximale souhaitée pour le canevas

const Tp5DropZone = ({ setSelectedFile, setPreview, setAdditionalParameters }) => {
  const [image, setImage] = useState(null);
  const [drawMode, setDrawMode] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({});
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const initialFile = acceptedFiles[0];
    setFile(initialFile);
    const imageUrl = URL.createObjectURL(initialFile);
    
    // Create an image to measure its dimensions
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const { width, height } = img;
      let newWidth = width;
      let newHeight = height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const aspectRatio = width / height;
        if (width > height) {
          newWidth = MAX_WIDTH;
          newHeight = MAX_WIDTH / aspectRatio;
        } else {
          newHeight = MAX_HEIGHT;
          newWidth = MAX_HEIGHT * aspectRatio;
        }
      }

      setCanvasDimensions({ width: newWidth, height: newHeight });
      setImage(imageUrl);
    };
  };

  const handleSave = async () => {
    const canvasData = await canvasRef.current.exportPaths();
    console.log(canvasData); // Inspect the structure of canvasData

    // Process the image to black out the selected part
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw the black polygon on the canvas
      ctx.fillStyle = 'black';
      canvasData.forEach(({ paths }) => {
        if (paths && paths.length > 0) {
          ctx.beginPath();
          ctx.moveTo(paths[0].x * canvas.width / canvasDimensions.width, paths[0].y * canvas.height / canvasDimensions.height);
          paths.forEach(point => {
            ctx.lineTo(point.x * canvas.width / canvasDimensions.width, point.y * canvas.height / canvasDimensions.height);
          });
          ctx.closePath();
          ctx.fill();
        }
      });

      // Create a new preview URL for the processed image
      const processedUrl = canvas.toDataURL();
      setPreview(processedUrl);
      // Convert the processed image to a file
      canvas.toBlob(blob => {
        setSelectedFile(new File([blob], file.name + '_processed.png'));
      });

      // Create a mask for the processed image with everything black but the selected part
      const maskCanvas = document.createElement('canvas');
      const maskCtx = maskCanvas.getContext('2d');
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;
      maskCtx.fillStyle = 'black';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.fillStyle = 'white';
      canvasData.forEach(({ paths }) => {
        if (paths && paths.length > 0) {
          maskCtx.beginPath();
          maskCtx.moveTo(paths[0].x * maskCanvas.width / canvasDimensions.width, paths[0].y * maskCanvas.height / canvasDimensions.height);
          paths.forEach(point => {
            maskCtx.lineTo(point.x * maskCanvas.width / canvasDimensions.width, point.y * maskCanvas.height / canvasDimensions.height);
          });
          maskCtx.closePath();
          maskCtx.fill();
        }
      });
      const maskUrl = maskCanvas.toDataURL();
      setAdditionalParameters([maskUrl]);
    };
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone-card">
            <input {...getInputProps()} />
            <p>Glisser-déposer une image ici, ou cliquer pour en sélectionner une</p>
          </div>
        )}
      </Dropzone>
      {image && (
        <div>
          <h3>Détourer la partie à supprimer</h3>
          <button onClick={() => setDrawMode(!drawMode)}>
            {drawMode ? 'Arrêter la sélection' : 'Commencer la sélection'}
          </button>
          <button onClick={handleSave} disabled={!drawMode}>
            Sauvegarder la sélection
          </button>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{ border: '1px solid #000', marginTop: '10px' }}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            strokeWidth={4}
            strokeColor="black"
            backgroundImage={image}
          />
        </div>
      )}
    </div>
  );
};

export default Tp5DropZone;
