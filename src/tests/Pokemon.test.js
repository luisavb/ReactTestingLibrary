import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

// Pikachu, Charmander, Ekans, Alakazam
// Electric, Fire, Poison, Psychic
// 25, 4, 23, 65

const alakazam = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
};

// const teste = { 25: false, 4: true, 23: false, 65: true };

describe('este o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ alakazam }
    />);
    const name = screen.getAllByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    expect(name[0]).toHaveTextContent('Alakazam');
    expect(type).toHaveTextContent('Psychic');
    expect(weight).toHaveTextContent('Average weight: 48.0 kg');
    const img = screen.getByAltText('Alakazam sprite');
    expect(img).toContainHTML('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
  });

  it('Teste se um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ alakazam }
    />);
    const detailsLink = screen.getByRole('link', { to: 'pokemons/65' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Teste se é feito o redirecionamento para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite
      pokemon={ alakazam }
    />);
    const detailsLink = screen.getByRole('link', { to: 'pokemons/65' });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/65');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ alakazam }
    />);
    const fav = screen.getByAltText('Alakazam is marked as favorite');
    expect(fav).toContainHTML('/star-icon.svg');
  });
});
