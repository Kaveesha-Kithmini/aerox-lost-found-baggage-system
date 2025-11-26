import { useEffect, useState } from "react";
import { lostLuggageApi, foundLuggageApi, LostLuggageFormData, FoundLuggageFormData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UpdateLuggageModal } from "../components/UpdateLuggageModal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface LostLuggage extends LostLuggageFormData {
  bagDescription: string;
  _id: string;
  createdAt: string;
  dateOfLoss: string;
  lastSeenLocation: string;
  bagImage?: string;
  whatsappNumber: string;
}

interface FoundLuggage extends FoundLuggageFormData {
  _id: string;
  createdAt: string;
  whatsappNumber?: string;
}

interface LostLuggageReport {
  id: string;
  passengerName: string;
  passengerId: string;
  email: string;
  phone: string;
  airline: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  bagSize: string;
  bagColor: string;
  bagBrand: string;
  uniqueIdentifiers: string;
  dateOfLoss: string;
  lastSeenLocation: string;
  status: 'pending' | 'resolved' | 'Pending' | 'Matched' | 'Claimed';
  qrCodeImage: string;
  bagImage: string;
  whatsappNumber: string;
}

interface ReportDetailsDialogProps {
  report: LostLuggageReport;
  onClose: () => void;
  onStatusChange: (reportId: string, newStatus: 'pending' | 'resolved') => void;
}

