import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

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
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Editar Perfil</h1>
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
              type="email"
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
            disabled={ isDisabled }
            onClick={ this.handleUpdateUser }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
