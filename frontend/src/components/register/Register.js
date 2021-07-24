import React from 'react';

import NonAuthNavbar from '../navbars/NonAuthNavbar';
import RegisterForm from './RegisterForm';
import Footer from '../footer/Footer';

const Register = () => {
    return (
        <>
            <NonAuthNavbar />
            <div className="row container-fluid">
                <div className="col pe-0 ps-3">
                <div className="header d-flex justify-content-center py-3">
                    <h2 className="text-center mb-3">Register</h2>
                </div>
                <RegisterForm />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register;