import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App.js';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Teste das rotas do App.js', () => {
  it('O primeiro link deve possuir o texto Home, e ao ser clicada é redirecionada para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/')
  });
  it('O segundo link deve possuir o texto About, e ao ser clicada é redirecionada para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about')
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons, e ao ser clicada é redirecionada para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites')
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/pagina/que-nao-existe/') });

    const notFoundTitle = screen.getByLabelText('Crying emoji');
    expect(notFoundTitle).toBeInTheDocument();
  });
})



