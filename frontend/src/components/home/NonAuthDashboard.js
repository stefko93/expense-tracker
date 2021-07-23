import React from 'react'
import Footer from '../footer/Footer'
import NonAuthNavbar from '../navbars/NonAuthNavbar'

const NonAuthDashboard = () => {
    return (
         <>
            <NonAuthNavbar />
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        
                        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-5 pb-5 mb-5">
                            <h1 className="h1">Golden Mean</h1>
                        </div> 
                    </main>
                </div>  
            </div>
            <Footer />
        </>
    )
}

export default NonAuthDashboard;