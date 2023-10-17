import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders the MemoryGame component within the App component', () => {
  render(<App />);
  const gameBoard = screen.getByTestId('game-board');
  expect(gameBoard).not.toBeNull();
});