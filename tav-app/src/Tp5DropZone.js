import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import CanvasDraw from 'react-canvas-draw';

const Tp5DropZone = ({ setSelectedFile, setPreview, setAdditionalParameters}) => {
  const [image, setImage] = useState(null);
  const [drawMode, setDrawMode] = useState(false);
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const initialFile = acceptedFiles[0];
    setFile(initialFile);
    const imageUrl = URL.createObjectURL(initialFile);
    setImage(imageUrl);
  };

  const handleSave = () => {
    const canvasData = canvasRef.current.getSaveData();

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
      const data = JSON.parse(canvasData);
      ctx.fillStyle = 'black';
      data.lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.points[0].x * canvas.width / 500, line.points[0].y * canvas.height / 500);
        line.points.forEach((point, index) => {
          if (index !== 0) {
            ctx.lineTo(point.x * canvas.width / 500, point.y * canvas.height / 500);
          }
        });
        ctx.closePath();
        ctx.fill();
      });

      // Create a new preview URL for the processed image
      const processedUrl = canvas.toDataURL();
      setPreview(processedUrl);
      // convert the processed image to a file
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
      data.lines.forEach(line => {
        maskCtx.beginPath();
        maskCtx.moveTo(line.points[0].x * maskCanvas.width / 500, line.points[0].y * maskCanvas.height / 500);
        line.points.forEach((point, index) => {
          if (index !== 0) {
            maskCtx.lineTo(point.x * maskCanvas.width / 500, point.y * maskCanvas.height / 500);
          }
        });
        maskCtx.closePath();
        maskCtx.fill();
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
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {image && (
        <div>
          <button onClick={() => setDrawMode(!drawMode)}>
            {drawMode ? 'Stop Drawing' : 'Start Drawing'}
          </button>
          <button onClick={handleSave} disabled={!drawMode}>
            Save Drawing
          </button>
          <CanvasDraw
            ref={canvasRef}
            imgSrc={image}
            canvasWidth={500}
            canvasHeight={500}
            lazyRadius={0}
            brushRadius={4}
            hideGrid
            disabled={!drawMode}
          />
        </div>
      )}
    </div>
  );
};

export default Tp5DropZone;