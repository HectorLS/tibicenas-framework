import React     from 'react';
import ReactDOM  from 'react-dom';


class App extends React.Component {
  render(){
    return(
      <header role='banner'>
        <img src='public/assets/img/logo--tibicenas-design.svg' id='logo' alt='Logo Tibicenas Design'/>
        <div className='title-wrapper'>
          <h2>{ this.props.slogan }!</h2>
          <p>Imagination is more important than knowledge. Knowledge is limited, imagination encircles the world</p>
        </div>
      </header>
    )
  }
}


module.exports = App;
