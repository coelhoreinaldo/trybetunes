import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.svg';

class Header extends Component {
  state = {
    userInfo: {},
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
      <header className="header" data-testid="header-component">
        <nav>
          <Link to="/search" className="nav-link" data-testid="link-to-search">
            <ion-icon name="search-outline" />
            <span>Pesquisar</span>
          </Link>
          <Link to="/favorites" className="nav-link" data-testid="link-to-favorites">
            <ion-icon name="star-outline" />
            <span>Favoritas</span>
          </Link>
          <Link to="/profile" className="nav-link" data-testid="link-to-profile">
            <ion-icon className="nav-ion" name="person-outline" />
            <span>Perfil</span>
          </Link>
        </nav>
        <img src={ logo } alt="trybe-logo" />
        <h4 data-testid="header-user-name">{userInfo.name}</h4>
        {loading && <Loading />}
      </header>
    );
  }
}

export default Header;
