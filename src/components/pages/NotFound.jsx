import React from 'react';

// Import Navigation Link from react-router-dom
import { NavLink } from 'react-router-dom';

// Import Animation Stuff from react-spring
import { useSpring, animated } from 'react-spring';

const NotFound = () => {

    // Define Page user tried to open
    const page = window.location.pathname.substring(1);

    // Define props for animation
    const props = useSpring({ config: { duration: 1000 }, opacity: 1, from: { opacity: 0 } });

    return (
        <animated.div style={props}>

            <div className="not-found">

                <h1 className="title">404 - Not Found</h1>

                <div className="divider"></div>

                <p className="sub-text">The page {`'${page}'`} cannot be found.</p>

                <br />

                <NavLink to="/" className='link'>Redirect to Home</NavLink>

            </div>

        </animated.div>
    )
}

// Export The Component
export default NotFound
