
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Your message has been sent. We'll get back to you soon!");
  };

  return (
    <PageLayout>
      <div className="aero-container py-12">
        <h1 className="text-3xl font-bold text-aero-navy mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-aero-navy mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Enter subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-aero-navy hover:bg-aero-navy/90">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-aero-navy mb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-aero-navy mb-2">Airport Location</h3>
                <p className="text-gray-700">
                  AeroX International Airport<br />
                  Terminal 1, Level 3<br />
                  Lost & Found Department
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-aero-navy mb-2">Contact Details</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:lostandfound@aerox.com" className="text-aero-blue hover:underline">lostandfound@aerox.com</a><br />
                  Phone: <a href="tel:+11234567890" className="text-aero-blue hover:underline">+1 (123) 456-7890</a>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-aero-navy mb-2">Operating Hours</h3>
                <p className="text-gray-700">
                  Monday to Friday: 8:00 AM - 10:00 PM<br />
                  Saturday & Sunday: 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
