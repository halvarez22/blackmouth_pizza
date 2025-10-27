
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white hero-bg bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        {/* Logo Corporativo Impactante */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/images/Logo.png" 
            alt="Blackmouth Pizzeria Logo" 
            className="h-32 md:h-48 lg:h-56 w-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight mb-4">
          El Arte del Fuego Lento
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-200 mb-8 px-4">
          Donde la tradición napolitana se encuentra con la pasión por la perfección. Una experiencia, no solo una pizza.
        </p>
        <a
          href="#/menu"
          className="bg-orange-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
        >
          Descubrir el Menú
        </a>
      </div>
    </section>
  );
};

export default Hero;
