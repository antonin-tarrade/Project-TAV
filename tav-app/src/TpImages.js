import React from "react";
import TP from "./TP";
import "./TpImages.css";
import {tp5,tp6,tp8} from "./TpInfos"

function TpImages ({setTp}) {

    return (
        <div>
            <h1 className="section-title">Traitement d'images :</h1>    
            <div className="image-section">
                <TP tp={tp5} setTp={setTp}/>
                <TP tp={tp6} setTp={setTp}/>
                <TP tp={tp8} setTp={setTp}/>
            </div>
            <h1 className="section-title">Traitement Audio :</h1>    
            <div className="image-section">
                <TP tp={tp6} setTp={setTp}/>
                <TP tp={tp6} setTp={setTp}/>
            </div>
        </div>
    );
}
export default TpImages;