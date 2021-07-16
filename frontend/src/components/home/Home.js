import React from 'react';

import Footer from '../footer/Footer';

export default function Home() {

  return (
    <div className="home">
      <div className="row vh-100">
        <div className="col pe-0 ps-4">
          <div className="header d-flex justify-content-center align-items-center py-5">
            <div>
              <h1 className="text-center mb-5">Golden Mean</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}