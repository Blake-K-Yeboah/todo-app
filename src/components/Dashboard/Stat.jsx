import React from 'react'

// Import PropTypes 
import PropTypes from 'prop-types';

const Stat = props => {
    return (
        <div className="stat">
            <h1 className="value">{props.value}</h1>
            <h3 className="name">{props.name}</h3>
        </div>
    )
}

Stat.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string
}
export default Stat;
