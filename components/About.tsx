import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-bg bg-cover bg-center min-h-[400px] md:min-h-[600px] rounded-lg shadow-2xl">
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nosotros</h2>
            <h3 className="text-2xl font-bold text-orange-400 mb-6 font-sans tracking-wide">BlackMouth Pizzeria: Tradición que Desafía</h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Somos la nueva generación de <i>pizzaioli</i> que lleva el corazón de la tradición napolitana a la mesa contemporánea. En <strong>BlackMouth</strong>, honramos el legado de la pizza auténtica mientras la impulsamos hacia el futuro, con una pasión innegociable por la excelencia.
              </p>
              
              <div>
                <h4 className="font-semibold text-white text-lg mb-2">La Innovación en el Horno</h4>
                <p>
                  Fuimos de los primeros en adoptar y perfeccionar el estilo de pizza 'a canotto', recuperando una tradición para lograr una pizza de digestibilidad y sabor inigualables. Nuestra esencia radica en una meticulosa investigación de la masa y la selección de materias primas.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white text-lg mb-2">La Promesa BlackMouth</h4>
                <p>
                  Cada pizza que sale de nuestro horno es una declaración de intenciones: sabor audaz, masa inigualable y la garantía de una experiencia gastronómica que recordarás.
                </p>
              </div>
              
              <div className="flow-root">
                <h4 className="font-semibold text-white text-lg mb-2">El Chef Ejecutivo</h4>
                <img 
                  src="https://picsum.photos/150/150?random=31" 
                  alt="Retrato del Chef Alessandro Rossi" 
                  className="w-24 h-24 rounded-lg object-cover float-left mr-4 mb-1" 
                />
                <p>
                  <strong>Chef Alessandro Rossi:</strong> Formado en las cocinas más prestigiosas de Nápoles, el Chef Alessandro trae una visión audaz a Blackmouth. Su filosofía combina una reverencia por las técnicas ancestrales con un instinto para la innovación, creando pizzas que son a la vez familiares y sorprendentemente nuevas.
                </p>
              </div>
            </div>

            <a href="#/menu" className="inline-block mt-8 text-orange-400 font-bold uppercase tracking-widest hover:text-orange-300 transition-colors">
              Ver Menú &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;