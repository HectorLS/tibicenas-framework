import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './Nav';

// Page components
import Home  from './pages/Home';
import Blog  from './pages/Blog';
import About from './pages/About';

class App extends Component {
  render(){
    return(
      <Router>
        <div className='app-wrapper'>
          <Nav />
          {/* <header role='banner'>
            <img src='public/assets/img/logo--tibicenas-design.svg' id='logo' alt='Logo Tibicenas Design'/>
            <div className='title-wrapper'>
              <h2>{ this.props.slogan }!</h2>
              <p>Imagination is more important than knowledge. Knowledge is limited, imagination encircles the world</p>
            </div>
          </header> */}
          <main>
            <Switch>
              <Route exact path='/'      component={Home} />
              <Route       path='/blog'  component={Blog} />
              <Route       path='/about' component={About} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}


export default App;
