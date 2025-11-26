# 🧳 AeroX Airport Services - Lost & Found Baggage Handling System

**Part of AeroX Journey Management System**

## **📋 Project Overview**

The **Lost & Found Baggage Handling System** is a comprehensive web application designed to streamline the process of reporting, tracking, and reuniting passengers with their lost luggage at airports. This system is part of the larger AeroX Airport Services Management platform, providing an efficient digital solution for baggage management.

---

## **✨ Features**

### **🔍 Core Features**

* **Lost Luggage Reporting** - Passengers can report lost baggage with detailed information
* **Found Luggage Registration** - Airport staff can register found items
* **Real-time Status Tracking** - Track luggage status (Pending, Matched, Claimed)
* **QR Code Generation & Scanning** - Unique QR codes for baggage identification
* **Admin Dashboard** - Comprehensive management interface for staff
* **Automated Notifications** - WhatsApp and SMS alerts for status updates
* **Report Generation** - PDF reports for management

### **📱 System Features**

* **Responsive Design** - Works seamlessly across all devices
* **File Upload Support** - Image uploads for luggage photos
* **Email Integration** - QR code delivery via email
* **Multi-status Management** - Advanced status tracking system
* **Search & Filter** - Advanced filtering capabilities in admin dashboard
* **Data Export** - Export functionality for reports

---

## **🛠️ Tools & Technologies Used**

### **Frontend Technologies**

* **React 18** - Modern React with TypeScript
* **TypeScript** - Type-safe development
* **Vite** - Lightning-fast build tool
* **Tailwind CSS** - Utility-first CSS framework
* **shadcn/ui** - Modern UI component library
* **React Router DOM** - Client-side routing
* **React Hook Form** - Form management with validation
* **Zod** - Schema validation
* **Axios** - HTTP client for API calls
* **React Query** - Server state management
* **QRCode.react** - QR code generation
* **jsPDF** - PDF generation
* **Lucide React** - Beautiful icons

### **Backend Technologies**

* **Node.js** - JavaScript runtime
* **Express.js** - Web application framework
* **MongoDB** - NoSQL database with Mongoose ODM
* **Multer** - File upload middleware
* **Nodemailer** - Email service integration
* **Twilio** - SMS and WhatsApp messaging
* **CORS** - Cross-origin resource sharing
* **Dotenv** - Environment variable management
* **Nodemon** - Development auto-reload

### **Database**

* **MongoDB Atlas** - Cloud-hosted MongoDB database
* **Mongoose ODM** - Object Document Mapping
* **File Storage** - Local file system for images

---

## **📡 API Endpoints**

### **Lost Luggage APIs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Losts` | Get all lost luggage reports |
| POST | `/Losts` | Submit new lost luggage report |
| GET | `/Losts/:id` | Get specific lost luggage by ID |
| PUT | `/Losts/:id` | Update lost luggage details |
| DELETE | `/Losts/:id` | Delete lost luggage report |

### **Found Luggage APIs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Founds` | Get all found luggage reports |
| POST | `/Founds` | Submit new found luggage report |
| GET | `/Founds/:id` | Get specific found luggage by ID |
| PUT | `/Founds/:id` | Update found luggage details |
| DELETE | `/Founds/:id` | Delete found luggage report |

### **Utility APIs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/test` | Server health check |
| GET | `/api/flightbooking_models/:id` | Get flight booking details |
| POST | `/api/send-qr-email` | Send QR code via email |

---

## **💾 Database Design**

### **Lost Luggage Schema**
```javascript
{
  passengerName: String (required),
  passengerId: String (required),
  email: String (required),
  phone: String (required),
  whatsappNumber: String (required),
  airline: String (required),
  flightNumber: String (required),
  flightDate: Date (required),
  flightTime: String (required),
  bagSize: String (required),
  bagColor: String (required),
  bagBrand: String (required),
  uniqueIdentifiers: String (required),
  dateOfLoss: Date (required),
  lastSeenLocation: String (required),
  qrCodeImage: String (optional),
  bagImage: String (optional),
  status: Enum ['Pending', 'Matched', 'Claimed']
}
```

