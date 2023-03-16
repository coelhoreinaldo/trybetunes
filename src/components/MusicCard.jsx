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
    const { handleRemoveFavorite } = this.props;
    const { isFavorite } = this.state;
    this.setState({ loading: true });
    if (isFavorite) {
      this.setState({ isFavorite: false });
      await removeSong(song);
      if (handleRemoveFavorite) handleRemoveFavorite();
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
      <section className="track-player">
        <div>
          <h2 className="song-name">{trackName}</h2>
          <div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label className="favorite-checkbox">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name="isFavorite"
                onChange={ () => this.handleChangeFavorite(song) }
                checked={ isFavorite }
              />
              <ion-icon name="heart" />
            </label>
          </div>
          {loading && <Loading />}
        </div>
      </section>
    );
  }
}
MusicCard.defaultProps = {
  handleRemoveFavorite: null,
};

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  handleRemoveFavorite: PropTypes.func,
};

export default MusicCard;
