import React, { useState, useEffect } from 'react';

interface DeliveryPageProps {
    order: { [itemName: string]: number };
    totalItems: number;
    totalCost: number;
}

const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2v1a1 1 0 001 1h2a1 1 0 001-1v-1h6v1a1 1 0 001 1h2a1 1 0 001-1v-1a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2v2M9 5a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
);

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

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const DeliveryPage: React.FC<DeliveryPageProps> = ({ order, totalItems, totalCost }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [phoneError, setPhoneError] = useState('');

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhone(newPhone);

        if (newPhone.trim() !== '') {
            const phoneRegex = /^\+?[0-9\s]{9,15}$/;
            if (!phoneRegex.test(newPhone)) {
                setPhoneError('Por favor, introduce un número de teléfono válido.');
            } else {
                setPhoneError('');
            }
        } else {
            setPhoneError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (name && phone && address && !phoneError && totalItems > 0) {
            setSubmissionStatus('success');
        } else {
            setSubmissionStatus('error');
        }
        setIsSubmitting(false);
    };

    const inputStyles = "w-full bg-[#111111] border border-gray-700 text-gray-200 rounded-lg p-3 transition-all duration-300 ease-in-out placeholder-gray-500 focus:outline-none focus:bg-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500";
    const errorInputStyles = "border-red-500 focus:ring-red-500/40 focus:border-red-500 hover:border-red-600";

    if (submissionStatus === 'success') {
        return (
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center animate-fade-in-pop flex flex-col items-center">
                <TruckIcon className="w-16 h-16 text-green-400 mb-4" />
                <h3 className="text-3xl font-bold text-green-400 mb-4">¡Pedido Confirmado!</h3>
                <p className="text-gray-300 max-w-md mb-6">
                    Tu pedido a domicilio ha sido confirmado. Recibirás una llamada para coordinar la entrega.
                </p>

                <div className="w-full max-w-md bg-black/30 border border-gray-700 rounded-lg p-6 mb-8 text-left space-y-4">
                    <div className="flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="text-gray-400">Teléfono:</span>
                            <p className="font-semibold text-white">{phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                        <div className="flex-grow">
                            <span className="text-gray-400">Dirección:</span>
                            <p className="font-semibold text-white">{address}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-600 !my-3"></div>
                    <div className="text-center">
                        <span className="text-gray-400">Total a pagar:</span>
                        <p className="font-bold text-orange-400 text-xl">${totalCost.toFixed(2)}</p>
                    </div>
                </div>

                <p className="text-gray-400 mb-8">¡Tu pizza va en camino!</p>
                <button
                    onClick={() => window.location.hash = '#/'}
                    className="bg-orange-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-600/30"
                >
                    Volver al Inicio
                </button>
            </div>
        );
    }

    return (
      <div className="pt-20 sm:pt-24 md:pt-32 bg-[#0a0a0a] min-h-screen">
        <section className="relative hero-bg bg-cover bg-center py-16 sm:py-20 md:py-32">
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white">Pedido a Domicilio</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto px-4">
              Disfruta de nuestras pizzas en la comodidad de tu hogar. Entrega rápida y segura.
            </p>
          </div>
        </section>

            <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
                <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center lg:text-left">Completa tu Pedido</h2>

                        {totalItems === 0 ? (
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center">
                                <p className="text-gray-400 mb-6">No tienes items en tu pedido.</p>
                                <a
                                    href="#/menu"
                                    className="inline-block bg-orange-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
                                >
                                    Ir al Menú
                                </a>
                            </div>
                        ) : (
                            <>
                                {/* Order Summary */}
                                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Resumen del Pedido</h3>
                                    <div className="space-y-2">
                                        {Object.entries(order).map(([itemName, quantity]) => (
                                            <div key={itemName} className="flex justify-between items-center text-gray-300">
                                                <span>{itemName} x{quantity}</span>
                                                <span className="font-semibold text-orange-400">
                                                    ${(22 * Number(quantity)).toFixed(2)} {/* Simplified pricing */}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-600 pt-2 mt-4">
                                            <div className="flex justify-between items-center text-white font-bold">
                                                <span>Total:</span>
                                                <span className="text-orange-400">${totalCost.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Form */}
                                <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
                                    <div className={`grid md:grid-cols-2 gap-6 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                                        <div className="flex flex-col">
                                            <label htmlFor="name" className="mb-2 font-semibold text-gray-300">Nombre Completo</label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Tu nombre y apellido"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className={inputStyles}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="phone" className="mb-2 font-semibold text-gray-300">Teléfono</label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                placeholder="+34 600 123 456"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                required
                                                aria-invalid={!!phoneError}
                                                aria-describedby={phoneError ? "phone-error" : undefined}
                                                className={`${inputStyles} ${phoneError ? errorInputStyles : ''}`}
                                            />
                                            {phoneError && <p id="phone-error" className="text-red-400 text-sm mt-2 animate-shake">{phoneError}</p>}
                                        </div>
                                    </div>

                                    <div className={`flex flex-col transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                                        <label htmlFor="address" className="mb-2 font-semibold text-gray-300">Dirección de Entrega</label>
                                        <textarea
                                            id="address"
                                            placeholder="Calle, número, piso, código postal, ciudad..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            rows={3}
                                            className={inputStyles}
                                        />
                                    </div>

                                    <div className={`flex flex-col transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                                        <label htmlFor="instructions" className="mb-2 font-semibold text-gray-300">Instrucciones Especiales <span className="text-gray-500">(Opcional)</span></label>
                                        <textarea
                                            id="instructions"
                                            placeholder="Indicaciones para el repartidor, timbre, etc."
                                            value={instructions}
                                            onChange={(e) => setInstructions(e.target.value)}
                                            rows={2}
                                            className={inputStyles}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !name || !phone || !address || !!phoneError}
                                        className={`w-full bg-orange-600 text-white font-bold uppercase tracking-widest py-4 px-10 rounded-full hover:bg-orange-500 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-600/30 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        style={{ transitionDelay: '400ms' }}
                                    >
                                        {isSubmitting ? 'Confirmando Pedido...' : 'Confirmar Pedido a Domicilio'}
                                    </button>

                                    {submissionStatus === 'error' && (
                                        <p className="text-red-400 text-center mt-4 animate-shake">Por favor, completa todos los campos requeridos.</p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 sticky top-32">
                            <h3 className="text-2xl font-bold text-white mb-6">Información de Delivery</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <TruckIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Zona de Entrega</h4>
                                        <p className="text-gray-400 mt-1">Barcelona y alrededores (hasta 10km)</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <ClockIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Tiempo de Entrega</h4>
                                        <p className="text-gray-400 mt-1">30-45 minutos</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPinIcon className="w-6 h-6 mr-4 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Costo de Envío</h4>
                                        <p className="text-gray-400 mt-1">Gratis en pedidos superiores a $30</p>
                                        <p className="text-gray-400 mt-1">$3.50 en pedidos menores</p>
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

export default DeliveryPage;