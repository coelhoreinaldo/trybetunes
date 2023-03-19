import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './styles/reset.css';
import './styles/Search.css';
import './styles/Login.css';
import './styles/variables.css';
import './styles/Header.css';
import './styles/App.css';
import './styles/Album.css';
import './styles/Favorites.css';
import './styles/Profile.css';
import './styles/ProfileEdit.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route
          exact
          path="/search"
          component={ Search }
        />
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route exact component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
