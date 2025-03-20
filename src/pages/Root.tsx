import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { I18nextProvider } from 'react-i18next';

import i18n from '../utils/context/i18n.ts';

export default function Root() {

    return(
        <I18nextProvider i18n={i18n}>
            <Navbar />
            <Outlet />
        </I18nextProvider>
    );
}