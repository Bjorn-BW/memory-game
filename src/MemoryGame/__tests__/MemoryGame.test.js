import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MemoryGame from '../MemoryGame';

jest.mock('../Components/GameBoard', () => {
  return (props) => {
    return(
      <div data-testid="mock-game-board">
        {props.cards.map((card) => (
          <div 
            key={card.id}
            data-testid={`card-${card.id}`}
            onClick={() => props.updateScore(true)}
        />
        ))}
        {props.chilren}
      </div>
    );
  }
});

describe('MemoryGame component', () => {
  it('renders the MemoryGame with a score', () => {
    render(<MemoryGame />);
    const scoreElement = screen.getByTestId('score');
    expect(scoreElement).toBeInTheDocument();
  });

  it('handles card clicks and updates the score', () => {
    render(<MemoryGame />);
    const cardElement = screen.getByTestId('card-0');
    fireEvent.click(cardElement);
    const scoreElement = screen.getByTestId('score');
    expect(scoreElement.textContent).toBe('1');
  });
});
