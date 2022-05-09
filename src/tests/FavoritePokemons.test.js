import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste componente FavoritePokemon.js', () => {
  it('Teste se é exibida "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
//   it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
//     renderWithRouter(<FavoritePokemons />);
//     const favorites = screen.getByTestId('pokemon-name');
//     expect(favorites).toBeInTheDocument();
//   });
});
