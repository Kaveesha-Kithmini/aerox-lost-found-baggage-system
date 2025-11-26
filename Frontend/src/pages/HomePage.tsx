import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import airportLuggage from '@/assets/airport-luggage.jpg';
import LuggageWrappingImg from '@/assets/Luggage-Wrapping.jpg';
import ExpressLostReportsImg from '@/assets/Express-Lost-Reports.jpg';
import RealTimeLuggageTrackingImg from '@/assets/Real-Time-Luggage-Tracking.jpg';
import PriorityClaimAssistanceImg from '@/assets/Priority-Claim-Assistance.jpg';

const services = [
  {
    title: 'Luggage Wrapping',
    desc: 'Protect your luggage with secure wrapping at the airport.',
    image: LuggageWrappingImg,
  },
  {
    title: 'Express Lost Report',
    desc: 'Quickly file a lost luggage report with our streamlined process.',
    image: ExpressLostReportsImg,
  },
  {
    title: 'Real-Time Luggage Tracking',
    desc: 'Track your lost luggage status in real time through our portal.',
    image: RealTimeLuggageTrackingImg,
  },
  {
    title: 'Priority Claim Assistance',
    desc: 'Get dedicated support for faster claim and recovery of your luggage.',
    image: PriorityClaimAssistanceImg,
  },
];

const HomePage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else if (window.innerWidth < 1280) setCardsToShow(3);
      else setCardsToShow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visible = [];
  for (let i = 0; i < cardsToShow; i++) {
    visible.push(services[(current + i) % services.length]);
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div style={{
          backgroundImage: `url(${airportLuggage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '550px',
        }} className="absolute inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-aero-navy/80 z-10" style={{ minHeight: '550px' }} />
        <div className="relative z-20 bg-transparent text-white py-36">
        <div className="aero-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Lost & Found Luggage Management System
            </h1>
            <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Helping passengers reconnect with their belongings efficiently and securely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="bg-aero-blue hover:bg-aero-blue/90">
                <Link to="/lost-luggage">Report Lost Luggage</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/found-luggage">Report Found Luggage</Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="aero-section bg-aero-lightBlue">
        <div className="aero-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-aero-navy">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aero-card text-center">
              <div className="w-16 h-16 bg-aero-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-aero-navy">Report Item</h3>
              <p className="text-gray-600">
                Submit a detailed report about your lost luggage or an item you've found at the airport.
              </p>
            </div>
            <div className="aero-card text-center">
              <div className="w-16 h-16 bg-aero-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-aero-navy">QR Tracking</h3>
              <p className="text-gray-600">
                Luggage is identified using QR codes, making the tracking and matching process faster and more accurate.
              </p>
            </div>
            <div className="aero-card text-center">
              <div className="w-16 h-16 bg-aero-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-aero-navy">Claim Process</h3>
              <p className="text-gray-600">
                Once a match is found, verify your identity to claim your belongings through our secure verification system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Services Section */}
      <section className="py-16 bg-white">
        <div className="aero-container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-aero-navy">
            Value Added Services
          </h2>
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setCurrent((current - 1 + services.length) % services.length)} className="rounded-full bg-blue-900 text-white w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-blue-700 transition-all">&#8592;</button>
            <div className="flex gap-8 overflow-x-hidden w-full max-w-5xl justify-center">
              {visible.map((service, idx) => (
                <div key={service.title} className="bg-white rounded-2xl shadow-lg shadow-blue-500/20 w-80 flex-shrink-0 flex flex-col items-center p-6 border border-blue-100" style={{ minHeight: 370 }}>
                  <div className="w-full h-40 bg-white/40 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-lg font-bold text-aero-blue mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{service.desc}</p>
                  <Button className="bg-aero-blue hover:bg-aero-blue/90 w-full">Find out more</Button>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrent((current + 1) % services.length)} className="rounded-full bg-blue-900 text-white w-10 h-10 flex items-center justify-center text-2xl shadow hover:bg-blue-700 transition-all">&#8594;</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="aero-section">
        <div className="aero-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-aero-navy">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="mr-4 flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-aero-navy rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-aero-navy">Easy Reporting</h3>
                <p className="text-gray-600">
                  Simplified digital forms to report lost or found items with comprehensive details to improve matching accuracy.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-aero-navy rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-aero-navy">QR Code System</h3>
                <p className="text-gray-600">
                  Advanced QR code tracking system to quickly identify luggage and match it with its owner.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-aero-navy rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-aero-navy">Instant Notifications</h3>
                <p className="text-gray-600">
                  Receive real-time updates on your lost luggage status through email and SMS notifications.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-aero-navy rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-aero-navy">Secure Verification</h3>
                <p className="text-gray-600">
                  Multi-step verification process to ensure luggage is returned to its rightful owner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="aero-section bg-aero-navy text-white">
        <div className="aero-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Report or Find Your Item?</h2>
            <p className="text-xl mb-8">
              Start using our comprehensive lost and found service to quickly recover your belongings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-aero-blue hover:bg-aero-blue/90">
                <Link to="/lost-luggage">Report Lost Luggage</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/qr-scanner">Scan QR Code</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
