import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{}}>
        <div className="position-sticky pt-3">
        <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/dashboard" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-cash-coin" /></svg>
                            Dashboard
                            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-plus-circle" /></svg>
                            Add
                            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-cash-coin" /></svg>
                            Transactions
                            </Link>
          </li>
          <li className="nav-item">
            <Link to="/incomes" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-droplet-fill" /></svg>
                            Incomes
                            </Link>
          </li>
          <li className="nav-item">
            <Link to="/expenses" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-droplet" /></svg>
                            Expenses
                            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-person-circle" /></svg>
                            Profile
                            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link link-dark">
                            <svg className="bi me-2" width="16" height="16"><i className="bi bi-box-arrow-in-left" /></svg>
                            Logout
                            </Link>
          </li>
        </ul>
      </div>
    </nav>

        // <div>
        //     <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px'}}>
        //         <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        //         <svg className="bi me-2" width="16" height="16"><i class="bi bi-brightness-high"></i></svg>
        //             <span className="fs-4">Golden Mean</span>
        //         </Link>
        //         <hr />
        //             <ul className="nav nav-pills flex-column mb-auto">
        //                 <li>
        //                     <Link to="#" className="nav-link link-dark">
        //                     <svg className="bi me-2" width="16" height="16"><i class="bi bi-cash-coin"></i></svg>
        //                     Transactions
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="#" className="nav-link link-dark">
        //                     <svg className="bi me-2" width="16" height="16"><i class="bi bi-droplet-fill"></i></svg>
        //                     Incomes
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="#" className="nav-link link-dark">
        //                     <svg className="bi me-2" width="16" height="16"><i class="bi bi-droplet"></i></svg>
        //                     Expenses
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="#" className="nav-link link-dark">
        //                     <svg className="bi me-2" width="16" height="16"><i class="bi bi-person-circle"></i></svg>
        //                     Profile
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="#" className="nav-link link-dark">
        //                     <svg className="bi me-2" width="16" height="16"><i class="bi bi-box-arrow-in-left"></i></svg>
        //                     Logout
        //                     </Link>
        //                 </li>
        //             </ul>
        //     </ div>
        // </ div>
    )
}

export default SideBar;

