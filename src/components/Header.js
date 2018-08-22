import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ routes }) => (
    <div className="header container">
        <nav className="nav">
            <ul className="nav_list">
                {routes.map(route =>
                    <li className="nav_item" key={route.name}>
                        {route.to && <Link to={route.to}>{route.name}</Link>}
                        {route.action && <Link to="" onClick={route.action}>{route.name}</Link>}
                    </li>
                )}
            </ul>
        </nav>
    </div>
);

export default Header;