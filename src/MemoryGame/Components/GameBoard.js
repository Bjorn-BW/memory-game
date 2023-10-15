import React, { useState } from "react";
import Card from "./Card"



const GameBoard = (props) => {
    const { generateCards, shuffleCards, updateScore } = props;
    const [cards, setCards] = useState(shuffleCards(generateCards()));
    const [selectedCards, setSelectedCards] = useState([]);
 


    const onCardClicked = (e, card) => {
        const updatedCards = [...cards];
        const cardIndex = updatedCards.findIndex(c => c.id === card.id);
        
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            isFlipped: !updatedCards[cardIndex].isFlipped
        }

        if (selectedCards.length === 1){
            const isMatch = selectedCards[0].color === updatedCards[cardIndex].color;
            updateScore(isMatch);
            const firstChoiceIndex = updatedCards.findIndex(c => c.id === selectedCards[0].id);
            setTimeout(() =>{flipOrRemoveCards(isMatch, firstChoiceIndex, cardIndex, updatedCards)}, 2000);
            
            
            setSelectedCards([]);
            
        } else {
            setSelectedCards([...selectedCards, updatedCards[cardIndex]]);
        }
        setCards(updatedCards);
    };
    function flipOrRemoveCards(isMatch, firstChoiceIndex, selectedCardIndex, updatedCards) {
        if (!isMatch) {
            updatedCards[firstChoiceIndex] = {
                ...updatedCards[firstChoiceIndex],
                isFlipped: !updatedCards[firstChoiceIndex].isFlipped
            }
            updatedCards[selectedCardIndex] = {
                ...updatedCards[selectedCardIndex],
                isFlipped: !updatedCards[selectedCardIndex].isFlipped
            }
        } else {
            updatedCards[firstChoiceIndex] = {
                ...updatedCards[firstChoiceIndex],
                matchFound: !updatedCards[firstChoiceIndex].matchFound
            }
            updatedCards[selectedCardIndex] = {
                ...updatedCards[selectedCardIndex],
                matchFound: !updatedCards[selectedCardIndex].matchFound
            }
        }
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