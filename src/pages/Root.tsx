import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

import { LanguageContextProvider } from '../utils/context/LanguageContext.tsx';

export default function Root() {

    return(
        <LanguageContextProvider>
            <Navbar />
            <Outlet />
        </LanguageContextProvider>
    );
}