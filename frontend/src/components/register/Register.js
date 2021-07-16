import React from 'react';

import RegisterForm from './RegisterForm';

const Register = () => {
    return (
        <>
        <div className="row">
            <div className="col pe-0 ps-4">
            <div className="header d-flex justify-content-center py-5">
                <h1 className="text-center mb-3">Register</h1>
            </div>
            <RegisterForm />
            </div>
        </div>
        </>
    )
}

export default Register;