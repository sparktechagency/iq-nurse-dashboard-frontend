export type ViewMode = 'categories' | 'table';

export interface FlashcardFormData {
  question: string;
  answer: string;
  category: string;
  subcategory: string;
  questionImage?: string;
  answerImage?: string;
} 

// src/types/flashcard.ts
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  subcategory: string;
  questionImage?: string;
  answerImage?: string;
  timesReviewed: number;
  correctCount: number;
  lastReviewed?: string;
  customCard: boolean;
  folderId?: string;
  topicId?: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  color?: string;
  icon?: string;
}

export interface Topic {
  id: string;
  name: string;
  folderId: string;
  description?: string;
  createdAt: string;
}

export interface CategoryProgress {
  category: string;
  totalCards: number;
  reviewedCards: number;
  correctPercentage: number;
  lastStudied?: Date | string;
}

export interface NursingCategory {
  name: string;
  subcategories: string[];
}