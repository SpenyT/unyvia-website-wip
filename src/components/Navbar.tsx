import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../utils/context/LanguageContext';

import LogoName from './LogoName';
import GlobeWire from '../assets/globe_wire.svg?react';
import UkFlag from '../assets/uk_flag.svg?react';
import FranceFlag from '../assets/france_flag.svg?react';
import QuebecFlag from '../assets/quebec-flag.svg?react';


import '../styles/componentStyles/navbar.css';

type language = {
    language: string,
    abreviation: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const LanguageSelect = () => {
    const { language, country, registerLanguage, validateSupportedLanguage } = useLanguageContext(); 
    const [isActive, setIsActive] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setIsActive(false);
            }
        }

        window.addEventListener('click', handleClickOutside);

        return () => {window.removeEventListener('click', handleClickOutside)};
    }, [isActive]);

    const languages:language[] = [
        { language: "English", abreviation: "en", Icon: UkFlag },
        { language: "Français", abreviation: "fr", Icon: country.countryCode2 === "CA" ? QuebecFlag : FranceFlag },
    ];

    const handleLanguageSelect = (selectedLanguage : string) => {
        if(validateSupportedLanguage(selectedLanguage) && selectedLanguage != language.language)
        {
            registerLanguage({language: selectedLanguage});
        }
        setIsActive(false);
    }
    const handleSvgClick = () => {
        setIsActive(!isActive);
    }

    return(
        <div className="language-select-wrapper" ref={buttonRef} onClick={handleSvgClick}>
            <GlobeWire data-theme={isActive ? "active" : ""} id="globewire-icon" />
            <div data-theme={isActive ? "active" : ""} className="language-dropdown" >
            {languages.map((element, index) => (
                <div key={`languag-dropdown-item${index}`} className="language-dropdown-item" onClick={() => handleLanguageSelect(element.abreviation)}>
                    <div className="icon-container"><element.Icon className="language-icon" id={`${element.abreviation}-icon`}/></div>
                    <div className="language-container"><span>{element.language}</span></div>
                </div>
            ))}
            </div>
        </div>
        
    );
}


export default function Navbar() {
    const { language } = useLanguageContext();

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="logo"><LogoName /></div>
                <div className="right-side">
                    <LanguageSelect />
                    <Link className="takeme-button-container" to="/contact-us">
                        <div className="takeme-button">{language.language === 'en' ? "Contact Us" : "Rejoingnez Nous"}</div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}