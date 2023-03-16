import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RenderizeAlbum extends Component {
  render() {
    const { searchResult } = this.props;
    const { artistName, collectionName, artworkUrl100, collectionId } = searchResult;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
        className="link-to-album"
      >
        <div className="albums-search-result">
          <img
            className="collection-artwork"
            src={ artworkUrl100 }
            alt={ collectionName }
          />
          <h3 className="collection-name">{collectionName}</h3>
          <h4 className="artist-name">{artistName}</h4>
        </div>
      </Link>
    );
  }
}

RenderizeAlbum.defaultProps = {
};

RenderizeAlbum.propTypes = {
  searchResult: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default RenderizeAlbum;
