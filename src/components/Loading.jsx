import React, { Component } from 'react';
// import logo from '../images/logo.svg';
import loading from '../images/loading.svg';

class Loading extends Component {
  render() {
    return (
      // <h4 className="loading-text">Carregando...</h4>
      // <img src={ logo } alt="xd" height="56" className="loading-text" />
      <img src={ loading } alt="xd" height="32" className="loading-text" />
    );
  }
}

export default Loading;
