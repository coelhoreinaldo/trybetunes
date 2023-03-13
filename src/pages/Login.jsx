import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isDisabled: true,
    loading: false,
    logado: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { userName } = this.state;
    const MIN_USERNAME_LENGTH = 3;
    if (userName.length >= MIN_USERNAME_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  loginBtn = async (user) => {
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ loading: false, logado: true });
  };

  render() {
    const { isDisabled, userName, loading, logado } = this.state;
    const user = { name: userName };
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label>
            Nome
            <input
              name="userName"
              value={ userName }
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="login-submit-button"
            onClick={ () => this.loginBtn(user) }
          >
            Entrar

          </button>
          {loading && <Loading />}
          {logado && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
