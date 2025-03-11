import React from "react";
import { Link } from 'react-router-dom';

import '../styles/componentStyles/logo-name.css';

import LogoSphereFull from '../assets/unyvia-sphere-full.svg?react';
import LogoOuterRing from '../assets/unyvia-outer-ring.svg?react';
import LogoInnerRing from '../assets/unyvia-inner-ring.svg?react';


const LogoName = React.memo(() => {
    return (
        <Link className="logo-box" to="/">
            <div className="logo-container">
                <LogoSphereFull className="unyvia-sphere" />
                <LogoOuterRing className="logo-outer-ring"/>
                <LogoInnerRing className="logo-inner-ring" />
            </div>
            <h2>UNYVIA</h2>
        </Link>
    );
});

export default LogoName;