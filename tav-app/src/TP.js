import React from "react";
import "./TP.css";

function TP({ tp, setTp }) {
  const onDetailClick = () => {
    setTp(tp);
  };

  return (
    <div className="tp-container">
      <h1>TP{tp.number} : {tp.title}</h1>
      <div className="main-conta">
        <div className="img-container">
          {tp.videoPreview ? (
            <video className="preview-video" controls autoPlay loop>
              <source src={tp.videoPreview} type="video/mp4" />
            </video>
          ) : (
            <img className="preview-img" src={tp.imagePreview} alt="Preview" />
          )}
        </div>
        <div className="infos-container">
          <p>{tp.smallDescription}</p>
          <button className="detail-button" type="button" onClick={onDetailClick}>
            Plus de detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default TP;
