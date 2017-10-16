import React, { Component } from 'react';

class InputField extends Component {
  render() {
    return(
      <label>
        <input type='text' className={5*4} name='name' placeholder={this.props.placeholder} />
        <hr />
        <span className='title'>{this.props.title}</span>
        <p className='msg'>{this.props.msg}</p>
      </label>
    );
  }
}

export default InputField;
