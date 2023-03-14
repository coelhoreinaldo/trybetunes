import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { favoriteSongs } = this.state;
    if (prevState.favoriteSongs.length !== favoriteSongs.length) {
      console.log(prevState.favoriteSongs, 'prevState');
      console.log(favoriteSongs, 'thisState');
    }
  }

  getFavoriteSongs = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favoriteSongs: response, loading: false });
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {favoriteSongs.map((song) => (<MusicCard
          key={song.trackId}
          song={song}
        />))}
        {loading && <Loading />}
      </div>
    );
  }
}

export default Favorites;
