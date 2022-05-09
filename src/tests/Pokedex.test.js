import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

// Pikachu, Charmander, Ekans, Alakazam
// Electric, Fire, Poison, Psychic
// 25, 4, 23, 65
const pokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
},
{
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
}];

const teste = { 25: false, 4: true, 23: false, 65: true };

describe('Teste componente Pokedex.js', () => {
  it('Teste se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ teste }
      pokemons={ pokemons }
    />);
    const heading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('Teste do (btn de fltr) e próximo pokémon é exibido quando o btn é clicado', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ teste }
      pokemons={ pokemons }
    />);
    const button = screen.getByTestId('next-pokemon', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const pokemonInTheScreen = screen.getByTestId('pokemon-name');

    expect(pokemonInTheScreen).toHaveTextContent('Charmander'); // 2
    userEvent.click(button);
    expect(pokemonInTheScreen).toHaveTextContent('Ekans'); // 3
    userEvent.click(button);
    expect(pokemonInTheScreen).toHaveTextContent('Alakazam'); // 4
    userEvent.click(button);
    expect(pokemonInTheScreen).toHaveTextContent('Pikachu'); // 1

    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType[0]).toHaveTextContent('Electric');
    expect(buttonType[2]).toHaveTextContent('Poison');
    userEvent.click(buttonType[0]);

    expect(pokemonInTheScreen).toHaveTextContent('Pikachu');
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ teste }
      pokemons={ pokemons }
    />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  // it('Teste se a Pokédex tem os botões de filtro', () => {
  //   renderWithRouter(<Pokedex
  //     isPokemonFavoriteById={ teste }
  //     pokemons={ pokemons }
  //   />);
  //   const buttonAll = screen.getByRole('button', { name: 'All' });
  //   expect(buttonAll).toBeInTheDocument();
  //   const buttonType = screen.getAllByTestId('pokemon-type-button');
  //   expect(buttonType[0]).toHaveTextContent('Electric');
  //   expect(buttonType[2]).toHaveTextContent('Poison');
  //   userEvent.click(buttonType[0]);

  //   const pokemonInTheScreen = screen.getByTestId('pokemon-name');
  //   expect(pokemonInTheScreen).toHaveTextContent('Pikachu');
  // });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ teste }
      pokemons={ pokemons }
    />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const button = screen.getByTestId('next-pokemon', { name: 'Próximo pokémon' });
    expect(button).toBeEnabled();
  });
});
