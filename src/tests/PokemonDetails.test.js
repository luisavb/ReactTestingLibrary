import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import { updateFavoritePokemons } from '../services/pokedexService';

// Pikachu, Charmander, Ekans, Alakazam
// Electric, Fire, Poison, Psychic
// 25, 4, 23, 65

const pokemons = [{
  id: 23,
  name: 'Ekans',
  type: 'Poison',
  averageWeight: {
    value: '6.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Goldenrod Game Corner',
      map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
    },
  ],
  summary: 'It can freely detach its jaw to swallow large prey whole.',
},
{
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
  summary: 'Closing both its eyes heightens all its other senses.',
},
{
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary: 'At full gallop, its four hooves barely touch the ground',
}];

const teste = { 25: false, 4: true, 23: false, 65: true };

const match = { params: { id: '78' } };

describe('Teste o componente PokemonDetails.js', () => {
  it('Teste se as informações do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ teste }
      match={ match }
      onUpdateFavoritePokemons={ updateFavoritePokemons('78', true) }
      pokemons={ pokemons }
    />);
    const name = screen.getByRole('heading', { level: 2, name: 'Rapidash Details' });
    expect(name).toBeInTheDocument();
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const summaryP = screen.queryByText(/its four hooves barely touch/i);
    expect(summaryP).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ teste }
      match={ match }
      onUpdateFavoritePokemons={ updateFavoritePokemons('78', true) }
      pokemons={ pokemons }
    />);
    const locationTitle = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Rapidash' });
    expect(locationTitle).toBeInTheDocument();
    const locations = screen.getAllByAltText('Rapidash location');
    expect(locations.length).toBe(2);
    expect(locations[0]).toContainHTML('https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png');
    const location2Name = screen.queryByText(/Johto Mount Silver/i);
    expect(location2Name).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ teste }
      match={ match }
      onUpdateFavoritePokemons={ () => updateFavoritePokemons('78', true) }
      pokemons={ pokemons }
    />);
    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();
    userEvent.click(favCheckbox);
    expect(favCheckbox).not.toBeChecked();
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
