import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { handleChange, isDisabled, searchArtistInput } = this.props;
    return (
      <div data-testid="page-search">
        <form>
          <label>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="searchArtistInput"
              value={ searchArtistInput }
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  searchArtistInput: PropTypes.string.isRequired,
};

export default Search;
