import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../LanguageContext';

import LogoName from './LogoName';

import '../styles/componentStyles/navbar.css';
import LanguageButton from './LanguageButtons';

export default function Navbar() {
    const { language } = useLanguageContext();

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="logo"><LogoName /></div>
                <div className="right-side">
                    <LanguageButton />
                    <Link className="takeme-button-container" to="/contact-us">
                        <div className="takeme-button">{language.language === 'en' ? "Contact Us" : "Rejoingnez Nous"}</div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}