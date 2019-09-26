import React from 'react';
import { Link } from 'react-router-dom';

export class Footer extends React.Component {
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            © <a target="_blanck" href="http://teamofdevelopers.com/">teamofdevelopers.com</a>
            </div>
          </nav>
      );
    }
}