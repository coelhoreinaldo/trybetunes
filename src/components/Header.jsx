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
            <span>Pesquisar</span>
            <ion-icon name="search-outline" />
          </Link>
          <Link to="/favorites" className="nav-link" data-testid="link-to-favorites">
            <span>Favoritas</span>
            <ion-icon name="star-outline" />
          </Link>
          <Link to="/profile" className="nav-link" data-testid="link-to-profile">
            <span>Perfil</span>
            <ion-icon className="nav-ion" name="person-outline" />
          </Link>
        </nav>
        <img className="logo" src={ logo } alt="trybe-logo" />
        {loading ? (
          <Loading />
        ) : (
          <div className="header-user-info">
            <h4
              className="header-user-name"
              data-testid="header-user-name"
            >
              {userInfo.name}
              {userInfo.image && <img
                className="header-user-image"
                src={ userInfo.image }
                alt={ userInfo.name }
              /> }

            </h4>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
