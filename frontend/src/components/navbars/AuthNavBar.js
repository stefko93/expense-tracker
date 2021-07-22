import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavBar = () => {
    return (
      <header className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
      <Link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">Expense tracker</Link>
      <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
      </button>
</header>
    )
}

export default AuthNavBar;