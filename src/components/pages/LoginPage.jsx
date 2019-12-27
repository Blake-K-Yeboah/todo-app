import React, { useEffect } from 'react';

// Import Login Form
import Login from '../Forms/Login';

// Import Animation Stuff from react-spring
import { useSpring, animated } from 'react-spring';

// Import store
import appStore from '../../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

let LoginPage = () => {

    // Redirect to todos if they are logged in
    useEffect(() => {
        if (appStore.isLoggedIn === 'true') {
            window.location = '/todos';
        }
    }, []);

    // Define props for animation
    const props = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 } });

    return (
        <animated.div style={props}>

            <Login />

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
LoginPage = observer(LoginPage);

// Export The Component
export default LoginPage;
