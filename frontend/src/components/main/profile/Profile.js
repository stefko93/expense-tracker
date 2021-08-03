/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import AuthNavBar from '../../navbars/AuthNavBar';
import SideBar from '../../utils/SideBar';
import Avatar from './Avatar';
import ProfilForm from './ProfilForm';


export default function Profile() {
    return (
        <>
            <AuthNavBar />
            <div className='container-fluid'>
                <div className="row">
                    <SideBar />

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className="" /></div><div className="chartjs-size-monitor-shrink"><div className="" /></div></div>
                        
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Profile</h1>
                        </div>

                        
                        <Avatar />
                        <ProfilForm />

                        
                    </main>
                </div>
            </div>
        </>
    )
}
