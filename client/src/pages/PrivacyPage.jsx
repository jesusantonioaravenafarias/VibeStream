import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './LegalPages.css';

const PrivacyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <Navbar />
            <div className="legal-content">
                <h1>Política de Privacidad</h1>
                <p>Última actualización: 21 de Enero, 2026</p>

                <section>
                    <h2>1. Introducción</h2>
                    <p>Bienvenido a Vellix. Nos comprometemos a proteger su privacidad y sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos y compartimos su información cuando utiliza nuestra plataforma.</p>
                </section>

                <section>
                    <h2>2. Información que recopilamos</h2>
                    <p>Podemos recopilar la siguiente información:</p>
                    <ul>
                        <li>Información de cuenta: Nombre, dirección de correo electrónico y contraseña.</li>
                        <li>Datos de uso: Historial de visualización, preferencias de contenido e interacciones con la plataforma.</li>
                        <li>Información técnica: Dirección IP, tipo de dispositivo y navegador.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Uso de la información</h2>
                    <p>Utilizamos su información para:</p>
                    <ul>
                        <li>Proporcionar y mejorar nuestros servicios de streaming.</li>
                        <li>Personalizar su experiencia y recomendar contenido.</li>
                        <li>Enviar comunicaciones importantes sobre su cuenta.</li>
                        <li>Detectar y prevenir fraudes o abusos.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Compartir información</h2>
                    <p>No vendemos sus datos personales a terceros. Solo compartimos información con proveedores de servicios que nos ayudan a operar la plataforma (por ejemplo, procesamiento de pagos o alojamiento en la nube), bajo estrictos acuerdos de confidencialidad.</p>
                </section>

                <section>
                    <h2>5. Seguridad</h2>
                    <p>Implementamos medidas de seguridad robustas para proteger sus datos. Sin embargo, ninguna transmisión por Internet es 100% segura, por lo que no podemos garantizar seguridad absoluta.</p>
                </section>

                <section>
                    <h2>6. Contacto</h2>
                    <p>Si tiene preguntas sobre esta política, contáctenos en: <a href="mailto:vellixoficial@gmail.com">vellixoficial@gmail.com</a></p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPage;
