import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  it('Teste se a página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen
      .getByRole('heading', { level: 2, name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
//   it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
//     renderWithRouter(<FavoritePokemons />);
//     const favorites = screen.getByTestId('pokemon-name');
//     expect(favorites).toBeInTheDocument();
//   });
});
