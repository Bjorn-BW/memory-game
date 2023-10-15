import React from "react";


const Card = (props) => {
    const { 
        card,
        onCardClicked
    } = props;

    const onClick = (e) => {
        if (!card.matchFound) {
            onCardClicked(e, card);
        }
    }

    return (
        <div className="card" onClick={onClick}>
          {card.isFlipped ? (
            <div className="card-inner" style={{ backgroundColor: card.color }} />
          ) : (
            <div className="card-outer" />
          )}
        </div>
      );
};

export default Card;