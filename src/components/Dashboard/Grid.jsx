import React from 'react';

// Import PropTypes
import PropTypes from 'prop-types';

const Grid = props => {
    return (
        <div className="grid">
            {props.children}
        </div>
    )
}

Grid.propTypes = {
    children: PropTypes.node
}

export default Grid;
