import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found" data-testid="page-not-found">
        <h1>
          Ops!
        </h1>
        <h2>
          A página que você
          está procurando
          não foi encontrada.
        </h2>
      </div>
    );
  }
}

export default NotFound;
