import React from 'react';
import {Link} from 'react-router';

export default () => {
    return (
        <ul className="nav nav-tabs">
            <li role="presentation" className="active"><Link to="/">Home</Link></li>
            <li role="presentation"><Link to="/signup">Signup</Link></li>
            <li role="presentation"><Link to="#">Messages</Link></li>
        </ul>
    );
}