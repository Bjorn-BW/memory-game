import React, { useState } from "react";
import GameBoard from './Components/GameBoard';

const MemoryGame = () => {
    const [score, setScore] = useState(0);
    const updateScore = (isMatch) =>{
        setScore((currentScore) => {
            return isMatch ? currentScore + 1 : currentScore - 1;
        });
    };

    const generateCards = () => {
        const colors = ['#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff0000', '#9900ff', '#ff9900', '#663300'];
        const cardDeck = [...colors, ...colors];
        return cardDeck.map((color, index) =>({
            id:index,
            color: color,
            isFlipped: false
        }))
    }; 
    // Att blanda något kan göras på många sätt detta är bara ett alternativ som använder sig av en populär algorithm, Knuth's.
    // Denna algorithm ska vara snabbare än tex riffelblandning https://medium.com/nerd-for-tech/shuffling-algorithms-and-randomization-to-improve-algorithm-s-runtime-47f7fc705df
    const shuffleCards = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
          }
          return cards;
    };

    const [cards, setCards] = useState(shuffleCards(generateCards()));
    return(
        <div data-testid="game-board"className="game-board">
            <GameBoard cards={cards} setCards={setCards} updateScore={updateScore} />
            <h1 data-testid="score">{score}</h1>
        </div>
    );
};

export default MemoryGame;
