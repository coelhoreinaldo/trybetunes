import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// import RenderizeAlbum from '../components/RenderizeAlbum';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      songs: [],
    };
  }

  componentDidMount() {
    this.fetchMusicApi();
  }

  fetchMusicApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getMusics(id);
    this.setState({
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
      // songs: onlySongs,
    });
    response.shift();
    this.setState({
      songs: response,
    });
  };

  render() {
    const { songs, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        <section>
          {
            songs.map((song) => (
              <div key={ song.trackId } />
            ))
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
