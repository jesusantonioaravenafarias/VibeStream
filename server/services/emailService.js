const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from: `"Vellix Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Código de Verificación - Vellix',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border-radius: 10px; border: 1px solid #8a2be2;">
                <h1 style="color: #8a2be2; text-align: center;">Vellix</h1>
                <p style="font-size: 1.1rem;">Hola,</p>
                <p>Tu código de verificación para registrarte en Vellix es:</p>
                <div style="background-color: #111; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <span style="font-size: 2.5rem; font-weight: bold; letter-spacing: 10px; color: #8a2be2;">${code}</span>
                </div>
                <p>Este código expirará en 15 minutos.</p>
                <p>Si no solicitaste este código, por favor ignora este correo.</p>
                <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
                <p style="font-size: 0.8rem; color: #777; text-align: center;">&copy; 2026 Vellix. Todos los derechos reservados.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        // Fallback for development if no credentials provided
        if (!process.env.EMAIL_USER) {
            console.log('--- DEVELOPMENT MODE: Verification Code is:', code, '---');
            return { success: true, devMode: true };
        }
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendVerificationEmail
};
