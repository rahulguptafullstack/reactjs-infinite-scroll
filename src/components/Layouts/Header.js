import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
    render() {
      return (<div className="main-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to={'/'} className="navbar-brand"></Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/users'} className="nav-link">Users(Infinite Scroll)</Link>
                </li>
              </ul>
            </div>
          </nav>
      </div>);
    }
}
