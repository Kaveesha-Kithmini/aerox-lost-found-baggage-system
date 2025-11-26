import React, { useState, useCallback, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';

interface PassengerDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
}

const QrScannerPage: React.FC = () => {
  const { toast } = useToast();
  const [scanResult, setScanResult] = useState<PassengerDetails | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const navigate = useNavigate();
  const qrReaderRef = useRef<QrScanner>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScan = useCallback((result: any) => {
    if (result) {
      try {
        console.log('Scanned QR code data:', result.text);
        const passengerData = JSON.parse(result.text) as PassengerDetails;
        setScanResult(passengerData);
        setIsScanning(false);
        toast({
          title: "Success",
          description: "Passenger details scanned successfully!",
        });
      } catch (error) {
        console.error('Error parsing QR code data:', error);
        toast({
          title: "Error",
          description: "Invalid QR code format. Please scan a valid passenger QR code.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleError = useCallback((error: Error) => {
    console.error('QR Scanner Error:', error);
    toast({
      title: "Error",
      description: "Error scanning QR code. Please try again.",
      variant: "destructive",
    });
  }, [toast]);

  const processQRCodeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) {
            reject(new Error('Canvas not found'));
            return;
          }
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Clear canvas and draw image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          try {
            // Get image data and process with jsQR
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
              console.log('QR code data found:', code.data);
              resolve(code.data);
            } else {
              reject(new Error('No QR code found in image'));
            }
          } catch (error) {
            console.error('Error processing image data:', error);
            reject(new Error('Error processing QR code image'));
          }
        };
        img.onerror = () => reject(new Error('Error loading image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(file);
    });
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        console.log('Processing uploaded QR code image...');
        const qrData = await processQRCodeImage(file);
        console.log('QR code data:', qrData);
        
        try {
          const passengerData = JSON.parse(qrData) as PassengerDetails;
          setScanResult(passengerData);
          setIsScanning(false);
          toast({
            title: "Success",
            description: "Passenger details uploaded successfully!",
          });
        } catch (parseError) {
          console.error('Error parsing QR code data:', parseError);
          toast({
            title: "Error",
            description: "Invalid QR code format. Please upload a valid passenger QR code.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        toast({
          title: "Error",
          description: "Could not read QR code from image. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      try {
        console.log('Processing dropped QR code image...');
        const qrData = await processQRCodeImage(file);
        console.log('QR code data:', qrData);
        
        try {
          const passengerData = JSON.parse(qrData) as PassengerDetails;
          setScanResult(passengerData);
          toast({
            title: "Success",
            description: "Passenger details uploaded successfully!",
          });
        } catch (parseError) {
          console.error('Error parsing QR code data:', parseError);
          toast({
            title: "Error",
            description: "Invalid QR code format. Please upload a valid passenger QR code.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        toast({
          title: "Error",
          description: "Could not read QR code from image. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const ScannerComponent = () => (
    <div className="relative aspect-square">
      {isScanning && (
        <QrScanner
          ref={qrReaderRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      )}
    </div>
  );

  const UploadComponent = () => (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center space-y-2">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600">Click to select a QR code image or drag and drop here</p>
        <p className="text-sm text-gray-500">Supported formats: PNG, JPG, JPEG</p>
      </div>
    </div>
  );

  const ResultComponent = () => (
    scanResult && (
      <div className="space-y-6">
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-aero-navy p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold text-white">Passenger Information</CardTitle>
              <CardDescription className="text-gray-200">Details retrieved from QR code</CardDescription>
            </CardHeader>
          </div>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Full Name</h3>
                  <p className="text-lg font-semibold text-gray-900">{`${scanResult.firstName} ${scanResult.lastName}`}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Passport Number</h3>
                  <p className="text-lg font-semibold text-gray-900">{scanResult.passportNumber}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Nationality</h3>
                  <p className="text-lg font-semibold text-gray-900">{scanResult.nationality}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Date of Birth</h3>
                  <p className="text-lg font-semibold text-gray-900">{new Date(scanResult.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-medium text-gray-900">{scanResult.email}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg font-medium text-gray-900">{scanResult.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Verification Status</h3>
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={resetScanner}
            className="flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Scan Another QR Code</span>
          </Button>
        </div>
      </div>
    )
  );

  return (
    <PageLayout>
      <div className="aero-container py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-aero-navy">Passenger QR Code Scanner</CardTitle>
              <CardDescription>
                Scan the QR code on lost luggage to retrieve passenger information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!scanResult && (
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    variant={!isFileUpload ? "default" : "outline"}
                    onClick={() => {
                      setIsFileUpload(false);
                      setIsScanning(true);
                    }}
                  >
                    Scan QR Code
                        </Button>
                  <Button
                    variant={isFileUpload ? "default" : "outline"}
                    onClick={() => {
                      setIsFileUpload(true);
                      setIsScanning(false);
                    }}
                  >
                    Upload QR Code
                        </Button>
                      </div>
              )}

              {!scanResult && (isFileUpload ? <UploadComponent /> : <ScannerComponent />)}
              <canvas ref={canvasRef} className="hidden" />
              {scanResult && <ResultComponent />}

              {!scanResult && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold text-aero-navy mb-3">Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Use the camera scanner or upload a QR code image</li>
                  <li>Make sure the QR code is clearly visible and well-lit</li>
                  <li>Hold your device steady while scanning</li>
                    <li>Once scanned, the system will display the passenger information</li>
                    <li>Use this information to match with lost luggage reports</li>
                    <li>Proceed with the verification process before releasing the luggage</li>
                </ol>
              </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default QrScannerPage;
