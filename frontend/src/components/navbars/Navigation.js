/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect }  from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Navigation = () => {
    const { getToken, loadUser } = useContext(GlobalContext);

    const token = getToken();
    
    useEffect(() => {
        token && loadUser();
        // eslint-disable-next-line
      }, []);

    
    return (
        <div />
    )
}
