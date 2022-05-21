import React from 'react';
import './styleSheets/EvenementCard.css';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const EvenementCard = ({event:{nom,description,date,logo,club}}) => {
    return (
        <div style={{width:"340px",height:"450px"}}>
            <a href="" className="card">
                <img src={logo} className="card__image" alt=""/>
                <div className="card__overlay">
                    <div className="card__header">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img className="card__thumb" src={club.logo} alt=""/>
                        <div className="card__header-text">
                            <h3 className="card__title">{nom}</h3>
                            <span className="card__status"><Moment format='DD/MM/yyyy'>{date}</Moment></span>
                        </div>
                    </div>
                    <p className="card__description">{description.length<100?description:description.slice(0,100)+"..."}</p>
                </div>
            </a>
        </div>
    );
};

EvenementCard.propTypes = {
    event: PropTypes.object.isRequired
};

export default EvenementCard;