import React, { useState, useEffect } from "react";
import Card from "./Card"



const GameBoard = (props) => {
    const { generateCards, shuffleCards } = props;
    const [cards, setCards] = useState(shuffleCards(generateCards()));
    const [points, setPoints] = useState(0);
    const [checkMatch, setCheckMatch] = useState(false);


    const onCardClicked = (e, color, id) => {
        const updatedCards = [...cards];
        const cardIndex = updatedCards.findIndex(c => c.id === id);

        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            isFlipped: !updatedCards[cardIndex].isFlipped
        }
        setCards(updatedCards);
    };
    return (
    <ul className="card-list">
        {
            cards.map((card, index) => (
                <li className="card-list-item" key={card.id}>
                    <Card color={card.color} isFlipped={card.isFlipped} id={card.id} onCardClicked={onCardClicked}/>
                </li>
            ))
        }
    </ul>
    );
};



export default GameBoard;