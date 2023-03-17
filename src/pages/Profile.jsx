import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Topbar from '../components/Topbar';
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
      <main data-testid="page-profile">
        <Header />
        <div className="right-content">
          <Topbar>
            <h1>Profile</h1>
          </Topbar>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <img src={ userInfo.image } alt={ userInfo.name } data-testid="profile-image" />
          <p>{userInfo.description}</p>
          {loading && <Loading />}
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      </main>
    );
  }
}

export default Profile;
