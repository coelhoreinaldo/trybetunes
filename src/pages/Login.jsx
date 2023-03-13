import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { userName, loading, logado, isDisabled, handleChange, loginBtn } = this.props;
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
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="login-submit-button"
            onClick={ loginBtn }
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

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logado: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  loginBtn: PropTypes.func.isRequired,
};

export default Login;
