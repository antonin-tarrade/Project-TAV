import React from "react";
import TP from "./TP";
import "./TpImages.css";
import {tp6} from "./TpInfos"

function TpImages () {


    return (
        <div>
            <h1 className="section-title">Traitement d'images :</h1>    
            <div className="image-section">
                <TP tp={tp6}/>
                <TP tp={tp6}/>
                <TP tp={tp6}/>
            </div>
            <h1 className="section-title">Traitement Audio :</h1>    
            <div className="image-section">
                <TP tp={tp6}/>
                <TP tp={tp6}/>
            </div>
        </div>
    );
}
export default TpImages;