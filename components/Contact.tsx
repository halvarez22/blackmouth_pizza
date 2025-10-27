
import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
    </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-black text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Visítanos o Contáctanos</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Tu mesa te espera. Ven a vivir la experiencia Blackmouth.
        </p>
        <div className="text-lg text-white space-y-2 mb-8">
            <p><strong>BLACK MOUTH PIZZERÍA</strong></p>
            <p>León Guanajuato, México</p>
            <p>Frente a Universidad La Salle Bajío</p>
            <p>Av. Universidad 431-D</p>
            <p>+47 72 44 49 74</p>
            <p>reservas@blackmouth.com</p>
        </div>

        {/* Google Maps Embed */}
        <div className="mb-12">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.123456789012!2d-101.71074287310628!3d21.150726220599303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bc1234567890%3A0x1234567890abcdef!2sBLACK%20MOUTH%20PIZZER%C3%8DA!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
                title="Ubicación de Black Mouth Pizzería"
            ></iframe>
        </div>

        <div className="max-w-md mx-auto mb-16 bg-[#1a1a1a]/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
                <ClockIcon className="w-6 h-6 mr-3 text-orange-400" />
                <h4 className="text-xl font-bold text-white tracking-wide">Horario Especial Festivos</h4>
            </div>
            <ul className="text-gray-300 space-y-2">
                <li><span className="font-semibold text-gray-100">24 y 25 de Diciembre:</span> Cerrado</li>
                <li><span className="font-semibold text-gray-100">31 de Diciembre:</span> Abierto solo cenas (19:00 - 23:00)</li>
                <li><span className="font-semibold text-gray-100">1 de Enero:</span> Cerrado</li>
            </ul>
        </div>
        
        <div>
             <h3 className="text-3xl font-bold text-white mb-4">¿Listo para Saborear?</h3>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                 Asegura tu sitio en el corazón del sabor. Es rápido y fácil.
             </p>

             {/* Social Media Links */}
             <div className="flex justify-center space-x-8 mb-8">
                 <a
                     href="https://www.instagram.com/blackmouthpizzeria"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                     aria-label="Síguenos en Instagram"
                 >
                     <InstagramIcon className="w-8 h-8" />
                 </a>
                 <a
                     href="https://www.facebook.com/people/Blackmouth-Grill"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                     aria-label="Síguenos en Facebook"
                 >
                     <FacebookIcon className="w-8 h-8" />
                 </a>
                 <a
                     href="https://www.tiktok.com/@blackmouthbjx"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-black transition-colors duration-300 transform hover:scale-110"
                     aria-label="Síguenos en TikTok"
                 >
                     <TikTokIcon className="w-8 h-8" />
                 </a>
             </div>

             <a
                 href="#/reservas"
                 className="inline-block bg-orange-600 text-white font-bold uppercase tracking-widest py-4 px-10 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
             >
                 Reservar Ahora
             </a>
         </div>
      </div>
    </section>
  );
};

export default Contact;
