import React, { Component } from 'react';

class Login extends Component {
  state = {
    userName: '',
    isDisabled: true,
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

  render() {
    const { isDisabled, userName } = this.state;
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
            disabled={ isDisabled }
            data-testid="login-submit-button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
