import React, { useEffect } from 'react';

// Import Sign up component
import SignUp from '../Forms/SignUp';

// Import Animation Stuff from react-spring
import { useSpring, animated } from 'react-spring';

// Import store
import appStore from '../../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

let Home = () => {

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

            <SignUp />

        </animated.div>
    )
}

// Set component to observer so it has access to mobx store
Home = observer(Home);

// Export The Component
export default Home;
