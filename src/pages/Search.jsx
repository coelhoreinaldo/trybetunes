import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import RenderizeAlbum from '../components/RenderizeAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isDisabled: true,
      searchArtistInput: '',
      searchResult: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { searchArtistInput } = this.state;
    const MIN_ARTIST_LENGTH = 2;
    const searchArtistLength = searchArtistInput.length >= MIN_ARTIST_LENGTH;
    if (searchArtistLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  searchArtistBtn = async () => {
    const { searchArtistInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(searchArtistInput);
    this.setState({
      // searchArtistInput: '',
      loading: false,
      searchResult: response });
  };

  render() {
    const { isDisabled, searchArtistInput,
      loading, searchResult } = this.state;
    const RESULTS_FOUND = `Resultado de álbuns de: ${searchArtistInput}`;
    const NOT_FOUND = 'Nenhum álbum foi encontrado';
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="searchArtistInput"
              value={ searchArtistInput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.searchArtistBtn }
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

// Search.propTypes = {
//   searchResult: PropTypes.arrayOf(PropTypes.shape({
//     artistId: PropTypes.number.isRequired,
//     artistName: PropTypes.string.isRequired,
//     collectionId: PropTypes.number.isRequired,
//     collectionName: PropTypes.string.isRequired,
//     collectionPrice: PropTypes.number.isRequired,
//     artworkUrl100: PropTypes.string.isRequired,
//     releaseDate: PropTypes.string.isRequired,
//     trackCount: PropTypes.number.isRequired,
//   })).isRequired,
//   handleChange: PropTypes.func.isRequired,
//   isDisabled: PropTypes.bool.isRequired,
//   searchArtistInput: PropTypes.string.isRequired,
//   searchArtistBtn: PropTypes.func.isRequired,
//   loading: PropTypes.bool.isRequired,
// };

export default Search;
