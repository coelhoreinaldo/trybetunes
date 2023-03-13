import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isDisabled: true,
      searchArtistInput: '',
      searchResult: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  validateFields = () => {
    const { searchArtistInput } = this.state;
    const MIN_ARTIST_LENGTH = 2;
    const searchArtistLength = searchArtistInput.length >= MIN_ARTIST_LENGTH;
    if (searchArtistLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  searchArtistBtn = async () => {
    const { searchArtistInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(searchArtistInput);
    this.setState({
      // searchArtistInput: '',
      loading: false,
      searchResult: response });
  };

  render() {
    const { loading, isDisabled,
      searchArtistInput, searchResult } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route
              exact
              path="/search"
              render={ (props) => (<Search
                { ...props }
                handleChange={ this.handleChange }
                isDisabled={ isDisabled }
                searchArtistInput={ searchArtistInput }
                searchArtistBtn={ this.searchArtistBtn }
                loading={ loading }
                searchResult={ searchResult }
              />) }
            />
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route exact component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