const AdminDashboard: React.FC = () => {
  const [lostLuggageData, setLostLuggageData] = useState<LostLuggage[]>([]);
  const [foundLuggageData, setFoundLuggageData] = useState<FoundLuggage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("lost");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedLuggage, setSelectedLuggage] = useState<FoundLuggage | LostLuggage | null>(null);
  const [filters, setFilters] = useState({
    date: "",
    color: "all",
    status: "all",
    location: "all"
  });
  const { toast } = useToast();
  const [reports, setReports] = useState<LostLuggageReport[]>([]);

  const fetchLostLuggage = async () => {
    try {
      console.log("Fetching lost luggage data...");
      const response = await lostLuggageApi.getAllLostItems();
      console.log("Lost luggage response:", response.data);
      
      const formattedData = response.data.map((item: any) => ({
        _id: item._id,
        passengerName: item.passengerName,
        passengerId: item.passengerId,
        email: item.email,
        phone: item.phone,
        airline: item.airline,
        flightNumber: item.flightNumber,
        flightDate: item.flightDate,
        flightTime: item.flightTime,
        bagSize: item.bagSize,
        bagColor: item.bagColor,
        bagBrand: item.bagBrand,
        uniqueIdentifiers: item.uniqueIdentifiers,
        status: item.status || 'Pending',
        createdAt: item.createdAt,
        dateOfLoss: item.dateOfLoss,
        lastSeenLocation: item.lastSeenLocation,
        bagImage: item.bagImage,
        qrCodeImage: item.qrCodeImage,
        whatsappNumber: item.whatsappNumber || ""
      }));
      
      console.log("Formatted lost luggage data:", formattedData);
      setLostLuggageData(formattedData);
    } catch (error) {
      console.error('Error fetching lost luggage data:', error);
      toast({
        title: "Error",
        description: "Failed to load lost luggage reports",
        variant: "destructive",
      });
    }
  };

  const fetchFoundLuggage = async () => {
    try {
      const response = await foundLuggageApi.getAllFoundItems();
      const formattedData = response.data.map((item: any) => ({
        _id: item._id,
        finderName: item.finderName,
        phone: item.phone,
        email: item.email,
        location: item.location,
        findDate: item.findDate,
        findTime: item.findTime,
        bagDescription: item.bagDescription,
        bagColor: item.bagColor,
        bagSize: item.bagSize,
        qrCodeImage: item.qrCodeImage,
        bagImage: item.bagImage,
        status: item.status || 'Unmatched',
        createdAt: item.createdAt,
        whatsappNumber: item.whatsappNumber
      }));
      setFoundLuggageData(formattedData);
    } catch (error) {
      console.error('Error fetching found luggage:', error);
      toast({
        title: "Error",
        description: "Failed to fetch found luggage data",
        variant: "destructive",
      });
    }
  };

  const handleViewLost = (item: LostLuggage) => {
    toast({
      title: "Lost Luggage Details",
      description: (
        <div className="mt-2 space-y-2">
          <div><strong>Passenger:</strong> {item.passengerName}</div>
          <div><strong>Flight:</strong> {item.airline} {item.flightNumber}</div>
          <div><strong>Date:</strong> {new Date(item.flightDate).toLocaleDateString()}</div>
          <div><strong>Status:</strong> {item.status}</div>
          <div><span className="font-medium">Whatsapp:</span> {item.whatsappNumber}</div>
        </div>
      ),
    });
  };

  const handleMatchLost = async (item: LostLuggage) => {
    try {
      await lostLuggageApi.updateLostItem(item._id, { status: 'Matched' });
      fetchLostLuggage();
      toast({
        title: "Success",
        description: "Lost luggage marked as matched",
      });
    } catch (error) {
      console.error('Error matching lost luggage:', error);
      toast({
        title: "Error",
        description: "Failed to update lost luggage status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLost = async (item: LostLuggage) => {
    try {
      await lostLuggageApi.deleteLostItem(item._id);
      fetchLostLuggage();
      toast({
        title: "Success",
        description: "Lost luggage deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting lost luggage:', error);
      toast({
        title: "Error",
        description: "Failed to delete lost luggage",
        variant: "destructive",
      });
    }
  };

  const handleViewFound = (item: FoundLuggage) => {
    toast({
      title: "Found Luggage Details",
      description: (
        <div className="mt-2 space-y-2">
          <div><strong>Finder:</strong> {item.finderName}</div>
          <div><strong>Location:</strong> {item.location}</div>
          <div><strong>Date Found:</strong> {new Date(item.findDate).toLocaleDateString()}</div>
          <div><strong>Status:</strong> {item.status}</div>
          <div><span className="font-medium">Whatsapp:</span> {item.whatsappNumber}</div>
        </div>
      ),
    });
  };

  const handleMatchFound = async (item: FoundLuggage) => {
    try {
      await foundLuggageApi.updateFoundItem(item._id, { status: 'Matched' });
      fetchFoundLuggage();
      toast({
        title: "Success",
        description: "Found luggage marked as matched",
      });
    } catch (error) {
      console.error('Error matching found luggage:', error);
      toast({
        title: "Error",
        description: "Failed to update found luggage status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFound = async (item: FoundLuggage) => {
    try {
      await foundLuggageApi.deleteFoundItem(item._id);
      fetchFoundLuggage();
      toast({
        title: "Success",
        description: "Found luggage deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting found luggage:', error);
      toast({
        title: "Error",
        description: "Failed to delete found luggage",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await lostLuggageApi.getLostItemById(id);
      setSelectedLuggage(response.data);
      setUpdateModalOpen(true);
    } catch (error) {
      console.error('Error getting luggage details:', error);
      toast({
        title: "Error",
        description: "Failed to get luggage details",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFound = (item: FoundLuggage) => {
    if (!item) return;
    
    const formattedItem: FoundLuggage = {
      ...item,
      findDate: item.findDate?.split('T')[0] || '', // Format: YYYY-MM-DD
      findTime: item.findTime || '00:00', // Default time if not set
      bagSize: item.bagSize || 'Medium', // Default size if not set
      status: item.status || 'Unmatched', // Default status if not set
    };
    setSelectedLuggage(formattedItem);
    setUpdateModalOpen(true);
  };

  const handleUpdateLost = (item: LostLuggage) => {
    if (!item) return;
    
    const formattedItem: LostLuggage = {
      _id: item._id,
      passengerName: item.passengerName || '',
      passengerId: item.passengerId || '',
      email: item.email || '',
      phone: item.phone || '',
      airline: item.airline || '',
      flightNumber: item.flightNumber || '',
      flightDate: item.flightDate ? new Date(item.flightDate).toISOString().split('T')[0] : '',
      flightTime: item.flightTime || '',
      bagDescription: item.bagDescription || '',
      bagColor: item.bagColor || '',
      bagSize: item.bagSize || 'Medium',
      bagBrand: item.bagBrand || '',
      uniqueIdentifiers: item.uniqueIdentifiers || '',
      status: item.status || 'Pending',
      createdAt: "",
      dateOfLoss: item.dateOfLoss,
      lastSeenLocation: item.lastSeenLocation,
      bagImage: item.bagImage,
      qrCodeImage: item.qrCodeImage,
      whatsappNumber: item.whatsappNumber || ""
    };

    console.log('Updating lost luggage with data:', formattedItem);
    setSelectedLuggage(formattedItem);
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (data: any) => {
    try {
      if (!selectedLuggage?._id) {
        throw new Error('No luggage selected for update');
      }

      if ('flightDate' in selectedLuggage) {
        // Handle lost luggage update
        const formattedData = {
          ...data,
          flightDate: data.flightDate ? new Date(data.flightDate).toISOString() : undefined,
          flightTime: data.flightTime || '',
          airline: data.airline || '',
          flightNumber: data.flightNumber || '',
          passengerName: data.passengerName || '',
          passengerId: data.passengerId || '',
          email: data.email || '',
          phone: data.phone || '',
          bagColor: data.bagColor || '',
          bagSize: data.bagSize || 'Medium',
          bagBrand: data.bagBrand || '',
          uniqueIdentifiers: data.uniqueIdentifiers || '',
          status: data.status || 'Pending'
        };
        console.log('Submitting lost luggage update:', formattedData);
        await lostLuggageApi.updateLostItem(selectedLuggage._id, formattedData);
        await fetchLostLuggage(); // Refresh the table
      } else {
        // Handle found luggage update
        const formattedData = {
          finderName: data.finderName || selectedLuggage.finderName || '',
          phone: data.phone || selectedLuggage.phone || '',
          location: data.location || selectedLuggage.location || '',
          findDate: data.findDate || selectedLuggage.findDate || '',
          findTime: data.findTime || selectedLuggage.findTime || '',
          bagDescription: data.bagDescription || (selectedLuggage as any).bagDescription || '',
          bagColor: data.bagColor || selectedLuggage.bagColor || '',
          bagSize: data.bagSize || selectedLuggage.bagSize || 'Medium',
          status: data.status || selectedLuggage.status || 'Unmatched',
          bagImage: selectedLuggage.bagImage,
          qrCodeImage: selectedLuggage.qrCodeImage
        };
        console.log('Submitting found luggage update:', formattedData);
        await foundLuggageApi.updateFoundItem(selectedLuggage._id, formattedData);
        await fetchFoundLuggage();
      }

      setUpdateModalOpen(false);
      setSelectedLuggage(null);
      toast({
        title: "Success",
        description: "Luggage details updated successfully",
      });
    } catch (error) {
      console.error('Error updating luggage:', error);
      toast({
        title: "Error",
        description: "Failed to update luggage details: " + (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const generateReport = () => {
    try {
      const doc = new jsPDF('landscape');
      const currentDate = new Date().toLocaleDateString();
      
      // Add title and header
      doc.setFontSize(24);
      doc.setTextColor(0, 48, 87); // Aero navy color
      doc.text("Luggage Report", 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${currentDate}`, 20, 30);

      // Add summary section
      doc.setFontSize(16);
      doc.setTextColor(0, 48, 87);
      doc.text("Summary", 20, 45);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const totalLost = lostLuggageData.length;
      const totalFound = foundLuggageData.length;
      const totalMatched = lostLuggageData.filter(item => item.status === "Matched").length;
      const totalPending = lostLuggageData.filter(item => item.status === "Pending").length;

      doc.text([
        `Total Lost Items: ${totalLost}`,
        `Total Found Items: ${totalFound}`,
        `Matched Items: ${totalMatched}`,
        `Pending Items: ${totalPending}`
      ], 20, 55);

      // Lost Luggage Section
      doc.setFontSize(16);
      doc.setTextColor(0, 48, 87);
      doc.text("Lost Luggage Reports", 20, 75);
      
      const lostColumns = [
        { header: "Name", dataKey: "passengerName" },
        { header: "ID", dataKey: "passengerId" },
        { header: "Phone", dataKey: "phone" },
        { header: "Email", dataKey: "email" },
        { header: "Airline", dataKey: "airline" },
        { header: "Flight", dataKey: "flightNumber" },
        { header: "Date", dataKey: "flightDate" },
        { header: "Time", dataKey: "flightTime" },
        { header: "Bag Size", dataKey: "bagSize" },
        { header: "Bag Color", dataKey: "bagColor" },
        { header: "Bag Brand", dataKey: "bagBrand" },
        { header: "Date of Loss", dataKey: "dateOfLoss" },
        { header: "Last Seen", dataKey: "lastSeenLocation" },
        { header: "Status", dataKey: "status" },
        { header: "Whatsapp", dataKey: "whatsappNumber" }
      ];

      autoTable(doc, {
        startY: 80,
        head: [lostColumns.map(col => col.header)],
        body: lostLuggageData.map(item => lostColumns.map(col => item[col.dataKey])),
        theme: 'grid',
        headStyles: {
          fillColor: [0, 48, 87],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          cellWidth: 'wrap'
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Name
          1: { cellWidth: 25 }, // ID
          2: { cellWidth: 25 }, // Phone
          3: { cellWidth: 40 }, // Email
          4: { cellWidth: 25 }, // Airline
          5: { cellWidth: 20 }, // Flight
          6: { cellWidth: 20 }, // Date
          7: { cellWidth: 15 }, // Time
          8: { cellWidth: 15 }, // Bag Size
          9: { cellWidth: 15 }, // Bag Color
          10: { cellWidth: 20 }, // Bag Brand
          11: { cellWidth: 20 }, // Date of Loss
          12: { cellWidth: 30 }, // Last Seen
          13: { cellWidth: 15 }, // Status
          14: { cellWidth: 20 }  // Whatsapp
        }
      });

      // Found Luggage Section
      const finalY = (doc as any).lastAutoTable.finalY || 80;
      doc.setFontSize(16);
      doc.setTextColor(0, 48, 87);
      doc.text("Found Luggage Reports", 20, finalY + 20);

      const foundColumns = [
        { header: "Finder Name", dataKey: "finderName" },
        { header: "Phone", dataKey: "phone" },
        { header: "Location", dataKey: "location" },
        { header: "Find Date", dataKey: "findDate" },
        { header: "Find Time", dataKey: "findTime" },
        { header: "Bag Description", dataKey: "bagDescription" },
        { header: "Bag Color", dataKey: "bagColor" },
        { header: "Bag Size", dataKey: "bagSize" },
        { header: "Status", dataKey: "status" },
        { header: "Whatsapp", dataKey: "whatsappNumber" }
      ];

      autoTable(doc, {
        startY: finalY + 25,
        head: [foundColumns.map(col => col.header)],
        body: foundLuggageData.map(item => foundColumns.map(col => item[col.dataKey])),
        theme: 'grid',
        headStyles: {
          fillColor: [0, 48, 87],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: 'linebreak',
          cellWidth: 'wrap'
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Finder Name
          1: { cellWidth: 25 }, // Phone
          2: { cellWidth: 40 }, // Location
          3: { cellWidth: 20 }, // Find Date
          4: { cellWidth: 15 }, // Find Time
          5: { cellWidth: 50 }, // Bag Description
          6: { cellWidth: 15 }, // Bag Color
          7: { cellWidth: 15 }, // Bag Size
          8: { cellWidth: 15 }, // Status
          9: { cellWidth: 20 }  // Whatsapp
        }
      });

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
      }

      // Save the PDF
      doc.save("luggage-report.pdf");
      
      toast({
        title: "Success",
        description: "Report generated successfully",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    }
  };

  const getImageUrl = (filename: string | undefined) => {
    if (!filename) return '';
    return `http://localhost:3001/uploads/${filename}`;
  };

  const handleDownloadImage = async (filename: string) => {
    if (!filename) return;
    const url = getImageUrl(filename);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  useEffect(() => {
    console.log("AdminDashboard mounted, fetching data...");
    fetchLostLuggage();
    fetchFoundLuggage();
  }, []);

  const applyFilters = (data: any[]) => {
    return data.filter(item => {
      // Date filter
      if (filters.date && item.findDate) {
        const itemDate = new Date(item.findDate).toISOString().split('T')[0];
        if (itemDate !== filters.date) return false;
      }

      // Color filter
      if (filters.color !== "all" && item.bagColor !== filters.color) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && item.status !== filters.status) {
        return false;
      }

      // Location filter (for found items)
      if (filters.location !== "all" && item.location && item.location !== filters.location) {
        return false;
      }

      return true;
    });
  };

  const getUniqueValues = (data: any[], field: string) => {
    const values = data.map(item => item[field]).filter(Boolean);
    return ["all", ...new Set(values)];
  };

  const filteredLostData = applyFilters(lostLuggageData);
  const filteredFoundData = applyFilters(foundLuggageData);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/lost-luggage');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        throw new Error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lost luggage reports.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (reportId: string, newStatus: 'pending' | 'resolved') => {
    try {
      const response = await fetch(`http://localhost:3000/api/lost-luggage/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setReports(reports.map(report =>
          report.id === reportId ? { ...report, status: newStatus } : report
        ));
        toast({
          title: "Success",
          description: "Report status updated successfully.",
        });
      } else {
        throw new Error('Failed to update report status');
      }
    } catch (error) {
      console.error('Error updating report status:', error);
      toast({
        title: "Error",
        description: "Failed to update report status.",
        variant: "destructive",
      });
    }
  };

  const ReportDetailsDialog = ({ report, onClose, onStatusChange }: ReportDetailsDialogProps) => {
        return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Lost Luggage Report Details</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Passenger Information</h3>
                <div>Name: {report.passengerName}</div>
                <div>ID: {report.passengerId}</div>
                <div>Email: {report.email}</div>
                <div>Phone: {report.phone}</div>
                <div><span className="font-medium">Whatsapp:</span> {report.whatsappNumber}</div>
              </div>
              <div>
                <h3 className="font-semibold">Flight Details</h3>
                <div>Airline: {report.airline}</div>
                <div>Flight Number: {report.flightNumber}</div>
                <div>Date: {new Date(report.flightDate).toLocaleDateString()}</div>
                <div>Time: {report.flightTime}</div>
              </div>
              <div>
                <h3 className="font-semibold">Bag Details</h3>
                <div>Size: {report.bagSize}</div>
                <div>Color: {report.bagColor}</div>
                <div>Brand: {report.bagBrand}</div>
                <div>Unique Identifiers: {report.uniqueIdentifiers}</div>
              </div>
              <div>
                <h3 className="font-semibold">Loss Details</h3>
                <div>Date of Loss: {new Date(report.dateOfLoss).toLocaleDateString()}</div>
                <div>Last Seen Location: {report.lastSeenLocation}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">QR Code</h3>
                {report.qrCodeImage ? (
                  <div className="border rounded-lg p-2">
                    <img 
                      src={getImageUrl(report.qrCodeImage)}
                      alt="QR Code"
                      className="max-w-full h-auto"
                    />
        </div>
                ) : (
                  <p className="text-gray-500">No QR code image available</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Bag Image</h3>
                {report.bagImage ? (
                  <div className="border rounded-lg p-2">
                    <img 
                      src={getImageUrl(report.bagImage)}
                      alt="Bag"
                      className="max-w-full h-auto"
                    />
        </div>
                ) : (
                  <p className="text-gray-500">No bag image available</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <Select
                value={report.status}
                onValueChange={(value) => onStatusChange(report.id, value as 'pending' | 'resolved')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Matched">Matched</SelectItem>
                  <SelectItem value="Claimed">Claimed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={onClose}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const LostLuggageCard = ({ item }: { item: LostLuggage }) => (
    <Card key={item._id} className="relative bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">{item.passengerName}</CardTitle>
        <CardDescription />
        <div className="space-y-1 mt-1">
          <div><span className="font-medium">ID:</span> {item.passengerId}</div>
          <div><span className="font-medium">Phone:</span> {item.phone}</div>
          <div><span className="font-medium">Airline:</span> {item.airline}</div>
          <div><span className="font-medium">Flight:</span> {item.flightNumber}</div>
          <div><span className="font-medium">Date:</span> {item.flightDate}</div>
          <div><span className="font-medium">Loss Date:</span> {item.dateOfLoss}</div>
          <div><span className="font-medium">Last Seen:</span> {item.lastSeenLocation}</div>
          <div><span className="font-medium">Bag Size:</span> {item.bagSize}</div>
          <div><span className="font-medium">Bag Color:</span> {item.bagColor}</div>
          <div><span className="font-medium">Whatsapp:</span> {item.whatsappNumber}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">QR Code</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              {item.qrCodeImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={getImageUrl(item.qrCodeImage)} 
                    alt="QR Code" 
                    className="w-32 h-32 object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDownloadImage(item.qrCodeImage)}
                  >
                    Download QR
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No QR code available</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Bag Image</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              {item.bagImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={getImageUrl(item.bagImage)} 
                    alt="Bag" 
                    className="w-32 h-32 object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDownloadImage(item.bagImage)}
                  >
                    Download Image
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No bag image available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Badge variant={item.status === "Matched" ? "secondary" : "default"}>
            {item.status}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewLost(item)}
            >
              View
            </Button>
            {item.status === "Pending" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMatchLost(item)}
              >
                Match
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateLost(item)}
            >
              Update Lost
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteLost(item)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FoundLuggageCard = ({ item }: { item: FoundLuggage }) => (
    <Card key={item._id} className="relative bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">{item.finderName}</CardTitle>
        <CardDescription />
        <div className="space-y-1 mt-1">
          <div><span className="font-medium">Phone:</span> {item.phone}</div>
          <div><span className="font-medium">Location:</span> {item.location}</div>
          <div><span className="font-medium">Find Date:</span> {item.findDate}</div>
          <div><span className="font-medium">Find Time:</span> {item.findTime}</div>
          <div><span className="font-medium">Bag Description:</span> {item.bagDescription}</div>
          <div><span className="font-medium">Bag Color:</span> {item.bagColor}</div>
          <div><span className="font-medium">Bag Size:</span> {item.bagSize}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">QR Code</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              {item.qrCodeImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={getImageUrl(item.qrCodeImage)} 
                    alt="QR Code" 
                    className="w-32 h-32 object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDownloadImage(item.qrCodeImage)}
                  >
                    Download QR
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No QR code available</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Bag Image</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              {item.bagImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={getImageUrl(item.bagImage)} 
                    alt="Bag" 
                    className="w-32 h-32 object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDownloadImage(item.bagImage)}
                  >
                    Download Image
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">No bag image available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Badge variant={item.status === "Matched" ? "secondary" : "default"}>
            {item.status}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewFound(item)}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateFound(item)}
            >
              Update Found
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteFound(item)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <UpdateLuggageModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        luggage={selectedLuggage}
      />
      <div className="aero-container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-aero-navy">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage and track lost and found luggage reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Lost Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{lostLuggageData.length}</div>
              <p className="text-sm text-red-100 mt-1">Active reports in the system</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Found Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{foundLuggageData.length}</div>
              <p className="text-sm text-green-100 mt-1">Items awaiting claim</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Successful Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {lostLuggageData.filter((item) => item.status === "Matched").length}
              </div>
              <p className="text-sm text-blue-100 mt-1">Items matched with owners</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
          <Input
              placeholder="Search by name, ID, or flight number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={filters.date}
              onValueChange={(value) => setFilters({ ...filters, date: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                {Array.from(new Set(lostLuggageData.map(item => item.flightDate))).map(date => (
                  <SelectItem key={`${date}-${date}`} value={date || "unknown"}>{date || "Unknown date"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.color}
              onValueChange={(value) => setFilters({ ...filters, color: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All colors</SelectItem>
                {Array.from(new Set(lostLuggageData.map(item => item.bagColor))).map(color => (
                  <SelectItem key={`${color}-${color}`} value={color || "unknown"}>{color || "Unknown color"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Matched">Matched</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.location}
              onValueChange={(value) => setFilters({ ...filters, location: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {Array.from(new Set(foundLuggageData.map(item => item.location))).map(location => (
                  <SelectItem key={`${location}-${location}`} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
        </div>

        <div className="flex justify-end gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/qr-scanner'}
            >
              Open QR Scanner
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/qr-generator'}
            >
              QR Generator
            </Button>
            <Button
              variant="default"
              onClick={generateReport}
            >
              Generate Report
            </Button>
        </div>

        <Tabs defaultValue="lost" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="lost">Lost Luggage Reports</TabsTrigger>
            <TabsTrigger value="found">Found Luggage Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="lost">
            <Card>
              <CardHeader>
                <CardTitle>Lost Luggage Reports</CardTitle>
                <CardDescription>
                  View and manage all lost luggage reports in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                      {filteredLostData.length > 0 ? (
                        filteredLostData.map((item) => (
                      <LostLuggageCard key={item._id} item={item} />
                        ))
                      ) : (
                    <div className="col-span-full text-center py-6">
                            No matching lost luggage reports found
                    </div>
                      )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="found">
            <Card>
              <CardHeader>
                <CardTitle>Found Luggage Reports</CardTitle>
                <CardDescription>
                  View and manage all found luggage reports in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  {filteredFoundData.length > 0 ? (
                    filteredFoundData.map((item) => (
                      <FoundLuggageCard key={item._id} item={item} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-6">
                      No matching found luggage reports found
                    </div>
                  )}
                        </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
