import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav_inicio": "Home",
            "nav_peliculas": "Movies",
            "nav_series": "Series",
            "nav_mi_lista": "My List",
            "hero_play": "Play",
            "hero_info": "More Info",
            "row_trending_week": "Trending of the week",
            "row_popular": "Popular",
            "row_most_viewed": "Most Viewed",
            "login_header": "Sign In",
            "login_new": "New to Vellix?",
            "login_register": "Sign up now",
            "register_header": "Sign Up",
            "auth_email": "Email",
            "auth_password": "Password",
            "auth_name": "Name",
            "auth_submit": "Submit",
            "auth_enter": "Enter",
            "auth_register": "Sign Up",
            "auth_login": "Sign In",
            "auth_got_account": "Already have an account?",
            "auth_no_account": "New to Vellix?",
            "movie_genres": "Genres",
            "movie_votes": "Votes",
            "movie_runtime": "Runtime",
            "loading": "Loading...",
            "error": "Error",
            "nav_login": "Sign In",
            "nav_register": "Sign Up",
            "nav_settings": "Settings",
            "nav_logout": "Sign Out",
            "nav_novedades": "New",
            "footer_tagline": "The best movies and series, a premium experience for every device.",
            "footer_explore": "Explore",
            "footer_contact": "Contact",
            "footer_rights": "All rights reserved.",
            "footer_privacy": "Privacy Policy",
            "footer_terms": "Terms of Use",
            "row_top_rated": "Top Rated",
            "row_upcoming": "Coming Soon",
            "series_popular": "Popular Series",
            "series_top_rated": "Top Rated Series",
            "series_new": "New Episodes"
        }
    },
    es: {
        translation: {
            "nav_inicio": "Inicio",
            "nav_peliculas": "Películas",
            "nav_series": "Series",
            "nav_mi_lista": "Mi Lista",
            "hero_play": "Reproducir",
            "hero_info": "Más información",
            "row_trending_week": "Tendencias de la semana",
            "row_popular": "Populares",
            "row_most_viewed": "Lo más visto",
            "login_header": "Iniciar Sesión",
            "login_new": "¿Nuevo en Vellix?",
            "login_register": "Regístrate ahora",
            "register_header": "Registro",
            "auth_email": "Email",
            "auth_password": "Contraseña",
            "auth_name": "Nombre",
            "auth_submit": "Enviar",
            "auth_enter": "Entrar",
            "auth_register": "Registrarse",
            "auth_login": "Iniciar Sesión",
            "auth_got_account": "¿Ya tienes cuenta?",
            "auth_no_account": "¿Nuevo en Vellix?",
            "movie_genres": "Géneros",
            "movie_votes": "Votos",
            "movie_runtime": "Duración",
            "loading": "Cargando...",
            "error": "Error",
            "nav_login": "Iniciar Sesión",
            "nav_register": "Registrarse",
            "nav_settings": "Ajustes",
            "nav_logout": "Cerrar Sesión",
            "nav_novedades": "Novedades",
            "footer_tagline": "Las mejores películas y series, una experiencia premium en cada dispositivo.",
            "footer_explore": "Explorar",
            "footer_contact": "Contacto",
            "footer_rights": "Todos los derechos reservados.",
            "footer_privacy": "Política de Privacidad",
            "footer_terms": "Términos de Uso",
            "row_top_rated": "Mejor Valoradas",
            "row_upcoming": "Próximamente",
            "series_popular": "Series Populares",
            "series_top_rated": "Series Mejor Valoradas",
            "series_new": "Series al Aire"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "es",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
