import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Topbar from '../components/Topbar';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      imageInput: '',
      emailInput: '',
      descriptionInput: '',
      loading: false,
      isDisabled: true,
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
    this.setState({ [name]: value }, this.validateFields);
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  validateFields = () => {
    const { nameInput, imageInput, emailInput, descriptionInput } = this.state;
    const states = [nameInput, imageInput, emailInput, descriptionInput];
    if (states.some((field) => field.length < 1)) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  handleUpdateUser = async () => {
    const { history } = this.props;
    const { nameInput, emailInput, imageInput, descriptionInput } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descriptionInput,
    });
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { loading, nameInput, imageInput,
      emailInput, descriptionInput, isDisabled } = this.state;
    return (
      <main data-testid="page-profile-edit" className="profile-edit-page">
        <Header />
        <form className="right-content" onSubmit={ this.handleSubmit }>
          <Topbar>
            <h1>Editar perfil</h1>
            <img src={ imageInput } alt={ nameInput } className="user-image" />
          </Topbar>
          <fieldset className="profile-edit-inputs">
            <label htmlFor="nameInput">
              <b>Diga-nos seu nome.</b>
              <input
                className="edit-input-field"
                type="text"
                name="nameInput"
                value={ nameInput }
                id="nameInput"
                onChange={ this.handleChange }
                data-testid="edit-input-name"
                placeholder="Diga-nos seu nome"
                maxLength="20"
                required
              />
            </label>
            <label htmlFor="emailInput">
              <b>Qual o seu email?</b>
              <input
                className="edit-input-field"
                type="email"
                name="emailInput"
                value={ emailInput }
                id="emailInput"
                onChange={ this.handleChange }
                data-testid="edit-input-email"
                placeholder="Qual o seu email?"
              />
            </label>
            <label htmlFor="descriptionInput">
              <b>Escreva sobre você...</b>
              <textarea
                className="edit-input-field"
                type="text"
                name="descriptionInput"
                value={ descriptionInput }
                id="descriptionInput"
                onChange={ this.handleChange }
                data-testid="edit-input-description"
                placeholder="Escreva sobre você..."
                rows="4"
                maxLength="326"
              />
            </label>
            <b>Cole a URL de uma imagem.</b>
            <label htmlFor="imageInput">
              <input
                className="edit-input-field"
                type="text"
                name="imageInput"
                value={ imageInput }
                id="imageInput"
                onChange={ this.handleChange }
                data-testid="edit-input-image"
                placeholder="URL de uma imagem"
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleUpdateUser }
            >
              Salvar

            </button>
            {loading && <Loading />}
          </fieldset>
        </form>
      </main>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
