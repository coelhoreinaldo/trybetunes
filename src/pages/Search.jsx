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
      prevSearchArtistInput: '',
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
    this.setState((prevState) => ({
      loading: false,
      searchResult: response,
      searchArtistInput: '',
      prevSearchArtistInput: prevState.searchArtistInput,
    }));
  };

  render() {
    const { isDisabled, searchArtistInput,
      loading, searchResult, prevSearchArtistInput } = this.state;
    const RESULTS_FOUND = `Resultado de álbuns de: ${prevSearchArtistInput}`;
    const NOT_FOUND = 'Nenhum álbum foi encontrado';
    return (
      <main data-testid="page-search" className="search-container">
        <Header />
        <form className="search-form">
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
            searchResult.length <= 0 ? <p>{NOT_FOUND}</p> : <p>{RESULTS_FOUND}</p>
          }
          <div className="albums-search-container">
            {searchResult.map((album, index) => (
              <RenderizeAlbum
                key={ index }
                searchResult={ album }
              />
            ))}
          </div>

        </form>
      </main>
    );
  }
}

export default Search;
