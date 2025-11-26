import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '@/components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';

interface PassengerDetails {
  objectId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
}

const QrCodeGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    objectId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    email: "",
    phoneNumber: ""
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string>('');

  // Validate form whenever passengerDetails changes
  useEffect(() => {
    const isValid = 
      passengerDetails.firstName.trim() !== '' &&
      passengerDetails.lastName.trim() !== '' &&
      passengerDetails.dateOfBirth.trim() !== '' &&
      passengerDetails.nationality.trim() !== '' &&
      passengerDetails.passportNumber.trim() !== '' &&
      passengerDetails.email.trim() !== '' &&
      passengerDetails.phoneNumber.trim() !== '';
    
    setIsFormValid(isValid);
    
    if (isValid) {
      setQrCodeData(JSON.stringify(passengerDetails));
    } else {
      setQrCodeData('');
    }
  }, [passengerDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/flightbooking_models/${passengerDetails.objectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      const data = await response.json();
      if (!data || !data.passengersDetails || !Array.isArray(data.passengersDetails) || data.passengersDetails.length === 0) {
        alert('No passenger details found for this Object ID.');
        return;
      }
      // Extract the first passenger and contact info
      const passenger = data.passengersDetails[0] || {};
      const contact = data.contactInfo || {};
      setPassengerDetails(prev => ({
        ...prev,
        firstName: passenger.firstName || "",
        lastName: passenger.lastName || "",
        dateOfBirth: passenger.dateOfBirth ? passenger.dateOfBirth.slice(0, 10) : "",
        nationality: passenger.nationality || "",
        passportNumber: passenger.passportNumber || "",
        email: contact.email || "",
        phoneNumber: contact.phoneNumber || ""
      }));
    } catch (error) {
      console.error('Error fetching details:', error);
      alert('Failed to fetch details. Please check the Object ID and try again.');
    }
  };

  const downloadQRCode = () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Please fill in all fields before downloading the QR code.",
        variant: "destructive",
      });
      return;
    }

    const svg = document.getElementById('qr-code') as unknown as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `passenger-qr-${passengerDetails.firstName}-${passengerDetails.lastName}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        toast({
          title: "Success",
          description: "QR code downloaded successfully!",
        });
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const sendQrToEmail = async () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Please fill in all fields before sending the QR code.",
        variant: "destructive",
      });
      return;
    }
    const svg = document.getElementById('qr-code') as unknown as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        // Send to backend
        const response = await fetch('http://localhost:3001/api/send-qr-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: passengerDetails.email,
            qrImage: pngUrl
          })
        });
        if (response.ok) {
          toast({ title: "Success", description: "QR code sent to email!" });
        } else {
          toast({ title: "Error", description: "Failed to send QR code." });
        }
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="mb-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-center">Generate Passenger QR Code</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="objectId">Object ID *</Label>
                <Input
                  id="objectId"
                  name="objectId"
                  value={passengerDetails.objectId}
                  onChange={handleInputChange}
                  placeholder="Enter object ID"
                  required
                />
              </div>
              <Button
                variant="default"
                onClick={handleFetchDetails}
                className="h-10"
              >
                Fetch Details
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Passenger Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={passengerDetails.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={passengerDetails.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={passengerDetails.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={passengerDetails.nationality}
                      onChange={handleInputChange}
                      placeholder="Enter nationality"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="passportNumber">Passport Number *</Label>
                    <Input
                      id="passportNumber"
                      name="passportNumber"
                      value={passengerDetails.passportNumber}
                      onChange={handleInputChange}
                      placeholder="Enter passport number"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={passengerDetails.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={passengerDetails.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Generated QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  {isFormValid ? (
                    <>
                      <QRCodeSVG
                        id="qr-code"
                        value={qrCodeData}
                        size={256}
                        level="H"
                        includeMargin={true}
                      />
                      <Button
                        onClick={downloadQRCode}
                        className="w-full"
                      >
                        Download QR Code
                      </Button>
                      <Button
                        onClick={sendQrToEmail}
                        className="w-full mt-2"
                      >
                        Send QR to Email
                      </Button>
                      <div className="text-sm text-gray-600">
                        <p>Scan this QR code to view passenger details</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>Fill in all the required fields to generate QR code</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QrCodeGeneratorPage; 