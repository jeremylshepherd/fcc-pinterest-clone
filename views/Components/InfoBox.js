import InfoColumn from "./InfoColumn";
import React from "react";

const InfoBox = (props) => {
    return (
        <div className="container">
            <InfoColumn/>
            <InfoColumn/>
            <InfoColumn/>
        </div>
    );
};

export default InfoBox;