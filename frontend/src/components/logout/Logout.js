import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';

const Logout = () => {
    const { logoutUser } = useContext(GlobalContext);

    useEffect(() => {
        logoutUser();
        return <Redirect to="/login" />;
    }, []);

    return null;
}

export default Logout;