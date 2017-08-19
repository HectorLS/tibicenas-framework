
import React       from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return(
    <nav role='navigation'>
      <ul>
        <li><NavLink exact to='/'        activeClassName='active'>Home</NavLink></li>
        <li><NavLink exact to='/doc'     activeClassName='active'>Doc</NavLink></li>
        <li><NavLink       to='/contact' activeClassName='active'>Contact</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
