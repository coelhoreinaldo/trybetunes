import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Topbar from '../components/Topbar';
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

  getFavoriteSongs = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favoriteSongs: response, loading: false });
  };

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <main data-testid="page-favorites" className="page-favorites">
        <Header />
        <div className="right-content">
          <Topbar>
            <h1>Favoritas</h1>
          </Topbar>
          <section className="song-list">
            {favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                handleRemoveFavorite={ this.getFavoriteSongs }
                // artistName={ song.artistName }
              />
            ))}
            {loading && <Loading />}
          </section>
        </div>
      </main>
    );
  }
}

export default Favorites;
