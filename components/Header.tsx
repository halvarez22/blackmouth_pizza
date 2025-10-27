import React, { useState, useEffect } from 'react';

const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

interface HeaderProps {
    totalItems: number;
    totalCost: number;
}

const Header: React.FC<HeaderProps> = ({ totalItems = 0, totalCost = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleHashChange = () => {
        setRoute(window.location.hash);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isSubPage = route === '#/reservas' || route === '#/menu';

  const logoUrl = '/images/Logo.png';

  const navLinks = [
    { name: 'Nuestra Esencia', href: '#about' },
    { name: 'Obras Maestras', href: '#menu' },
    { name: 'Carta', href: '#/menu' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Reservas', href: '#/reservas' },
    { name: 'A Domicilio', href: '#/delivery' },
    { name: 'Contacto', href: '#contact' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isSubPage ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        <a href={isSubPage ? '/#' : '#'} aria-label="Blackmouth Pizzeria Home">
          <img src={logoUrl} alt="Blackmouth Pizzeria Logo" className="h-10 sm:h-12 md:h-14" />
        </a>

        <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                  // If we are on a sub-page, anchor links need to point to the homepage first.
                  const href = isSubPage && link.href.startsWith('#') && !link.href.startsWith('#/') ? `/${link.href}` : link.href;
                  return (
                    <a
                      key={link.name}
                      href={href}
                      className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium uppercase tracking-widest"
                    >
                      {link.name}
                    </a>
                  );
                }
              )}
            </nav>

             {/* Order total display - Desktop */}
            {totalItems > 0 && (
                <div className="hidden md:flex items-center bg-black border border-orange-600 text-orange-300 rounded-full pl-3 pr-4 py-2 ml-4 lg:ml-6 animate-fade-in-pop">
                    <div className="relative mr-3">
                        <ShoppingCartIcon className="w-5 h-5" />
                        <span
                            className="absolute -top-2 -right-2 flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5"
                            aria-label={`${totalItems} items in cart`}
                        >
                            {totalItems}
                        </span>
                    </div>
                    <span className="font-bold text-sm tracking-wider">${totalCost.toFixed(2)}</span>
                </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-orange-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => {
                const href = isSubPage && link.href.startsWith('#') && !link.href.startsWith('#/') ? `/${link.href}` : link.href;
                return (
                  <a
                    key={link.name}
                    href={href}
                    className="block text-white hover:text-orange-400 transition-colors duration-300 text-base font-medium uppercase tracking-widest py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              }
            )}

            {/* Order total display - Mobile */}
            {totalItems > 0 && (
              <div className="flex items-center bg-black border border-orange-600 text-orange-300 rounded-full pl-3 pr-4 py-2 mt-4">
                  <div className="relative mr-3">
                      <ShoppingCartIcon className="w-5 h-5" />
                      <span
                          className="absolute -top-2 -right-2 flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5"
                          aria-label={`${totalItems} items in cart`}
                      >
                          {totalItems}
                      </span>
                  </div>
                  <span className="font-bold text-sm tracking-wider">${totalCost.toFixed(2)}</span>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;