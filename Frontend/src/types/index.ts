export interface FoundLuggage {
  _id?: string;
  finderName?: string;
  phone?: string;
  email?: string;
  location?: string;
  findDate?: string;
  findTime?: string;
  bagDescription?: string;
  bagColor?: string;
  bagSize?: string;
  status?: string;
  bagImage?: string;
  qrCodeImage?: string;
}

export interface LostLuggage {
  _id: string;
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
  status: string;
  qrCodeImage?: string;
  bagImage?: string;
  dateOfLoss: string;
  lastSeenLocation: string;
  createdAt: string;
}
