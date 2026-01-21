import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './LegalPages.css';

const TermsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <Navbar />
            <div className="legal-content">
                <h1>Términos de Uso</h1>
                <p>Última actualización: 21 de Enero, 2026</p>

                <section>
                    <h2>1. Aceptación de los Términos</h2>
                    <p>Al acceder o utilizar Vellix, usted acepta estar legalmente vinculado por estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.</p>
                </section>

                <section>
                    <h2>2. Descripción del Servicio</h2>
                    <p>Vellix es una plataforma de streaming que ofrece acceso a una variedad de películas, series y contenido audiovisual. Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento.</p>
                </section>

                <section>
                    <h2>3. Cuentas de Usuario</h2>
                    <p>Para acceder a ciertas funciones, debe crear una cuenta. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.</p>
                </section>

                <section>
                    <h2>4. Propiedad Intelectual</h2>
                    <p>Todo el contenido disponible en Vellix, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de Vellix o de sus licenciantes y está protegido por leyes de derechos de autor.</p>
                </section>

                <section>
                    <h2>5. Uso Prohibido</h2>
                    <p>Usted acepta no utilizar el servicio para fines ilegales, no compartir su cuenta con terceros fuera de su hogar, y no intentar eludir las medidas de seguridad de la plataforma.</p>
                </section>

                <section>
                    <h2>6. Limitación de Responsabilidad</h2>
                    <p>Vellix se proporciona "tal cual". No garantizamos que el servicio será ininterrumpido o libre de errores. En ningún caso Vellix será responsable por daños indirectos o incidentales.</p>
                </section>

                <section>
                    <h2>7. Cambios en los Términos</h2>
                    <p>Podemos  actualizar estos términos ocasionalmente. Le notificaremos sobre cambios significativos publicando los nuevos términos en esta página.</p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TermsPage;
