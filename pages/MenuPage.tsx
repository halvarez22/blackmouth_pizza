import React, { useState, useMemo, useEffect, useRef } from 'react';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  popular?: boolean;
}

interface MenuPageProps {
     menuData: MenuItem[];
     order: { [itemName: string]: number };
     onAddToOrder: (itemName: string) => void;
     onRemoveFromOrder: (itemName: string) => void;
     onClearOrder: () => void;
     totalItems: number;
     totalCost: number;
}

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
    </svg>
);

const MinusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onAddToOrder: (itemName: string) => void;
    onRemoveFromOrder: (itemName: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, quantity, onAddToOrder, onRemoveFromOrder }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const prevQuantityRef = useRef(quantity);
    const MAX_QUANTITY = 10;
    const [isExpanded, setIsExpanded] = useState(false);

    // Heuristic to determine if the description is long enough to be clamped.
    const isDescriptionLong = item.description.length > 85;

    useEffect(() => {
        // Trigger animation only when the quantity changes from its previous state.
        // This prevents animation on initial component mount.
        if (prevQuantityRef.current !== quantity) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300); // Match animation duration
            
            // Update the ref to the current quantity for the next comparison.
            prevQuantityRef.current = quantity;
            
            return () => clearTimeout(timer);
        }
    }, [quantity]);

    return (
        <div className="flex items-center space-x-4 py-6">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-grow">
                <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">{item.name}</h3>
                    {item.popular && (
                        <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full animate-fade-in-pop">
                            Popular
                        </span>
                    )}
                </div>
                <div>
                    <p 
                        className={`text-gray-400 text-sm mt-1 max-w-md transition-all duration-300 ease-in-out ${!isExpanded && isDescriptionLong ? 'line-clamp-2' : ''}`}
                    >
                        {item.description}
                    </p>
                    {isDescriptionLong && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-xs font-semibold text-orange-500 hover:text-orange-400 mt-1 focus:outline-none"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </div>
                 <div className="flex items-center space-x-3 mt-2">
                    <p className="font-bold text-orange-400 text-lg">
                        {quantity > 0 
                            ? `Total: $${(item.price * quantity).toFixed(2)}`
                            : `$${item.price.toFixed(2)}`
                        }
                    </p>
                    {quantity === 0 && (
                        <button
                            onClick={() => onAddToOrder(item.name)}
                            className="bg-orange-600/20 text-orange-400 rounded-full p-1 hover:bg-orange-600/40 transition-colors feedback-button"
                            aria-label={`Añadir ${item.name} al pedido`}
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end w-32">
                 <div className="flex items-center justify-end h-10">
                    {quantity === 0 ? (
                        <button
                            aria-label={`Añadir ${item.name} al pedido`}
                            className="bg-orange-600 px-4 py-2 rounded-full text-white hover:bg-orange-500 transition-colors flex items-center justify-center group feedback-button disabled:bg-gray-600 disabled:cursor-not-allowed"
                            onClick={() => onAddToOrder(item.name)}
                            disabled={quantity >= MAX_QUANTITY}
                        >
                            <span className="text-sm font-bold uppercase tracking-wider">Añadir</span>
                        </button>
                    ) : (
                        <div className="flex items-center bg-[#2a2a2a] rounded-full border border-gray-700">
                            <button
                                aria-label={quantity > 1 ? `Quitar uno de ${item.name}` : `Quitar ${item.name} del pedido`}
                                className="p-2 text-white transition-colors feedback-button"
                                onClick={() => onRemoveFromOrder(item.name)}
                            >
                                {quantity > 1 ? 
                                    <MinusIcon className="h-5 w-5" /> : 
                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                }
                            </button>
                            <span className={`font-bold text-white text-lg w-8 text-center tabular-nums ${isAnimating ? 'animate-pop' : ''}`}>
                                {quantity}
                            </span>
                            <button
                                aria-label={`Añadir uno más de ${item.name}`}
                                className="p-2 text-white transition-colors feedback-button disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => onAddToOrder(item.name)}
                                disabled={quantity >= MAX_QUANTITY}
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                 </div>
                <div className="text-right mt-1 h-4">
                  {quantity >= MAX_QUANTITY && (
                      <span className="text-xs text-red-400 animate-shake">Límite alcanzado</span>
                  )}
                </div>
            </div>
        </div>
    );
};

const MenuPage: React.FC<MenuPageProps> = ({ menuData, order, onAddToOrder, onRemoveFromOrder, onClearOrder, totalItems, totalCost }) => {
    const [sizeFilter, setSizeFilter] = useState('all'); // 'all', 'clásica', 'individual'
    const [ingredientFilter, setIngredientFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const ingredientOptions = useMemo(() => [
        'all', ...new Set(menuData.map(item => item.name.split(' ')[0].toLowerCase()))
    ], [menuData]);

    const filteredMenu = useMemo(() => {
        return menuData.filter(item => {
            const nameLower = item.name.toLowerCase();
            const descriptionLower = item.description.toLowerCase();
            const searchLower = searchQuery.toLowerCase().trim();
            
            const sizeMatch = sizeFilter === 'all' || nameLower.includes(sizeFilter);
            const ingredientMatch = ingredientFilter === 'all' || nameLower.startsWith(ingredientFilter);
            const searchMatch = searchLower === '' || nameLower.includes(searchLower) || descriptionLower.includes(searchLower);
            
            return sizeMatch && ingredientMatch && searchMatch;
        });
    }, [sizeFilter, ingredientFilter, searchQuery, menuData]);

    const handleAddFilteredToOrder = () => {
        filteredMenu.forEach(item => {
            onAddToOrder(item.name);
        });
    };

    const handleClearFilters = () => {
        setSizeFilter('all');
        setIngredientFilter('all');
        setSearchQuery('');
    };

    const areFiltersActive = sizeFilter !== 'all' || ingredientFilter !== 'all' || searchQuery !== '';
    const activeBtnClasses = "bg-orange-600 text-white";
    const inactiveBtnClasses = "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]";

    return (
        <div className="pt-20 sm:pt-24 md:pt-32 bg-[#0a0a0a] min-h-screen">
            <section className="relative hero-bg bg-cover bg-center py-16 sm:py-20 md:py-32">
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white">Nuestra Carta</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto px-4">
                        Un viaje de sabor em cada bocado. Ingredientes frescos, masa artesanal y pasión en nuestro horno.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-20">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 md:p-6 shadow-lg space-y-4 sm:space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Buscar</h3>
                            {areFiltersActive && (
                                <button
                                    onClick={handleClearFilters}
                                    className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors focus:outline-none"
                                    aria-label="Limpiar filtros de búsqueda"
                                >
                                    Limpiar Filtros
                                </button>
                            )}
                        </div>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-gray-500" />
                           </span>
                           <input
                                type="text"
                                placeholder="Buscar por nombre o ingrediente..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#2a2a2a] border border-gray-700 text-gray-300 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500 transition-colors"
                           />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Tamaño</h3>
                            {filteredMenu.length > 0 && (
                                <button
                                    onClick={handleAddFilteredToOrder}
                                    className="flex items-center space-x-1 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors focus:outline-none"
                                    aria-label="Añadir todos los artículos filtrados al pedido"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Añadir Todos</span>
                                </button>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setSizeFilter('all')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${sizeFilter === 'all' ? activeBtnClasses : inactiveBtnClasses}`}>Todas</button>
                            <button onClick={() => setSizeFilter('clásica')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${sizeFilter === 'clásica' ? activeBtnClasses : inactiveBtnClasses}`}>Clásica</button>
                            <button onClick={() => setSizeFilter('individual')} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${sizeFilter === 'individual' ? activeBtnClasses : inactiveBtnClasses}`}>Individual</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Ingrediente Principal</h3>
                            {filteredMenu.length > 0 && (
                                <button
                                    onClick={handleAddFilteredToOrder}
                                    className="flex items-center space-x-1 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors focus:outline-none"
                                    aria-label="Añadir todos los artículos filtrados al pedido"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Añadir Todos</span>
                                </button>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-2 px-2">
                            {ingredientOptions.map(ingredient => (
                                <button key={ingredient} onClick={() => setIngredientFilter(ingredient)} className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 capitalize flex-shrink-0 ${ingredientFilter === ingredient ? activeBtnClasses : inactiveBtnClasses}`}>
                                    {ingredient === 'all' ? 'Todos' : ingredient}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="full-menu" className="py-8 sm:py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl pb-20 sm:pb-24"> {/* Added padding-bottom */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 md:p-8">
                        <div className="divide-y divide-gray-800">
                            {filteredMenu.length > 0 ? (
                                filteredMenu.map((item, index) => (
                                    <MenuItemCard 
                                        key={index} 
                                        item={item} 
                                        quantity={order[item.name] || 0}
                                        onAddToOrder={onAddToOrder}
                                        onRemoveFromOrder={onRemoveFromOrder}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-400 py-12">
                                    No se encontraron pizzas que coincidan con tu búsqueda.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Order Button */}
            {totalItems > 0 && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-2 px-4">
                    <button
                        onClick={onClearOrder}
                        className="bg-red-600 text-white rounded-full shadow-2xl shadow-black/50 hover:bg-red-500 transition-all duration-300 transform hover:scale-105 animate-fade-in-pop px-3 py-2 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider"
                        aria-label="Vaciar carrito"
                    >
                        Vaciar Carrito
                    </button>
                    <a
                        href="#/delivery"
                        className="flex items-center justify-between bg-orange-600 text-white rounded-full shadow-2xl shadow-black/50 hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 animate-fade-in-pop w-full max-w-xs sm:max-w-sm"
                    >
                        <div className="flex items-center pl-3 pr-2 py-2 sm:pl-4 sm:pr-3">
                            <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                                {totalItems}
                            </span>
                        </div>
                        <span className="font-bold uppercase tracking-wider text-xs sm:text-sm px-2">
                            Realizar Pedido
                        </span>
                        <span className="font-bold text-xs sm:text-sm bg-black/20 rounded-r-full px-3 py-3 ml-2 sm:ml-4">
                            ${totalCost.toFixed(2)}
                        </span>
                    </a>
                </div>
            )}
        </div>
    );
};

export default MenuPage;