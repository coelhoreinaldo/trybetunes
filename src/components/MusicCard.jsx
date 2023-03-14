import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: false,
  //   };
  // }

  render() {
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
          <input data-testid={ `checkbox-music-${trackId}` } type="checkbox" />
        </label>
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
