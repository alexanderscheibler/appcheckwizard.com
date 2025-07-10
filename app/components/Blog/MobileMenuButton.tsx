import { Menu, X } from 'lucide-react'

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function MobileMenuButton({ isMenuOpen, toggleMenu }: MobileMenuButtonProps) {
  return (
    <div className="md:hidden" data-testid="mobile-menu-div">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        data-testid="mobile-menu-button"
      >
        <span className="sr-only">Open main menu</span>
        {isMenuOpen ? (
          <X className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
