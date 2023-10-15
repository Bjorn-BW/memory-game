import React from "react";
import GameBoard from './Components/GameBoard';

const MemoryGame = () => {
    const generateCards = () => {
        const colors = ['#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff0000', '#9900ff', '#ff9900', '#663300'];
        const cardDeck = [...colors, ...colors];
        return cardDeck.map((color, index) =>({
            id:index,
            color: color,
            isFlipped: false
        }))
    }; 
    const shuffleCards = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
          }
          return cards;
    };
    return(
        <div className="game-board">
            <GameBoard generateCards={generateCards} shuffleCards={shuffleCards}  />
        </div>
    );
};

export default MemoryGame;
