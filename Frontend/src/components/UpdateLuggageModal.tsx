import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoundLuggage, LostLuggage } from "@/types";

type FormData = {
  finderName: string;
  phone: string;
  email: string;
  location: string;
  findDate: string;
  findTime: string;
  bagColor: string;
  bagSize: string;
  status: string;
  bagDescription: string;
  bagImage?: string;
  qrCodeImage?: string;
} | {
  passengerName: string;
  passengerId: string;
  email: string;
  phone: string;
  airline: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  bagColor: string;
  bagSize: string;
  bagBrand: string;
  uniqueIdentifiers: string;
  status: string;
  bagImage?: string;
};

interface UpdateLuggageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  luggage: LostLuggage | FoundLuggage | null;
}

const foundLuggageSchema = z.object({
  finderName: z.string().min(1, "Finder name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(1, "Location is required"),
  findDate: z.string().min(1, "Date is required"),
  findTime: z.string(),
  bagColor: z.string().min(1, "Bag color is required"),
  bagSize: z.string().min(1, "Bag size is required"),
  status: z.string().min(1, "Status is required"),
  bagDescription: z.string().optional(),
});

const lostLuggageSchema = z.object({
  passengerName: z.string().min(3, "Name must be at least 3 characters"),
  passengerId: z.string().min(3, "Passenger ID is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  airline: z.string().min(1, "Airline is required"),
  flightNumber: z.string().min(2, "Flight number is required"),
  flightDate: z.string().min(1, "Flight date is required"),
  flightTime: z.string().min(1, "Flight time is required"),
  bagColor: z.string().min(1, "Bag color is required"),
  bagSize: z.string().min(1, "Bag size is required"),
  bagBrand: z.string().min(1, "Bag brand is required"),
  uniqueIdentifiers: z.string().min(1, "Please provide unique identifiers"),
  status: z.string().min(1, "Status is required"),
  bagImage: z.any().optional(),
});

export const UpdateLuggageModal: React.FC<UpdateLuggageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  luggage,
}) => {
  // Check if luggage exists and determine its type
  const isFoundLuggage = luggage ? !('flightDate' in luggage) : false;
  const schema = isFoundLuggage ? foundLuggageSchema : lostLuggageSchema;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: isFoundLuggage ? {
      finderName: '',
      phone: '',
      email: '',
      location: '',
      findDate: '',
      findTime: '',
      bagColor: '',
      bagSize: 'Medium',
      status: 'Pending',
    } : {
      passengerName: '',
      passengerId: '',
      email: '',
      phone: '',
      airline: '',
      flightNumber: '',
      flightDate: '',
      flightTime: '',
      bagColor: '',
      bagSize: 'Medium',
      bagBrand: '',
      uniqueIdentifiers: '',
      status: 'Pending',
    }
  });

  // Reset form when luggage data changes
  React.useEffect(() => {
    if (luggage) {
      if (isFoundLuggage) {
        const foundLuggage = luggage as FoundLuggage;
        form.reset({
          finderName: foundLuggage.finderName || '',
          phone: foundLuggage.phone || '',
          email: foundLuggage.email || '',
          location: foundLuggage.location || '',
          findDate: foundLuggage.findDate?.split('T')[0] || '',
          findTime: foundLuggage.findTime || '',
          bagColor: foundLuggage.bagColor || '',
          bagSize: foundLuggage.bagSize || 'Medium',
          status: foundLuggage.status || 'Pending',
        });
      } else {
        const lostLuggage = luggage as LostLuggage;
        form.reset({
          passengerName: lostLuggage.passengerName || '',
          passengerId: lostLuggage.passengerId || '',
          email: lostLuggage.email || '',
          phone: lostLuggage.phone || '',
          airline: lostLuggage.airline || '',
          flightNumber: lostLuggage.flightNumber || '',
          flightDate: lostLuggage.flightDate?.split('T')[0] || '',
          flightTime: lostLuggage.flightTime || '',
          bagColor: lostLuggage.bagColor || '',
          bagSize: lostLuggage.bagSize || 'Medium',
          bagBrand: lostLuggage.bagBrand || '',
          uniqueIdentifiers: lostLuggage.uniqueIdentifiers || '',
          status: lostLuggage.status || 'Pending',
        });
      }
    }
  }, [luggage, form, isFoundLuggage]);

  // Add state for file inputs
  const [bagImageFile, setBagImageFile] = React.useState<File | null>(null);
  const [qrCodeImageFile, setQrCodeImageFile] = React.useState<File | null>(null);

  const handleSubmit = (data: FormData) => {
    // For both found and lost luggage, send all form data to onSubmit
    if ('flightDate' in data) {
      // Lost luggage (no file upload here)
      const formattedData = {
        ...data,
        flightDate: data.flightDate ? new Date(data.flightDate).toISOString() : undefined,
      };
      onSubmit(formattedData);
    } else {
      onSubmit(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-aero-navy">
            Update {isFoundLuggage ? "Found" : "Lost"} Luggage Details
          </DialogTitle>
          <DialogDescription>
            Please update the status or images for this luggage report. All changes will be saved.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {isFoundLuggage ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="finderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Finder Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Phone</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Location Found</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="findDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Date Found</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="findTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Time Found</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="font-semibold">Bag Description</FormLabel>
                  <Textarea {...form.register('bagDescription')} className="bg-white" />
                </div>
                <FormField
                  control={form.control}
                  name="bagColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Bag Color</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bagSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Bag Size</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Small">Small</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Bag Image display */}
                <div>
                  <FormLabel className="font-semibold">Bag Image</FormLabel>
                  {luggage && (luggage as any).bagImage ? (
                    <img src={`http://localhost:3001/uploads/${(luggage as any).bagImage}`} alt="Bag" className="w-32 h-32 object-contain rounded border" />
                  ) : (
                    <div className="text-gray-500">No bag image available</div>
                  )}
                </div>
                {/* QR Code Image display */}
                <div>
                  <FormLabel className="font-semibold">QR Code Image</FormLabel>
                  {luggage && (luggage as any).qrCodeImage ? (
                    <img src={`http://localhost:3001/uploads/${(luggage as any).qrCodeImage}`} alt="QR Code" className="w-32 h-32 object-contain rounded border" />
                  ) : (
                    <div className="text-gray-500">No QR code image available</div>
                  )}
                </div>
                {/* Only status is editable */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Unmatched">Unmatched</SelectItem>
                          <SelectItem value="Matched">Matched</SelectItem>
                          <SelectItem value="Returned">Returned</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="passengerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passenger Name</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passenger ID</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="airline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Airline</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="flightNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flight Number</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="flightDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flight Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="flightTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flight Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bagColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Color</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bagSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Size</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Small">Small</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bagBrand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bag Brand</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uniqueIdentifiers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unique Identifiers</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Matched">Matched</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            )}

            <div className="flex justify-end gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-aero-blue hover:bg-aero-blue-dark px-6"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
