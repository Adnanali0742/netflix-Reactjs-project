import React, { Component } from 'react';
import './App'
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import details from './components/MoviesDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/groups' exact={true} component={GroupList}/>
          <Route path='/details' exact={true} component={details}/>
        </Switch>
      </Router>
    )
  }
}

export default App;