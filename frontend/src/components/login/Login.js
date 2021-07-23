import React from 'react';

import NonAuthNavbar from '../navbars/NonAuthNavbar';
import LoginForm from './LoginForm';
import Footer from '../footer/Footer';

const Login = () => {
    return (
        <>
        <NonAuthNavbar />
        <div className="row container-fluid">
            <div className="col pe-0 ps-3">
            <div className="header d-flex justify-content-center py-3">
                <h2 className="text-center mb-3">Login</h2>
            </div>
            <LoginForm />
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Login;
    
    

    
    
        
      
    
