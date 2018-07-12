import React, { Component } from 'react';

class Home extends Component {
  render() {
    return(
      <div className='content-wrapper'>
        <h1>Homepage</h1>
        {this.props.title}
      </div>
    );
  }
}

export default Home;
