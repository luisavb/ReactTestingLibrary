import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTextOne = screen
      .queryByText(/One can filter Pokémons /i);
    const aboutTextTwo = screen
      .getByText(/This application simulates/i);
    expect(aboutTextOne).toBeInTheDocument();
    expect(aboutTextTwo).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
