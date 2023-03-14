import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isFavorite: false,
    };
  }

  async componentDidMount() {
    const { song } = this.props;
    const response = await getFavoriteSongs();
    this.setState({
      isFavorite: response.some((favoriteSong) => favoriteSong.trackId === song.trackId),
    });
  }

  handleChangeFavorite = async (song) => {
    const { isFavorite } = this.state;
    this.setState({ loading: true });
    if (isFavorite) {
      this.setState({ isFavorite: false });
      await removeSong(song);
    } else {
      await addSong(song);
      this.setState({ isFavorite: true });
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, isFavorite } = this.state;
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
            onChange={ () => this.handleChangeFavorite(song) }
            checked={ isFavorite }
          />
        </label>
        {loading && <Loading />}
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
