import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../LanguageContext';

import LogoName from './LogoName';
import GlobeWire from '../assets/globe_wire.svg?react';
import UkFlag from '../assets/uk_flag.svg?react';
import FranceFlag from '../assets/france_flag.svg?react';


import '../styles/componentStyles/navbar.css';

type language = {
    language: string,
    abreviation: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}



const languages:language[] = [
    { language: "English", abreviation: "en", Icon: UkFlag },
    { language: "Français", abreviation: "fr", Icon: FranceFlag },
]

const LanguageSelect = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setIsActive(false);
                console.log("offside clicked");
            }
        }

        window.addEventListener('click', handleClickOutside);

        return () => {window.removeEventListener('click', handleClickOutside)};
    }, [isActive]);

    const handleSvgClick = () => {
        setIsActive(!isActive);
    }

    return(
        <div className="language-select-wrapper" ref={buttonRef} onClick={handleSvgClick}>
            <GlobeWire data-theme={isActive ? "active" : ""} id="globewire-icon" />
            <div data-theme={isActive ? "active" : ""} className="language-dropdown" >
            {languages.map((element, index) => (
                <>
                    <element.Icon className="language-icon" id={`${element.abreviation}-icon`}/>
                    <span className="language-text">{element.language}</span>
                </>
            ))}
            </div>
        </div>
        
    );
}


export default function Navbar() {
    const { language, registerLanguage, validateSupportedLanguage } = useLanguageContext();

    const handleLanguageSelect = (selectedLanguage : string) => {
        if(validateSupportedLanguage(selectedLanguage) && selectedLanguage != language.language)
        {
            registerLanguage({language: selectedLanguage});
        }
    }

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