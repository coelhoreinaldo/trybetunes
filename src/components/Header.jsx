import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <Link data-testid="link-to-search" to="/search">
          Pesquisar
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          Favoritas
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
