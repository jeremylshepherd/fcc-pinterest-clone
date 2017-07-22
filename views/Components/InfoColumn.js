import React from "react";

const InfoColumn = (props) => {
    return (
        <div className="col-md-4 col-xs-12">                
            <h3 className="text-center">
              <span className={"fa " + props.className}/>
              {"  " + props.name}
            </h3>
            <p>{props.description}</p>
        </div>
    );
};

export default InfoColumn;