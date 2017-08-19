import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './Nav';

class App extends Component {
  render(){
    return(
      <Router>
        <div className='app-wrapper'>
          <header role='banner'>
            <img src='public/assets/img/logo--tibicenas-design.svg' id='logo' alt='Logo Tibicenas Design'/>
            <div className='title-wrapper'>
              <h2>{ this.props.slogan }!</h2>
              <p>Imagination is more important than knowledge. Knowledge is limited, imagination encircles the world</p>
            </div>
          </header>
          <main>
            <Switch>

            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}


export default App;
