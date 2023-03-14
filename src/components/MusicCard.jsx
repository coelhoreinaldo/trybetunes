import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleChangeFavorite = async (song) => {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    return (
      <div>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ () => this.handleChangeFavorite(song) }
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
};

export default MusicCard;
