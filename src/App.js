import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
      logged: false,
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateFields);
  };

  loginBtn = async (user) => {
    this.setState({ loading: true });
    await createUser(user);
    this.setState({ loading: false, logged: true });
  };

  validateFields = () => {
    const { userName } = this.state;
    const MIN_USERNAME_LENGTH = 3;
    if (userName.length >= MIN_USERNAME_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { userName, loading, logged, isDisabled } = this.state;
    const user = { name: userName };

    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route
              exact
              path="/"
              render={ (props) => (<Login
                { ...props }
                userName={ userName }
                loading={ loading }
                logged={ logged }
                loginBtn={ () => this.loginBtn(user) }
                handleChange={ this.handleChange }
                isDisabled={ isDisabled }
              />) }
            />
            <Route exact component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
