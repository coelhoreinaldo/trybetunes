import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      songs: [],
      loading: false,
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
      artworkUrl100: response[0].artworkUrl100,
      songs: response.filter((_song, index) => index !== 0),
    });
  };

  render() {
    const { songs, artistName, collectionName, artworkUrl100, loading } = this.state;
    return (
      <main data-testid="page-album" className="page-album">
        <Header />
        <div className="right-content">
          <section className="top-bar">
            <img
              className="album-artwork"
              src={ artworkUrl100 }
              alt={ collectionName }
            />
            <div className="artist-album">
              <h2 data-testid="album-name" className="album-name">{collectionName}</h2>
              <h1 data-testid="artist-name" className="artist-name">{artistName}</h1>
            </div>
          </section>
          <section className="song-list">
            {
              songs.map((song) => (<MusicCard
                key={ song.trackId }
                song={ song }
              />))
            }
          </section>

          {loading && <Loading />}
        </div>

      </main>
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
