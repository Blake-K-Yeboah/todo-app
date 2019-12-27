import React from 'react';

// Import sass file
import './App.scss';

// Import React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import Pages
import Home from './components/pages/Home';

import LoginPage from './components/pages/LoginPage';

import TodoPage from './components/pages/TodoPage';

import NotFound from './components/pages/NotFound';

import AdminPage from './components/pages/AdminPage';

// Import Routes
import { home, login, todos, admin } from './constants/routes';

const App = () => {

  // TODO: Make Website responsive

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path={home} component={Home} />

          <Route exact path={login} component={LoginPage} />

          <Route exact path={todos} component={TodoPage} />

          <Route exact path={admin} component={AdminPage} />

          <Route component={NotFound} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
