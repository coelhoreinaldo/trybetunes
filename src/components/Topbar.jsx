import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Topbar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="top-bar">
        {children}
      </div>
    );
  }
}

export default Topbar;

Topbar.propTypes = {
  children: PropTypes.node.isRequired,
};
