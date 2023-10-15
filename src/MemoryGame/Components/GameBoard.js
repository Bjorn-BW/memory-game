import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card"

const GameBoard = (props) => {
    const { cards, setCards, updateScore } = props;
    const [selectedCards, setSelectedCards] = useState([]);

    const removeMatchedCards = useCallback((cardsMarkedForRemoval) => {
        const updatedCards = cards.filter((card) => !cardsMarkedForRemoval.includes(card.id));
        setCards(updatedCards);
        setSelectedCards([]);
    }, [cards, setCards]);
    
    const flipUnMatchedCards = useCallback((cardsToFlip) => {
        const updatedCards = [...cards];
        cardsToFlip.forEach(card => {
            const cardIndex = updatedCards.findIndex(c => c.id === card);
            updatedCards[cardIndex] = {
                ...updatedCards[cardIndex],
                isFlipped: !updatedCards[cardIndex].isFlipped
            };
        });
        setCards(updatedCards);
        setSelectedCards([]);
    }, [cards, setCards]);

    // Introducerat useEffect och useCallback för att man inte har kontroll över när setState körs och att vi då aldrig kan vara säkra på när vi ska köra removeMatchedCard och flipUnMatchedCards ifall state: [cards] har uppdaterats eller ej. 
    // En mindre detalj som kan vara ett förmål för tolkning är om man läser instruktionerna för uppgiften. "Om två kort är lika, får spelaren ett poäng, och korten tas bort från spelplanen efter 2 sekunder."
    // Detta kan tolkas som att poäng ska hända innan remove eller kortvändning ska ske. 
    // Jag har valt att inte tolka det så eftersom det skulle isåfall innebära att vi måste kalla på updateScore tidigare och då även ta reda på om korten matchar.
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
        setSelectedCards([...selectedCards, card]);
        }
    }

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