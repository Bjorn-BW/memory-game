import React from "react";

const Card = (props) => {
    const { 
        card,
        onCardClicked
    } = props;

    function onClick() {
        if(!card.isFlipped){
            onCardClicked(card);
        } 
    }

    return (
        <div className="card" onClick={onClick}>
          {card.isFlipped ? (
            <div className="card-inner" data-testid="flipped-card" style={{ backgroundColor: card.color }} />
          ) : (
            <div className="card-outer" data-testid="unflipped-card" />
          )}
        </div>
      );
};

export default Card;