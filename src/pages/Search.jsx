import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import RenderizeAlbum from '../components/RenderizeAlbum';

class Search extends Component {
  render() {
    const { handleChange, isDisabled, searchArtistInput, searchArtistBtn,
      loading, searchResult } = this.props;
    const RESULTS_FOUND = `Resultado de álbuns de: ${searchArtistInput}`;
    const NOT_FOUND = 'Nenhum álbum foi encontrado';
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
            onClick={ searchArtistBtn }
          >
            Pesquisar
          </button>
          {loading && <Loading />}
          {
            searchResult.length > 0 ? <p>{RESULTS_FOUND}</p> : <p>{NOT_FOUND}</p>
          }
          {searchResult.map((album) => (<RenderizeAlbum
            searchResult={ album }
            key={ album.artistId }
          />))}
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  searchArtistInput: PropTypes.string.isRequired,
  searchArtistBtn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
