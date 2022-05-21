import React from 'react';

import "./styleSheets/AcceuilHeader.css"

const AcceuilHeader = () => {
    return (
        <div id="acceuil-header">
            <h1>Les événements d'ENSAT</h1>
            <p>Sans l'organisation des événements, le parcours d'un ingénieur reste incomplet</p>
            <a href="#events">View Events</a>
        </div>
    );
};

export default AcceuilHeader;