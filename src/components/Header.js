import React, { Component } from 'react';
import '../css/Header.css';
import {Link} from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <div className="header">
            <h1> 
                Parduotuvė
            </h1>
            <div className='nav'>
              <ul>
                <Link to='/' ><li>Bilietai</li></Link>
                <Link to='/orders' ><li>Užsakymai</li></Link>
              </ul>
            </div>
      </div>
    );
  }
}

export default Header;
