/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

// import validator from 'validator';

// import InputFieldSet from '../../utils/InputFieldSet';

import { GlobalContext } from '../../../context/GlobalState';

const ProfilForm = () => {
    const { users, getCurrentUser  } = useContext(GlobalContext);
    
    const currentUser = getCurrentUser();

    return (
        <div className="mt-3 justify-content-between align-items-center text-center">
                <h5 className="text-secondary mt-3 mb-3">Name:</h5>
                <h3 className="mb-3">{currentUser.firstName} {currentUser.lastName}</h3>
                    
                <h5 className="text-secondary mb-3">Email:</h5>
                <h6 className="mb-3">{currentUser.email}</h6>
        </div>
    )
  }

export default ProfilForm;