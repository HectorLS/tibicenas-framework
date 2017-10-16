import React, { Component } from 'react';

import InputField from './Input';

class StyleGuide extends Component {
  render(){
    var inputFieldMessages = [];

    return(
      <section className='section style-guide'>
        <article className='block text'>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>

          <p>Lorem ipsum <span>span</span></p>

          <a href=''>link</a>
          <a href=''>link hover</a>
          <a href=''>link active</a>
          <a href=''>link visited</a>
        </article>
        <article className='block actions'>
          <button className='btn btn--success'>Button success</button>
        </article>
        <article className='block form'>
          <form action='' className='form'>
            <InputField
              title='input title'
              placeholder='placeholder'
              msg={inputFieldMessages}
            />

          </form>
        </article>
      </section>
    )
  }
}

export default StyleGuide;
