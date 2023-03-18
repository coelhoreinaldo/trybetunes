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
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description, loading: false });
  };

  render() {
    const { name, email, image, loading, description } = this.state;
    return (
      <main className="profile-page" data-testid="page-profile">
        <Header />
        <div className="right-content">
          <Topbar>
            <h1>Profile</h1>
            {loading
              ? (<Loading />)
              : (
                <img
                  className="user-image"
                  src={ image }
                  alt={ name }
                  data-testid="profile-image"
                />)}
          </Topbar>
          <p className="user-name">{name}</p>
          <p className="user-email">{email}</p>
          <p className="user-description">{description}</p>

          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      </main>
    );
  }
}

export default Profile;
