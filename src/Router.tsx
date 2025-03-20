import { createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
                index: true,
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            },
            {
                path: "/rejoignez-nous",
                element: <ContactUs />,
            },
        ]
    }
]);

export default router;