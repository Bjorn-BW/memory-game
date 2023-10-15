import React, { useState } from "react";
import Card from "./Card"



const GameBoard = (props) => {
    const { generateCards, shuffleCards, updateScore } = props;
    const [cards, setCards] = useState(shuffleCards(generateCards()));
    const [selectedCards, setSelectedCards] = useState([]);
 
    function onCardClicked (card) {
        if (selectedCards.length > 1) {
            return;
        }
        flipSingleCard(card);
        if (selectedCards.length === 1){
            const isMatch = selectedCards[0].color === card.color;
            updateScore(isMatch);
            setTimeout(() => {
                if(isMatch){
                    removeMatchedCards([card.id, selectedCards[0].id]);
                } else {
                    flipUnMatchedCards([selectedCards[0].id]);
                }
            },2000);
        }
    };

    function flipSingleCard(card) {
        const updatedCards = [...cards];
        const cardIndex = updatedCards.findIndex(c => c.id === card.id);
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            isFlipped: !updatedCards[cardIndex].isFlipped
        }
        setSelectedCards([...selectedCards, updatedCards[cardIndex]]);
        setCards(updatedCards);
    }

    function removeMatchedCards(cardsMarkedForRemoval){
        const updatedCards = cards.filter((card) => !cardsMarkedForRemoval.includes(card.id));
        setCards(updatedCards);
        setSelectedCards([]);

    }

    function flipUnMatchedCards(cardsToFlip){
        const updatedCards = [...cards];
        cardsToFlip.forEach(card => {
            const cardIndex = updatedCards.findIndex(c => c.id === card);
            updatedCards[cardIndex] = {
                ...updatedCards[cardIndex],
                isFlipped: !updatedCards[cardIndex].isFlipped
            }
        });
        setCards(updatedCards);
        setSelectedCards([]);
    }

    return (
    <ul className="card-list">
        {
            cards.map((card, index) => (
                <li className="card-list-item" key={card.id}>
                    <Card card={card} onCardClicked={onCardClicked}/>
                </li>
            ))
        }
    </ul>
    );
};



export default GameBoard;