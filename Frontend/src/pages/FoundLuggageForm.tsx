import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { foundLuggageApi } from "@/services/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import reportFoundFormImg from "@/assets/Report-Found-Luggage.jpg";
import airhosterImg from "@/assets/images/Airhoster.png";

const formSchema = z.object({
  finderName: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z.string()
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Phone number must be at most 15 digits")
    .refine(val => !val.startsWith('0'), {
      message: "Phone number cannot start with 0"
    }),
  location: z.string().min(1, "Location is required"),
  findDate: z.string().min(1, "Find date is required"),
  findTime: z.string().min(1, "Find time is required"),
  bagDescription: z.string().min(1, "Bag description is required"),
  bagColor: z.string().min(1, "Bag color is required"),
  bagSize: z.enum(["Small", "Medium", "Large"]),
  bagImage: z.any().optional(),
  qrCodeImage: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const countryCodes = [
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1-242' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1-246' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Cape Verde', code: '+238' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo', code: '+242' },
  { name: 'Costa Rica', code: '+506' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1-767' },
  { name: 'Dominican Republic', code: '+1-809' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Germany', code: '+49' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1-473' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guinea-Bissau', code: '+245' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Jamaica', code: '+1-876' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Korea', code: '+850' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Qatar', code: '+974' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1-869' },
  { name: 'Saint Lucia', code: '+1-758' },
  { name: 'Saint Vincent and the Grenadines', code: '+1-784' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'Sao Tome and Principe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1-868' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+39' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' },
];

const FoundLuggageForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [bagImagePreview, setBagImagePreview] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+1");
  const [countrySearch, setCountrySearch] = useState("");

  const filteredCountryCodes = countryCodes.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch)
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      finderName: "",
      phone: "",
      location: "",
      findDate: "",
      findTime: "",
      bagDescription: "",
      bagColor: "",
      bagSize: "Medium",
      bagImage: "",
      qrCodeImage: "",
    },
  });

  // Function to sanitize finder name
  const sanitizeFinderName = (value: string) => {
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  // Handle finder name change with sanitization
  const handleFinderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeFinderName(e.target.value);
    form.setValue('finderName', sanitizedValue);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("qrCodeImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("qrCodeImage", file);
    }
  };

  const handleBagImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBagImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("bagImage", file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    setIsSubmitting(true);
      const formData = new FormData();
      formData.append('finderName', values.finderName);
      formData.append('phone', countryCode + values.phone);
      formData.append('location', values.location);
      formData.append('findDate', values.findDate ? new Date(values.findDate).toISOString().split('T')[0] : '');
      formData.append('findTime', values.findTime);
      formData.append('bagDescription', values.bagDescription);
      formData.append('bagColor', values.bagColor);
      formData.append('bagSize', values.bagSize);
      formData.append('status', 'Unmatched');
      formData.append('createdAt', new Date().toISOString());
      if (values.qrCodeImage instanceof File) {
        formData.append('qrCodeImage', values.qrCodeImage);
      }
      if (values.bagImage instanceof File) {
        formData.append('bagImage', values.bagImage);
      }
      // Log for debugging
      console.log('FormData to be submitted:', Object.fromEntries(formData));
      const response = await foundLuggageApi.submitForm(formData);
      if (!response.data) {
        throw new Error('Failed to submit form. Please try again.');
      }
        toast({
        title: "Success",
        description: "Found luggage report submitted successfully. You can submit another report if needed.",
        duration: 5000,
        });
        form.reset();
        setQrCodePreview(null);
      setBagImagePreview(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while submitting the form';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Full-page background image with blur effect */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${reportFoundFormImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.1)', // Scale up to avoid blur edges
        }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-10" />
      
      {/* Form content */}
      <div className="relative z-20 min-h-screen">
        <PageLayout>
          {/* Top bar with Airhoster image and text */}
          <div className="bg-gradient-to-r from-cyan-700 to-teal-800 shadow-lg">
            <div className="relative w-full">
              <div className="flex items-center justify-center min-h-[100px] px-6 py-8">
                {/* Logo positioned at left corner with no spacing */}
                <img 
                  src={airhosterImg} 
                  alt="Airhoster" 
                  className="absolute left-0 top-0 bottom-0 h-full w-auto object-contain"
                />
                
                {/* Centered text */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2 text-white">Found Luggage Registration Service</h2>
                  <p className="text-lg text-cyan-100">Register found luggage to help reunite it with owners</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/96 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10 border border-white/30 transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Report Found Luggage
                  </h1>
                  <p className="text-white text-lg max-w-2xl mx-auto font-medium drop-shadow-lg">
                    Please provide detailed information about the found luggage to help us match it with lost reports.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-6 rounded-xl mb-6 border border-blue-100/50 shadow-sm">
                      <h2 className="text-xl font-semibold text-aero-navy mb-4 flex items-center">
                        <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>
                        Finder Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="finderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field} 
                                  onChange={(e) => {
                                    handleFinderNameChange(e);
                                  }}
                                  value={field.value}
                                  className="bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 rounded-lg" 
                                />
                              </FormControl>
                              <FormDescription>
                                Only letters and spaces are allowed
                              </FormDescription>
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
                                <div className="flex gap-2">
                                  <Select defaultValue={countryCode + '-' + countryCodes.find(c => c.code === countryCode)?.name} onValueChange={(val) => setCountryCode(val.split('-')[0])}>
                                    <SelectTrigger className="w-24 bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 rounded-lg">
                                      <SelectValue>{countryCode}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <div className="px-2 py-1">
                                        <input
                                          type="text"
                                          placeholder="Search country..."
                                          value={countrySearch}
                                          onChange={e => setCountrySearch(e.target.value)}
                                          className="w-full px-2 py-1 border rounded text-sm mb-2"
                                        />
                                      </div>
                                      {filteredCountryCodes.map(c => (
                                        <SelectItem key={`${c.code}-${c.name}`} value={`${c.code}-${c.name}`}>{c.name} ({c.code})</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input type="tel" placeholder="Phone Number" {...field} className="bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 rounded-lg flex-1" onChange={e => {
                                    if (e.target.value === '' || e.target.value[0] !== '0') field.onChange(e);
                                  }} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm p-6 rounded-xl mb-6 border border-green-100/50 shadow-sm">
                      <h2 className="text-xl font-semibold text-aero-navy mb-4 flex items-center">
                        <span className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></span>
                        Find Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location Found</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Airport Terminal, Gate Number" {...field} className="bg-white" />
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
                              <FormLabel>Find Date</FormLabel>
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
                              <FormLabel>Find Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} className="bg-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50/80 to-violet-50/80 backdrop-blur-sm p-6 rounded-xl mb-6 border border-purple-100/50 shadow-sm">
                      <h2 className="text-xl font-semibold text-aero-navy mb-4 flex items-center">
                        <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></span>
                        Luggage Description
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="bagSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bag Size</FormLabel>
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
                                <Input placeholder="e.g. Black, Blue, etc." {...field} className="bg-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="bagDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bag Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please provide a detailed description of the bag"
                                  {...field}
                                  className="resize-none min-h-[100px] bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        </div>

                        <div>
                          <FormItem>
                            <FormLabel>Upload Bag Image</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleBagImageChange}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormDescription>
                              Upload a clear image of the found luggage
                            </FormDescription>
                            {bagImagePreview && (
                              <div className="mt-2">
                                <img
                                  src={bagImagePreview}
                                  alt="Bag Preview"
                                  className="max-w-[200px] h-auto rounded-lg"
                                />
                              </div>
                            )}
                          </FormItem>
                        </div>

                        <div>
                          <FormItem>
                            <FormLabel>Upload QR Code Image (If Available)</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleQrCodeChange}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormDescription>
                              Upload a clear image of any QR code on the luggage
                            </FormDescription>
                            {qrCodePreview && (
                              <div className="mt-2">
                                <img 
                                  src={qrCodePreview} 
                                  alt="QR Code Preview"
                                  className="max-w-[200px] h-auto rounded-lg" 
                                />
                              </div>
                            )}
                          </FormItem>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-6">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-cyan-700 to-teal-800 hover:from-cyan-800 hover:to-teal-900 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting Report...</span>
                          </div>
                        ) : (
                          "Submit Found Luggage Report"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </PageLayout>
      </div>
    </div>
  );
};

export default FoundLuggageForm;
