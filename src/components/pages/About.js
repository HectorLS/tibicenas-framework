import React, { Component } from 'react';

class About extends Component {
  render() {
    return(
      <div className='content-wrapper'>
        <h1>Aboutpage</h1>
        {this.props.title}
      </div>
    );
  }
}

export default About;
