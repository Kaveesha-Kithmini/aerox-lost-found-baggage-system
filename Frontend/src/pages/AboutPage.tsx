
import React from "react";
import PageLayout from "@/components/layout/PageLayout";

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="aero-container py-12">
        <h1 className="text-3xl font-bold text-aero-navy mb-6">About AeroX</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-aero-navy mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At AeroX, our mission is to enhance the airport experience by providing integrated
            solutions that streamline processes, reduce wait times, and create a more enjoyable
            journey for all travelers.
          </p>
          <p className="text-gray-700 mb-4">
            Our Lost and Found Luggage Management System is designed to efficiently reconnect
            passengers with their belongings through innovative technology and simplified processes.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-aero-navy mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            We envision a future where airport experiences are seamless, efficient, and 
            stress-free. By centralizing and automating airport processes, we aim to transform
            how travelers interact with airport services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-aero-navy mb-4">Our Technology</h2>
          <p className="text-gray-700 mb-4">
            Using cutting-edge QR-based tracking and matching algorithms, AeroX's Lost and Found 
            system can quickly identify and reunite passengers with their lost items.
          </p>
          <p className="text-gray-700">
            Our platform is built on modern web technologies, ensuring security, scalability,
            and an intuitive user experience across all devices.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
