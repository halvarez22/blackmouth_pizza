
import React from 'react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
          <a href="#" className="hover:text-white transition-colors"><FacebookIcon className="w-6 h-6" /></a>
          <a href="https://wa.me/772444974" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><WhatsAppIcon className="w-6 h-6" /></a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Blackmouth Pizzeria. Todos los derechos reservados.</p>
        <p className="text-xs mt-2">
            Powered by <a href="https://www.pai-b.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">pai-b</a> © 2025. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;