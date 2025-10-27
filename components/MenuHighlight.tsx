
import React from 'react';

interface PizzaCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ name, description, imageUrl }) => (
  <div className="bg-[#1a1a1a] rounded-lg overflow-hidden group shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50">
    <div className="overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-64 object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const MenuHighlight: React.FC = () => {
  const pizzas = [
    {
      name: 'Margherita Verace',
      description: 'La reina de Nápoles. Tomate San Marzano, mozzarella fior di latte, albahaca fresca y aceite de oliva virgen extra.',
      imageUrl: 'https://picsum.photos/600/400?random=3',
    },
    {
      name: 'Diavola Blackmouth',
      description: 'Nuestro toque picante. Salami Spianata, mozzarella, nduja de Calabria y un toque de miel picante.',
      imageUrl: 'https://picsum.photos/600/400?random=4',
    },
    {
      name: 'Tartufo e Funghi',
      description: 'Un lujo terrenal. Crema de trufa negra, champiñones portobello, mozzarella y lascas de parmesano.',
      imageUrl: 'https://picsum.photos/600/400?random=5',
    },
  ];

  return (
    <section id="menu" className="py-16 sm:py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Obras Maestras</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto px-4 text-sm sm:text-base">Una selección curada de nuestras pizzas más emblemáticas.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.name} {...pizza} />
          ))}
        </div>
        <div className="text-center mt-16">
          <a
            href="#/menu"
            className="inline-block bg-orange-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
          >
            Ver Carta Completa
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlight;
