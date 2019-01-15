import React from 'react';
import {Link} from 'react-router-dom'

export const Footer = () => {
    return (
        <div>
            <footer id='footer'>

                <img src="/img/credit-cards-accepted.jpg" id="credit cards" height={50} />

                <Link to="about-the-developers" id="aboutUs">
                    <h4> About The Developers</h4>
                </Link>

            </footer>
        </div>
    )
}