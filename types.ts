export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  groundingMetadata?: GroundingMetadata;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    };
  };
  web?: {
    uri: string;
    title: string;
  };
}

export enum AppView {
  HOME = 'HOME',
  ADVISOR = 'ADVISOR',
  SIMPLIFIER = 'SIMPLIFIER',
  LAWYER_FINDER = 'LAWYER_FINDER',
  LAWYER_REGISTRATION = 'LAWYER_REGISTRATION',
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type SubscriptionTier = 'Free' | 'Pro' | 'Elite';

export interface Lawyer {
  id: string;
  name: string;
  firmName: string;
  location: string;
  practiceAreas: string[];
  bio: string;
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  subscriptionTier: SubscriptionTier;
  imageUrl?: string;
  email: string;
  phone: string;
}