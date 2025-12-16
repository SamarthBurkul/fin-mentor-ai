import { BankLocation } from '../types';

export const bankLocations: BankLocation[] = [
  {
    id: 1,
    name: "State Bank of India",
    type: "bank",
    address: "Main Branch, City Center",
    distance: 0.5,
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 2,
    name: "HDFC Bank",
    type: "bank", 
    address: "Commercial Complex, Sector 15",
    distance: 1.2,
    coordinates: { lat: 28.6129, lng: 77.2295 }
  },
  {
    id: 3,
    name: "ICICI Bank ATM",
    type: "atm",
    address: "Near Metro Station",
    distance: 0.3,
    coordinates: { lat: 28.6149, lng: 77.2085 }
  },
  {
    id: 4,
    name: "Punjab National Bank",
    type: "bank",
    address: "Market Road, Old City",
    distance: 2.1,
    coordinates: { lat: 28.6100, lng: 77.2300 }
  },
  {
    id: 5,
    name: "SBI ATM",
    type: "atm",
    address: "Shopping Mall, Ground Floor",
    distance: 0.8,
    coordinates: { lat: 28.6155, lng: 77.2100 }
  }
];

export const searchBanksNearby = (location: string): BankLocation[] => {
  // In a real app, this would use geolocation API
  return bankLocations.sort((a, b) => a.distance - b.distance);
};