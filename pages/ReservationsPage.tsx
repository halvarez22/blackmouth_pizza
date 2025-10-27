
import React from 'react';
import ReservationForm from '../components/ReservationForm';

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const ReservationsPage: React.FC = () => {
  return (
    <div className="pt-20 sm:pt-24 md:pt-32 bg-black min-h-screen">
      <section className="relative hero-bg bg-cover bg-center py-16 sm:py-20 md:py-32">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white">Asegura tu Mesa</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto px-4">
            Estás a un paso de vivir la auténtica experiencia Blackmouth. Elige tu momento perfecto.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          <div className="lg:col-span-2">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center lg:text-left">Completa tu Reserva</h2>
            <ReservationForm />
          </div>

          <div className="lg:col-span-1">
             <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-6">Información Útil</h3>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <ClockIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-white">Horario de Apertura</h4>
                            <ul className="text-gray-400 mt-1 list-disc list-inside">
                                <li>Lunes a Jueves: 13:00 - 23:00</li>
                                <li>Viernes y Sábado: 13:00 - 00:00</li>
                                <li>Domingo: 13:00 - 22:00</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <MapPinIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-white">Ubicación</h4>
                            <p className="text-gray-400 mt-1">Calle Ficticia 123, 08001 Barcelona, España</p>
                            <a href="#" className="text-orange-400 text-sm hover:underline mt-1 inline-block">Ver en el mapa</a>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <UsersIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-white">Política de Reservas</h4>
                            <p className="text-gray-400 mt-1">
                                Para grupos de más de 12 personas, por favor, contáctanos directamente por teléfono al <span className="text-white">+34 930 123 456</span>.
                            </p>
                        </div>
                    </div>
                </div>

             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationsPage;
