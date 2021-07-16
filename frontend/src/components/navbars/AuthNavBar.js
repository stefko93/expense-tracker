import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavBar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand" to="/">Expense tracker</Link>
      </div>
    </nav>
    )
}

export default AuthNavBar;