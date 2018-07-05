import React, { Component } from 'react';

class Blog extends Component {
  render() {
    return(
      <div className='content-wrapper'>
        <h1>Blogpage</h1>
        {this.props.title}
      </div>
    );
  }
}

export default Blog;
