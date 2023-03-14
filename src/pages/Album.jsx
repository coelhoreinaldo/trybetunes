import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      songs: [],
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusicApi();
    this.getSavedFavoriteSongs();
  }

  getSavedFavoriteSongs = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs: response });
  };

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
    });
    this.setState({
      songs: response,
    });
  };

  render() {
    const { songs, artistName, collectionName, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        <section>
          {
            songs.filter((_song, index) => index !== 0)
              .map((song) => (<MusicCard
                key={ song.trackId }
                song={ song }
                alreadyFavorite={ favoriteSongs
                  .some((favoriteSong) => favoriteSong.trackId === song.trackId) }
              />))
          }
        </section>
        {loading && <Loading />}
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
