import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-aero-navy text-white">
      <div className="aero-container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              AeroX
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="header-link">
              Home
            </Link>
            <Link to="/lost-luggage" className="header-link">
              Report Lost
            </Link>
            <Link to="/found-luggage" className="header-link">
              Report Found
            </Link>
            <Link to="/qr-scanner" className="header-link">
              QR Scanner
            </Link>
            <Link to="/about" className="header-link">
              About
            </Link>
            <Link to="/contact" className="header-link">
              Contact
            </Link>
            <Button asChild variant="outline" className="bg-aero-blue text-white border-aero-blue hover:bg-aero-blue/90">
              <Link to="/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/lost-luggage"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Report Lost
              </Link>
              <Link
                to="/found-luggage"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Report Found
              </Link>
              <Link
                to="/qr-scanner"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                QR Scanner
              </Link>
              <Link
                to="/about"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="header-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild variant="outline" className="bg-aero-blue text-white border-aero-blue hover:bg-aero-blue/90 w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
