import React from "react";
import "./TP.css";

function TP ({tp}) {
    return (
        <div className="tp-container">
            <h1>TP{tp.number} : {tp.title}</h1>
            <div className="main-conta">
                <div className="img-container">
                    <img className="preview-img" src={tp.imagePreview} alt="Preview"/>
                </div>
                <div className="infos-container">    
                    <p>{tp.smallDescription}</p>
                    <button className="detail-button" type="button">Plus de detail</button>
                </div>
            </div>
        </div>
    );
} 
export default TP;