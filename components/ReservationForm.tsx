import React, { useState, useEffect, useCallback } from 'react';
// Fix: Import GoogleGenAI and Type for API interaction.
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialize Gemini AI outside the component to avoid re-creation on every render.
// Only initialize if API key is available (for production deployments)
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY as string }) : null;

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const ReservationForm: React.FC = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [diners, setDiners] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // State for animations
  const [isMounted, setIsMounted] = useState(false);

  // State for AI-powered time suggestions
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');

  // State for form submission and validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');

  // Effect for mount animation
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchAvailableTimes = useCallback(async () => {
    setLoadingTimes(true);
    setSuggestionError('');
    setAvailableTimes([]);
    setTime('');

    // If AI is not available, use fallback times immediately
    if (!ai) {
      const fallbackTimes = ['19:00', '19:30', '20:00', '21:00', '21:30', '22:00'];
      setAvailableTimes(fallbackTimes);
      setTime(fallbackTimes[0]);
      setLoadingTimes(false);
      return;
    }

    try {
      const prompt = `
        Somos una pizzería napolitana llamada Blackmouth Pizzeria en Barcelona.
        Nuestro horario es:
        - Lunes a Jueves: 13:00 - 23:00
        - Viernes y Sábado: 13:00 - 00:00
        - Domingo: 13:00 - 22:00
        Las horas de mayor afluencia son entre las 20:30 y las 22:00.

        Un cliente quiere reservar una mesa para ${diners} personas el ${new Date(date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

        Genera una lista de 5-7 horarios de reserva disponibles, en intervalos de 30 minutos. Ten en cuenta nuestro horario y las horas punta para ofrecer alternativas. Asegúrate que los horarios sean válidos para el día de la semana seleccionado. Devuelve solo un array de strings en formato JSON con las horas ("HH:MM").
      `;

      // Fix: Use Gemini to generate available times in JSON format.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                }
            }
        }
      });

      const jsonText = response.text.trim();
      const times = JSON.parse(jsonText);

      if (Array.isArray(times) && times.length > 0) {
        setAvailableTimes(times);
        setTime(times[0]);
      } else {
        throw new Error("No times returned or unexpected format.");
      }

    } catch (error) {
      console.error("Error fetching available times:", error);
      // Provide fallback times for better UX without showing error message
      const fallbackTimes = ['19:00', '19:30', '20:00', '21:00', '21:30', '22:00'];
      setAvailableTimes(fallbackTimes);
      setTime(fallbackTimes[0]);
    } finally {
      setLoadingTimes(false);
    }
  }, [date, diners]);

  useEffect(() => {
    if (date && diners > 0) {
      fetchAvailableTimes();
    } else {
      setAvailableTimes([]);
      setTime('');
    }
  }, [date, diners, fetchAvailableTimes]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    
    // Optional field: only validate if not empty
    if (newPhone.trim() !== '') {
        const phoneRegex = /^\+?[0-9\s]{9,15}$/;
        if (!phoneRegex.test(newPhone)) {
            setPhoneError('Por favor, introduce un número de teléfono válido.');
        } else {
            setPhoneError('');
        }
    } else {
        setPhoneError(''); // Clear error if field is empty
    }
  };


  const handleReset = () => {
    setName('');
    setDiners(2);
    setDate('');
    setTime('');
    setEmail('');
    setPhone('');
    setAvailableTimes([]);
    setSubmissionStatus('idle');
    setPhoneError('');
    setIsMounted(false); // Reset animation state
    setTimeout(() => setIsMounted(true), 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation check
    if (name && diners && date && time && email && !phoneError) {
        setSubmissionStatus('success');
    } else {
        setSubmissionStatus('error');
    }
    setIsSubmitting(false);
  };
  
  const getMinDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
  };

  const inputStyles = "w-full bg-[#111111] border border-gray-700 text-gray-200 rounded-lg p-3 transition-all duration-300 ease-in-out placeholder-gray-500 focus:outline-none focus:bg-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-500 focus:scale-[1.02]";
  const errorInputStyles = "border-red-500 focus:ring-red-500/40 focus:border-red-500 hover:border-red-600";

  if (submissionStatus === 'success') {
    return (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center animate-fade-in-pop flex flex-col items-center">
            <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
            <h3 className="text-3xl font-bold text-green-400 mb-4">¡Reserva Confirmada!</h3>
            <p className="text-gray-300 max-w-md mb-6">
                ¡Todo listo, <strong>{name}</strong>! Tu mesa ha sido reservada. Revisa los detalles a continuación:
            </p>

            <div className="w-full max-w-md bg-black/30 border border-gray-700 rounded-lg p-6 mb-8 text-left space-y-4">
                <div className="flex items-center">
                    <UserIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                    <div className="flex-grow flex justify-between items-center">
                        <span className="text-gray-400">Nombre:</span>
                        <span className="font-semibold text-white text-right">{name}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <UsersIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                    <div className="flex-grow flex justify-between items-center">
                        <span className="text-gray-400">Personas:</span>
                        <span className="font-semibold text-white">{diners}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                    <div className="flex-grow flex justify-between items-center">
                        <span className="text-gray-400">Fecha:</span>
                        <span className="font-semibold text-white text-right">{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                    <div className="flex-grow flex justify-between items-center">
                        <span className="text-gray-400">Hora:</span>
                        <span className="font-semibold text-white">{time}</span>
                    </div>
                </div>
                <div className="border-t border-gray-600 !my-3"></div>
                <div className="flex items-center">
                    <MailIcon className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
                    <div className="flex-grow">
                        <span className="text-gray-400">Confirmación enviada a:</span>
                        <p className="font-semibold text-orange-400 break-all">{email}</p>
                    </div>
                </div>
            </div>
            
            <p className="text-gray-400 mb-8">¡Te esperamos para que disfrutes de la experiencia Blackmouth!</p>
            <button
                onClick={handleReset}
                className="bg-orange-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-600/30"
            >
                Hacer otra reserva
            </button>
        </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
      <div className={`grid md:grid-cols-2 gap-6 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
        {/* Date Input */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 font-semibold text-gray-300">Fecha</label>
          <input
            id="date"
            type="date"
            min={getMinDate()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputStyles}
          />
        </div>
        {/* Diners Input */}
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
              <label htmlFor="diners" className="font-semibold text-gray-300">Personas</label>
              <div className="relative ml-2 group">
                  <InfoIcon className="w-5 h-5 text-gray-500 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      Máximo 12 comensales. Para grupos más grandes, por favor llámanos.
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                  </div>
              </div>
          </div>
          <input
            id="diners"
            type="number"
            min="1"
            max="12"
            value={diners}
            onChange={(e) => setDiners(parseInt(e.target.value, 10) || 1)}
            required
            className={inputStyles}
          />
        </div>
      </div>

      {/* Time Input */}
      <div className={`flex flex-col transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
        <label htmlFor="time" className="mb-2 font-semibold text-gray-300">Hora</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          disabled={loadingTimes || !date || availableTimes.length === 0}
          className={`${inputStyles} disabled:opacity-50`}
        >
          {loadingTimes ? (
            <option>Buscando horas...</option>
          ) : availableTimes.length > 0 ? (
            <>
              <option value="" disabled={!!time}>Selecciona una hora</option>
              {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
            </>
          ) : date ? (
            <option value="" disabled>No hay horas disponibles</option>
          ) : (
            <option value="" disabled>Selecciona fecha y personas</option>
          )}
        </select>
        {suggestionError && <p className="text-red-400 text-sm mt-2">{suggestionError}</p>}
      </div>

      <div className={`grid md:grid-cols-2 gap-6 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
        {/* Name Input */}
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
        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-300">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
        </div>
      </div>
      
       {/* Phone Input (Optional) */}
        <div className={`flex flex-col transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <label htmlFor="phone" className="mb-2 font-semibold text-gray-300">Teléfono para confirmar</label>
          <input
            id="phone"
            type="tel"
            placeholder="+34 600 123 456"
            value={phone}
            onChange={handlePhoneChange}
            aria-invalid={!!phoneError}
            aria-describedby={phoneError ? "phone-error" : undefined}
            className={`${inputStyles} ${phoneError ? errorInputStyles : ''}`}
          />
          {phoneError && <p id="phone-error" className="text-red-400 text-sm mt-2 animate-shake">{phoneError}</p>}
        </div>


      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !date || !time || !name || !email || !!phoneError}
        className={`w-full bg-orange-600 text-white font-bold uppercase tracking-widest py-4 px-10 rounded-full hover:bg-orange-500 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-600/30 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '500ms' }}
      >
        {isSubmitting ? 'Confirmando...' : 'Confirmar Reserva'}
      </button>

      {submissionStatus === 'error' && (
        <p className="text-red-400 text-center mt-4 animate-shake">Por favor, completa todos los campos requeridos.</p>
      )}
    </form>
  );
};

export default ReservationForm;
