import React from "react";


const Card = (props) => {
    const { 
        color,
        isFlipped,
        id,
        onCardClicked
    } = props;

    const onClick = (e) => {
        onCardClicked(e, color, id);
    }

    return(
        <div className="card" onClick={onClick}>
            <div className="card-outer" style={{ display: isFlipped ? "none" : "block" }}/>
            <div className="card-inner" style={{ backgroundColor: color, display: isFlipped ? "block" : "none" }} />
      </div>
    );
};

export default Card;