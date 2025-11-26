import React from 'react';
import QRCode from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PassengerDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
}

const mockPassengers: PassengerDetails[] = [
  {
    firstName: "Rusiru",
    lastName: "Devinda",
    dateOfBirth: "2025-03-30",
    nationality: "Sri Lankan",
    passportNumber: "hehehe123",
    email: "user@example.com",
    phoneNumber: "+942345678234"
  },
  {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
    nationality: "American",
    passportNumber: "US123456",
    email: "john.doe@example.com",
    phoneNumber: "+12125551234"
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    dateOfBirth: "1985-11-20",
    nationality: "Spanish",
    passportNumber: "ES789012",
    email: "maria.garcia@example.com",
    phoneNumber: "+34678901234"
  }
];

const QrCodeGenerator: React.FC = () => {
  const downloadQRCode = (passenger: PassengerDetails, index: number) => {
    const canvas = document.getElementById(`qr-code-${index}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `passenger-qr-${index + 1}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Passenger QR Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPassengers.map((passenger, index) => (
          <Card key={index} className="p-4">
            <CardHeader>
              <CardTitle>{`${passenger.firstName} ${passenger.lastName}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <QRCode
                  id={`qr-code-${index}`}
                  value={JSON.stringify(passenger)}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <Button
                  onClick={() => downloadQRCode(passenger, index)}
                  className="w-full"
                >
                  Download QR Code
                </Button>
                <div className="text-sm text-gray-600">
                  <p>Passport: {passenger.passportNumber}</p>
                  <p>Email: {passenger.email}</p>
                  <p>Phone: {passenger.phoneNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QrCodeGenerator; 