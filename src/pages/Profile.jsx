import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const userInfos = await getUser();
    this.setState({ userInfo: userInfos, loading: false });
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
        <img src={ userInfo.img } alt={ userInfo.name } data-testid="profile-image" />
        <p>{userInfo.description}</p>
        {loading && <Loading />}
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    );
  }
}

export default Profile;
