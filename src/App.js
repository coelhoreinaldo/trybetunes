import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
