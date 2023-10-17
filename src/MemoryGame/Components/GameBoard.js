import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";

const GameBoard = (props) => {
    const { cards, setCards, updateScore } = props;
    const [selectedCards, setSelectedCards] = useState([]);

    const removeMatchedCards = useCallback((cardsMarkedForRemoval) => {
        setCards((currentCards) => {
            return currentCards.filter((card) => !cardsMarkedForRemoval.includes(card.id));
        });
        setSelectedCards(() => { return []});
    }, [setCards, setSelectedCards]);
    
    const flipUnMatchedCards = useCallback((cardsToFlip) => {
        setCards((currentCards) => {
          const updatedCards = [...currentCards];
      
          cardsToFlip.forEach(card => {
            const cardIndex = updatedCards.findIndex(c => c.id === card);
            updatedCards[cardIndex] = {
              ...updatedCards[cardIndex],
              isFlipped: !updatedCards[cardIndex].isFlipped
            };
          });
      
          return updatedCards;
        });
      
        setSelectedCards([]);
      }, [setCards, setSelectedCards]);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards;
            const isMatch = card1.color === card2.color;
            
            setTimeout(() => {
                if (isMatch) {
                    removeMatchedCards([card1.id, card2.id]);
                } else {
                    flipUnMatchedCards([card1.id, card2.id]);
                }
                updateScore(isMatch);
            }, 2000);
        }
    }, [selectedCards, updateScore, removeMatchedCards, flipUnMatchedCards]);

    function onCardClicked(card) {
        if (selectedCards.length < 2) {
            flipSingleCard(card);
        }
    }

    function flipSingleCard(card) {
        setSelectedCards((currentSelectedCards) => { 
            return[...currentSelectedCards, card];
        });
        setCards((currentCards) => {
            const updatedCards = [...currentCards];
            const cardIndex = updatedCards.findIndex(c => c.id === card.id);
            updatedCards[cardIndex] = {
                ...updatedCards[cardIndex],
                isFlipped: !updatedCards[cardIndex].isFlipped
            }
            return [...updatedCards];
        });
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