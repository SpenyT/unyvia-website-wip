import { useLanguageContext } from '../LanguageContext';
import '../styles/componentStyles/language-button.css';

import EnglishIcon from "../assets/english-icon.svg?react";
import FrenchIcon from "../assets/french-icon.svg?react";
import { useEffect } from 'react';

function LanguageButton() {
    const { language, registerLanguage } = useLanguageContext();
    
    const handleLanguageToggle = () => {
        const nextLang = language.language === 'en' ? 'fr' : 'en';
        registerLanguage({language: nextLang});
    }

    useEffect(() => {
        console.log("Language: ", language.language);
    }, [language]);
    
    
    return (
        // <div className="language">
        //     <span className="language_toggle-wrap">
        //         <input id="language" onClick={handleLanguageToggle} className="language_toggle" type="checkbox" role="switch" name="language" value={language.language}/>
        //         {
        //             language.language === "en" ? 
        //             <EnglishIcon /> 
        //             :<FrenchIcon />
        //         }
        //     </span>
        // </div>
        <div className="language-toggle-wrapper">
            <div className="language-toggle" onClick={handleLanguageToggle}>
                <div className="language-icon" data-theme={language.language}>
                    { language.language === "en" ?  <EnglishIcon /> : <FrenchIcon /> }
                </div>
                { language.language === "en" ?  "En" : "Fr"}
            </div>
        </div>
       
    ); 
}

export default LanguageButton;