import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Album extends Component {
  render() {
    const { searchResult } = this.props;
    const { artistName, collectionName, artworkUrl100 } = searchResult;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{collectionName}</h3>
        <h4>{artistName}</h4>
      </div>
    );
  }
}

Album.propTypes = {
  searchResult: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Album;