### **Found Luggage Schema**
```javascript
{
  finderName: String (required),
  phone: String (required),
  location: String (required),
  findDate: Date (required),
  findTime: String (required),
  bagDescription: String (required),
  bagColor: String (required),
  bagSize: String (required),
  qrCodeImage: String (optional),
  bagImage: String (optional),
  status: Enum ['Unmatched', 'Matched', 'Returned', 'Closed']
}
```

---

## **🚀 How to Run the System**

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (connection string provided)

### **Backend Setup**

#### **Step 1: Navigate to Backend Directory**
```powershell
cd "c:\Users\User\Desktop\Kaveesha\Uni\2 ND YEAR\2nd Year second sem\Itp project\lostfound-aero-connect-main (3)\lostfound-aero-connect-main\Backend"
```

#### **Step 2: Install Dependencies**
```powershell
npm install
```

#### **Step 3: Environment Setup**
The `.env` file is already configured with:
- MongoDB connection string
- SMTP settings for email functionality
- Twilio credentials for SMS/WhatsApp

#### **Step 4: Start Backend Server**
```powershell
npm start
```
**Backend will run on: `http://localhost:3001`**

---

### **Frontend Setup**

#### **Step 1: Navigate to Frontend Directory**
```powershell
cd "c:\Users\User\Desktop\Kaveesha\Uni\2 ND YEAR\2nd Year second sem\Itp project\lostfound-aero-connect-main (3)\lostfound-aero-connect-main\Frontend"
```

#### **Step 2: Install Dependencies**
```powershell
npm install
```

#### **Step 3: Start Development Server**
```powershell
npm run dev
```
**Frontend will run on: `http://localhost:8080`**

---

### **🏃‍♂️ Quick Start (Both Servers)**

**Terminal 1 (Backend):**
```powershell
cd "Backend"; npm install; npm start
```

**Terminal 2 (Frontend):**
```powershell
cd "Frontend"; npm install; npm run dev
```

---

## **📱 Application Pages & Features**

### **Public Pages**
- **Home Page** - Landing page with service overview
- **Report Lost Luggage** - Form for passengers to report lost items
- **Report Found Luggage** - Form for staff to register found items
- **QR Scanner** - Scan QR codes for luggage identification
- **About** - Information about AeroX services
- **Contact** - Contact information and support

### **Admin Features**
- **Admin Dashboard** - Comprehensive management interface
- **Lost Luggage Management** - View, edit, delete lost reports
- **Found Luggage Management** - Manage found items
- **Status Updates** - Change luggage status and send notifications
- **QR Code Generator** - Generate QR codes for passengers
- **Report Generation** - Export PDF reports
- **Real-time Search** - Filter and search functionality

---

## **🔧 Configuration Details**

### **Environment Variables (.env)**
```env
DATABASE_URL="mongodb+srv://admin:1234@airportmanagementsystem.8nzgv.mongodb.net/"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
PORT=5000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=kaveeshakithmini20030903@gmail.com
SMTP_PASS=ykvygfdmzoxnycsm
```

### **API Configuration**
- **Backend URL**: `http://localhost:3001`
- **Frontend URL**: `http://localhost:8080`
- **File Upload**: Support for images up to 5MB
- **CORS**: Enabled for cross-origin requests

---

## **📊 System Workflow**

1. **Lost Luggage Report** → Passenger fills form → QR code generated → Email sent
2. **Found Luggage Registration** → Staff registers found item → System matching
3. **Admin Review** → Manual/automatic matching → Status updates
4. **Notifications** → SMS/WhatsApp alerts → Passenger contacted
5. **Reunion** → Status updated to 'Claimed' → Case closed

---

## **🎯 Contact Information**

**AeroX International Airport**
- **Location**: Terminal 1, Level 3, Lost & Found Department
- **Email**: lostandfound@aerox.com
- **Phone**: +1 (123) 456-7890
- **Operating Hours**: 
  - Monday to Friday: 8:00 AM - 10:00 PM
  - Saturday & Sunday: 9:00 AM - 8:00 PM



## **👥 Development Team**

This system is developed as part of the **AeroX Airport Services Management** project for streamlining airport operations and enhancing passenger experience.

**© 2025 AeroX Journey Management System. All rights reserved.**

---

*This Lost & Found Baggage Handling System demonstrates modern web development practices, efficient database design, and user-centered design principles to solve real-world airport management challenges.*