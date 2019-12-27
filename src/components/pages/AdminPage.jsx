import React, { useEffect } from 'react'

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import Page Components
import Dashboard from '../Dashboard/Dashboard';
import Account from '../Account';

let AdminPage = () => {

    // Redirect To Login if the user isn't myself
    useEffect(() => {

        if (appStore.userID !== 'dMPyiPbKLLYXybNm08Ft5zxzpVk2') {
            window.location = '/login';
        }

    }, []);

    return (
        <div className="container">

            <Account todos={true} />

            <Dashboard />

        </div>
    )
}

// Set component to observer so it has access to mobx store
AdminPage = observer(AdminPage);

// Export The Component
export default AdminPage;
