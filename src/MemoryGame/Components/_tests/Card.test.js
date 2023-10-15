import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Card from '../Card';

const mockOnCardClicked = jest.fn();

const cardDataUnFlipped = {
  id: 1,
  color: '#00ff00',
  isFlipped: false,
};
const cardDataFlipped = {
    id: 1,
    color: '#00ff00',
    isFlipped: true,
  };

describe('Card component', () => {
    it('should render an unflipped card with card-outer class', () => {
        render(<Card card={cardDataUnFlipped} onCardClicked={mockOnCardClicked} />);

        const cardElement = screen.getByTestId('unflipped-card');
        expect(cardElement).toBeInTheDocument();
        expect(cardElement).toHaveClass('card-outer');
    });
    it('should render a flipped card with card-inner class', () => {
        const flippedCardData = { ...cardDataUnFlipped, isFlipped: true };
        render(<Card card={flippedCardData} onCardClicked={mockOnCardClicked} />);

        const cardElement = screen.getByTestId('flipped-card');
        expect(cardElement).toBeInTheDocument();
        expect(cardElement).toHaveClass('card-inner');
    });
    describe('Card onClick', () => {
        describe('With IsFlipped = false', () => {
            it('should call onCardClicked when clicked', () => {
                render(<Card card={cardDataUnFlipped} onCardClicked={mockOnCardClicked} />);

                const cardElement = screen.getByTestId('unflipped-card');
                fireEvent.click(cardElement);
                expect(mockOnCardClicked).toHaveBeenCalledWith(cardDataUnFlipped);
            });
        });
        describe('With IsFlipped = true', () => {
            it('should not call onCardClicked when clicked', () => {
                render(<Card card={cardDataFlipped} onCardClicked={mockOnCardClicked} />);

                const cardElement = screen.getByTestId('flipped-card');
                fireEvent.click(cardElement);
                expect(mockOnCardClicked).toBeCalledTimes(0);
            });
        });
    });


});
