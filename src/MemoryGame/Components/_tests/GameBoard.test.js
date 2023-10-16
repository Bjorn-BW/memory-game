import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';

const mockSetCards = jest.fn();
const mockUpdateScore = jest.fn();

const cardDataUnflipped = { id: 1, isFlipped: false, color: '#ffffff' };
const cardDataFlipped = { id: 2, isFlipped: true, color: '#ffffff' };
const cardListUnflipped = (amount) => {
    let cardList = [];
    for(var i = 0; i < amount; i++){
        cardList.push({ id:i, isFlipped: false, color: '#ffffff'})
    }
    return cardList;
};

describe('GameBoard component', () => {
    describe('With valid cards prop', () => {
        it('should render cards', () => {
            const cards = cardListUnflipped(10);
            render(<GameBoard cards={cards} setCards={mockSetCards} updateScore={mockUpdateScore} />);
        
            const cardElements = screen.getAllByTestId('unflipped-card');
            cardElements.forEach((cardElement) => {
            expect(cardElement).toBeInTheDocument();
            });
        });
    });
    describe('With invalid cards prop', () => {
        it('should not render cards', () => {
            const cards = [];
            render(<GameBoard cards={cards} setCards={mockSetCards} updateScore={mockUpdateScore} />);
        
            const cardElements = screen.queryAllByTestId('unflipped-card');
            expect(cardElements).toHaveLength(0);
        });
    });
});