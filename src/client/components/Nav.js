
import React       from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return(
    <nav role='navigation' className='navbar'>
      <ul className='list--navigation'>
        <li><NavLink exact to='/'        activeClassName='active'>Home</NavLink></li>
        <li><NavLink       to='/blog'    activeClassName='active'>Blog</NavLink></li>
        <li><NavLink exact to='/about'   activeClassName='active'>About</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
