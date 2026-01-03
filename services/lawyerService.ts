import { Lawyer, SubscriptionTier } from "../types";

// Mock database
let REGISTERED_LAWYERS: Lawyer[] = [
  {
    id: 'l1',
    name: 'Adv. Rajesh Kumar',
    firmName: 'Kumar & Associates',
    location: 'New Delhi',
    practiceAreas: ['Civil Rights', 'Constitutional Law'],
    bio: 'Senior Advocate with 15+ years of experience in High Court litigations specializing in fundamental rights.',
    yearsOfExperience: 18,
    rating: 4.9,
    reviewCount: 124,
    subscriptionTier: 'Elite',
    imageUrl: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=C5A059&color=fff',
    email: 'contact@kumarlegal.in',
    phone: '+91 98765 43210'
  },
  {
    id: 'l2',
    name: 'Adv. Priya Sharma',
    firmName: 'Sharma Legal Solutions',
    location: 'Mumbai',
    practiceAreas: ['Tenant Rights', 'Family Law'],
    bio: 'Dedicated to providing affordable legal aid and tenant dispute resolution.',
    yearsOfExperience: 8,
    rating: 4.7,
    reviewCount: 89,
    subscriptionTier: 'Pro',
    imageUrl: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=1C1917&color=fff',
    email: 'office@sharmalegal.com',
    phone: '+91 98765 12345'
  },
  {
    id: 'l3',
    name: 'Adv. Vikram Singh',
    firmName: 'Singh & Partners',
    location: 'Bangalore',
    practiceAreas: ['Criminal Defense', 'Human Rights'],
    bio: 'Fighting for justice and fair trial rights for over a decade.',
    yearsOfExperience: 12,
    rating: 4.8,
    reviewCount: 56,
    subscriptionTier: 'Elite',
    imageUrl: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=C5A059&color=fff',
    email: 'vikram@singhpartners.com',
    phone: '+91 98765 67890'
  }
];

export const getRegisteredLawyers = (): Lawyer[] => {
  // Sort by tier: Elite -> Pro -> Free
  return [...REGISTERED_LAWYERS].sort((a, b) => {
    const tierOrder = { 'Elite': 3, 'Pro': 2, 'Free': 1 };
    return tierOrder[b.subscriptionTier] - tierOrder[a.subscriptionTier];
  });
};

export const registerLawyer = (lawyerData: Omit<Lawyer, 'id' | 'rating' | 'reviewCount'>): boolean => {
  const newLawyer: Lawyer = {
    ...lawyerData,
    id: `l${Date.now()}`,
    rating: 5.0, // New profiles start high or empty, 5.0 for demo appeal
    reviewCount: 0
  };
  REGISTERED_LAWYERS.push(newLawyer);
  return true;
};

export const searchRegisteredLawyers = (query: string): Lawyer[] => {
  const lowerQuery = query.toLowerCase();
  const allLawyers = getRegisteredLawyers();
  
  if (!query) return allLawyers; // Return all if no query (featured logic handled in UI)

  return allLawyers.filter(l => 
    l.name.toLowerCase().includes(lowerQuery) ||
    l.firmName.toLowerCase().includes(lowerQuery) ||
    l.practiceAreas.some(p => p.toLowerCase().includes(lowerQuery)) ||
    l.location.toLowerCase().includes(lowerQuery)
  );
};