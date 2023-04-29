import React from 'react';
import './headerstyle.css';
import logo from '../../media/logos/logo2.png'

const Header = () => {
    return (
        <>
            <section id="header">
                <div id="headerContainer">
                    <img src={logo} alt="Vehicle Genie" className="logo" />
                </div>
            </section>
        </>
    );
};

export default Header;