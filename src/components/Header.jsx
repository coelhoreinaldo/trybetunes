import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userInfo: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({ userInfo: response, loading: false });
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link data-testid="link-to-search" to="/search">
            Pesquisar
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favoritas
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Perfil
          </Link>
          <h1 data-testid="header-user-name">{userInfo.name}</h1>
          {loading && <Loading />}
        </nav>
      </header>
    );
  }
}

export default Header;
