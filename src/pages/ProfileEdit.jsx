import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      nameInput: '',
      imageInput: '',
      emailInput: '',
      descriptionInput: '',
    };
  }

  componentDidMount() {
    this.getUserInfoXD();
  }

  getUserInfoXD = async () => {
    this.setState({ loading: true });
    const userInfos = await getUser();
    this.setState({
      nameInput: userInfos.name,
      imageInput: userInfos.image,
      emailInput: userInfos.email,
      descriptionInput: userInfos.description,
      loading: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { loading, nameInput, imageInput, emailInput, descriptionInput } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Profile Edit</h1>
        {loading && <Loading />}
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="nameInput">
            <input
              type="text"
              name="nameInput"
              value={ nameInput }
              id="nameInput"
              onChange={ this.handleChange }
              data-testid="edit-input-name"
              placeholder="nome"
            />
          </label>
          <label htmlFor="emailInput">
            <input
              type="text"
              name="emailInput"
              value={ emailInput }
              id="emailInput"
              onChange={ this.handleChange }
              data-testid="edit-input-email"
              placeholder="email"
            />
          </label>
          <label htmlFor="descriptionInput">
            <input
              type="text"
              name="descriptionInput"
              value={ descriptionInput }
              id="descriptionInput"
              onChange={ this.handleChange }
              data-testid="edit-input-description"
              placeholder="descrição"
            />
          </label>
          <label htmlFor="imageInput">
            <input
              type="text"
              name="imageInput"
              value={ imageInput }
              id="imageInput"
              onChange={ this.handleChange }
              data-testid="edit-input-image"
              placeholder="imagem"
            />
          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
