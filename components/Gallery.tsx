import React, { useEffect, useRef } from 'react';

const Gallery: React.FC = () => {
  const pizzaTypes = [
    { image: '/images/pizza_1.jpeg', ingredient: 'SALMÓN' },
    { image: '/images/pizza_2.jpeg', ingredient: 'JAMÓN' },
    { image: '/images/pizza_3.jpeg', ingredient: 'VEGETARIANA' },
    { image: '/images/pizza_4.jpeg', ingredient: 'HAWAIANA' },
    { image: '/images/pizza_5.jpeg', ingredient: 'CAMARONES' },
    { image: '/images/pizza_6.jpeg', ingredient: 'PEPPERONI' },
    { image: '/images/pizza_7.jpeg', ingredient: 'ATÚN' },
    { image: '/images/pizza_8.jpeg', ingredient: 'NUTELLA' },
  ];
  
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            // By removing these classes, the element will animate to its default state (opacity-100, translate-y-0)
            target.classList.remove('opacity-0', 'translate-y-5');
            observer.unobserve(target); // Animate only once
          }
        });
      },
      {
        // Trigger animation when an item is about 15% visible
        threshold: 0.15,
      }
    );

    // Fix: Explicitly type `elements` as `Element[]` to resolve type inference issues with `gridRef.current.children`.
    // This ensures `el` in `forEach` is correctly typed as `Element`.
    const elements: Element[] = gridRef.current ? Array.from(gridRef.current.children) : [];
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Desde el Fuego</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">Momentos capturados de nuestra pasión por la pizza.</p>
        </div>
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pizzaTypes.map((pizza, index) => (
            <div
              key={index}
              // Add initial animation state (hidden, moved down) and transition properties
              className="overflow-hidden rounded-lg aspect-square group focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-4 focus:ring-offset-black opacity-0 translate-y-5 transition-all ease-out duration-700 relative"
              style={{ transitionDelay: `${index * 75}ms` }} // Staggered delay for each item
              tabIndex={0}
            >
              <img
                src={pizza.image}
                alt={`Pizza ${pizza.ingredient}`}
                className={`w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-focus:scale-110 ${
                  index % 2 === 0
                    ? 'group-hover:rotate-[5deg] group-focus:rotate-[5deg]'
                    : 'group-hover:-rotate-[5deg] group-focus:-rotate-[5deg]'
                }`}
              />
              {/* Ingredient label overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl uppercase tracking-wider text-center px-2">
                  {pizza.ingredient}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
