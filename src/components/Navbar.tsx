import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

import LogoName from './LogoName';
import GlobeWire from '../assets/globe_wire.svg?react';

import '../styles/componentStyles/navbar.css';

type language = {
    language: string,
    abreviation: string,
}

const languages: language[] = [ {language: "English", abreviation: "en"},
                                { language: "Français", abreviation: "fr" },
                              ]

const LanguageSelect = () => {
    const {i18n} = useTranslation(); 
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

    const handleSvgClick = () => {
        setIsActive(!isActive);
    }

    const handleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    return(
        <div className="language-select-wrapper" ref={buttonRef} onClick={handleSvgClick}>
            <GlobeWire data-theme={isActive ? "active" : ""} id="globewire-icon" />
            <div data-theme={isActive ? "active" : ""} className="language-dropdown" >
            {languages.map((element, index) => (
                <div key={`language#${index}`} className="language-dropdown-item" onClick={() => handleLanguage(element.abreviation)}>
                    {element.language}
                </div>
            ))}
            </div>
        </div>
        
    );
}


export default function Navbar() {
    const { t } = useTranslation();

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="logo"><LogoName /></div>
                <div className="right-side">
                    <LanguageSelect />
                    <Link className="takeme-button-container" to={`/${t("contact-us")}`}>
                        <div className="takeme-button">{t("Contact us")}</div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}