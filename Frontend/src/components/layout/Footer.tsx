
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-aero-navy text-white pt-12 pb-8">
      <div className="aero-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-aero-lightBlue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lost-luggage" className="hover:text-aero-lightBlue transition-colors">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link to="/found-luggage" className="hover:text-aero-lightBlue transition-colors">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/qr-scanner" className="hover:text-aero-lightBlue transition-colors">
                  QR Scanner
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-aero-lightBlue transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-aero-lightBlue transition-colors">
                  Airport Services
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-aero-lightBlue transition-colors">
                  Flight Management
                </Link>
              </li>
              <li>
                <Link to="/transportation" className="hover:text-aero-lightBlue transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/dining" className="hover:text-aero-lightBlue transition-colors">
                  Dining Options
                </Link>
              </li>
              <li>
                <Link to="/shopping" className="hover:text-aero-lightBlue transition-colors">
                  Duty Free Shopping
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">AeroX International Airport</p>
              <p className="mb-2">Terminal 1, Level 3</p>
              <p className="mb-2">Lost & Found Department</p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:lostandfound@aerox.com"
                  className="hover:text-aero-lightBlue transition-colors"
                >
                  lostandfound@aerox.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+11234567890"
                  className="hover:text-aero-lightBlue transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-aero-blue/30 text-center">
          <p>© {new Date().getFullYear()} AeroX Journey Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
