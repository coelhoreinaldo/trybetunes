import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isFavorite: props.alreadyFavorite || false,
    };
  }

  handleChangeFavorite = ({ target }) => {
    const { name, checked } = target;
    this.setState({ [name]: checked });
  };

  handleClickFetchApi = async (song) => {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  };

  render() {
    const { loading, isFavorite } = this.state;
    const { alreadyFavorite } = this.props;
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    return (
      <div>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="isFavorite"
            checked={ alreadyFavorite || isFavorite }
            onChange={ this.handleChangeFavorite }
            onClick={ () => this.handleClickFetchApi(song) }
          />
        </label>
        { loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  alreadyFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
