import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/pageStyles/home.css';


function Home() {
    const {t} = useTranslation()

    return(
        <div className="home">
                <h2>{t("This Page is Under Construction")}</h2>
                <span>{t("We’re working hard to bring you an amazing experience!")}</span>
                <span>{t("Check back soon for updates. If you have any questions, feel free to ")}
                <Link to={`/${t("contact-us")}`}>{t("contact us")}</Link>.</span>
        </div>
    );
}

export default Home;