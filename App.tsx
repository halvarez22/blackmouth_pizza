import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MenuHighlight from './components/MenuHighlight';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ReservationsPage from './pages/ReservationsPage';
import MenuPage from './pages/MenuPage';
import DeliveryPage from './pages/DeliveryPage';
import WhatsAppButton from './components/WhatsAppButton';

// Centralized data for use in cost calculation and prop drilling
interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  popular?: boolean;
}

const menuData: MenuItem[] = [
     { name: 'SALMÓN CLÁSICA', description: 'Deliciosa pizza al horno de salmón ahumado, queso crema y un toque de eneldo.', price: 220.00, imageUrl: '/images/pizza_1.jpeg' },
     { name: 'SALMÓN INDIVIDUAL', description: 'Deliciosa pizza al horno de salmón ahumado, queso crema y un toque de eneldo.', price: 120.00, imageUrl: '/images/pizza_1.jpeg' },
     { name: 'JAMÓN SERRANO CLÁSICA', description: 'Deliciosa pizza al horno de jamón serrano, rúcula fresca y lascas de parmesano.', price: 220.00, imageUrl: '/images/pizza_2.jpeg', popular: true },
     { name: 'JAMÓN SERRANO INDIVIDUAL', description: 'Deliciosa pizza al horno de jamón serrano, rúcula fresca y lascas de parmesano.', price: 120.00, imageUrl: '/images/pizza_2.jpeg' },
     { name: 'VEGETARIANA CLÁSICA', description: 'Deliciosa pizza al horno con una selección de vegetales frescos de temporada.', price: 165.00, imageUrl: '/images/pizza_3.jpeg' },
     { name: 'VEGETARIANA INDIVIDUAL', description: 'Deliciosa pizza al horno con una selección de vegetales frescos de temporada.', price: 85.00, imageUrl: '/images/pizza_3.jpeg' },
     { name: 'HAWAIANA CLÁSICA', description: 'La clásica combinación de jamón, piña y queso mozzarella.', price: 170.00, imageUrl: '/images/pizza_4.jpeg' },
     { name: 'HAWAIANA INDIVIDUAL', description: 'La clásica combinación de jamón, piña y queso mozzarella.', price: 90.00, imageUrl: '/images/pizza_4.jpeg' },
     { name: 'CAMARONES CLÁSICA', description: 'Pizza con camarones salteados al ajillo, pimientos y cebolla morada.', price: 220.00, imageUrl: '/images/pizza_5.jpeg' },
     { name: 'CAMARONES INDIVIDUAL', description: 'Pizza con camarones salteados al ajillo, pimientos y cebolla morada.', price: 100.00, imageUrl: '/images/pizza_5.jpeg' },
     { name: 'PEPPERONI CLÁSICA', description: 'Abundante pepperoni de alta calidad sobre una capa de mozzarella fundido.', price: 149.00, imageUrl: '/images/pizza_6.jpeg', popular: true },
     { name: 'PEPPERONI INDIVIDUAL', description: 'Abundante pepperoni de alta calidad sobre una capa de mozzarella fundido.', price: 79.00, imageUrl: '/images/pizza_6.jpeg' },
     { name: 'QUESO CLÁSICA', description: 'Una mezcla de cuatro quesos: mozzarella, provolone, parmesano y gorgonzola.', price: 149.00, imageUrl: '/images/pizza_7.jpeg' },
     { name: 'QUESO INDIVIDUAL', description: 'Una mezcla de cuatro quesos: mozzarella, provolone, parmesano y gorgonzola.', price: 79.00, imageUrl: '/images/pizza_7.jpeg' },
     { name: 'ATÚN CLÁSICA', description: 'Pizza con atún, cebolla morada, aceitunas negras y pimiento morrón.', price: 170.00, imageUrl: '/images/pizza_8.jpeg' },
     { name: 'ATÚN INDIVIDUAL', description: 'Pizza con atún, cebolla morada, aceitunas negras y pimiento morrón.', price: 90.00, imageUrl: '/images/pizza_8.jpeg' },
     { name: 'NUTELLA CLÁSICA', description: 'Pizza dulce con una generosa capa de Nutella, fresas y avellanas.', price: 189.00, imageUrl: '/images/pizza_1.jpeg', popular: true },
     { name: 'NUTELLA INDIVIDUAL', description: 'Pizza dulce con una generosa capa de Nutella, fresas y avellanas.', price: 95.00, imageUrl: '/images/pizza_1.jpeg' },
     { name: 'MEXICANA CLÁSICA', description: 'Pizza con base de frijoles, chorizo, jalapeños, aguacate y cilantro.', price: 180.00, imageUrl: '/images/pizza_2.jpeg' },
     { name: 'MEXICANA INDIVIDUAL', description: 'Pizza con base de frijoles, chorizo, jalapeños, aguacate y cilantro.', price: 95.00, imageUrl: '/images/pizza_2.jpeg' },
     { name: 'MARGARITA CLÁSICA', description: 'La reina de Nápoles. Tomate San Marzano, mozzarella fior di latte y albahaca fresca.', price: 170.00, imageUrl: '/images/pizza_3.jpeg', popular: true },
     { name: 'MARGARITA INDIVIDUAL', description: 'La reina de Nápoles. Tomate San Marzano, mozzarella fior di latte y albahaca fresca.', price: 90.00, imageUrl: '/images/pizza_3.jpeg' },
 ];


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [order, setOrder] = useState<{ [itemName: string]: number }>({});

  const handleAddToOrder = (itemName: string) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [itemName]: (prevOrder[itemName] || 0) + 1,
    }));
  };
  
  const handleRemoveFromOrder = (itemName: string) => {
    setOrder(prevOrder => {
      const currentQuantity = prevOrder[itemName];
      if (!currentQuantity) return prevOrder;

      if (currentQuantity > 1) {
        return { ...prevOrder, [itemName]: currentQuantity - 1 };
      } else {
        const { [itemName]: _, ...rest } = prevOrder;
        return rest;
      }
    });
  };

  const handleClearOrder = () => {
    setOrder({});
  };

  // Fix: Explicitly type accumulator and value in reduce to prevent type inference issues.
  const totalItems = Object.values(order).reduce((sum: number, quantity: number) => sum + quantity, 0);
  // Fix: Explicitly type accumulator and value in reduce to prevent type inference issues.
  const totalCost = Object.entries(order).reduce((sum: number, [name, quantity]: [string, number]) => {
    const menuItem = menuData.find(item => item.name === name);
    return sum + (menuItem ? menuItem.price * quantity : 0);
  }, 0);


  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      // Scroll to top when navigating to a new page
      if (window.location.hash === '#/reservas' || window.location.hash === '#/menu') {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check for pages that need scroll to top
    if (window.location.hash === '#/reservas' || window.location.hash === '#/menu') {
        window.scrollTo(0, 0);
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Render the reservations page if the route matches
  if (route === '#/reservas') {
    return (
      <div className="bg-[#0a0a0a]">
        <Header totalItems={totalItems} totalCost={totalCost} />
        <ReservationsPage />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }
  
  // Render the menu page if the route matches
  if (route === '#/menu') {
    return (
      <div className="bg-[#0a0a0a]">
        <Header totalItems={totalItems} totalCost={totalCost} />
        <MenuPage
          menuData={menuData}
          order={order}
          onAddToOrder={handleAddToOrder}
          onRemoveFromOrder={handleRemoveFromOrder}
          onClearOrder={handleClearOrder}
          totalItems={totalItems}
          totalCost={totalCost}
        />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Render the delivery page if the route matches
  if (route === '#/delivery') {
    return (
      <div className="bg-[#0a0a0a]">
        <Header totalItems={totalItems} totalCost={totalCost} />
        <DeliveryPage
          order={order}
          totalItems={totalItems}
          totalCost={totalCost}
        />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }


  // Otherwise, render the main landing page
  return (
    <div className="bg-[#0a0a0a]">
      <Header totalItems={totalItems} totalCost={totalCost} />
      <main>
        <Hero />
        <About />
        <MenuHighlight />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;