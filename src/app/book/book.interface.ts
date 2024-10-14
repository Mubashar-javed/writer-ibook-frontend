export interface PaginatedBooks {
  count: number;
  next: string;
  previous: null;
  results: Book[];
}

export interface Book {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  content: string;
  status: BookStatus;
  author: number;
}

export enum BookStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
}

export const BookStatusOptions = Object.keys(BookStatus).map(
  (key) => BookStatus[key as keyof typeof BookStatus]
);

export type BookChangeRequest = Omit<Book, 'created_at' | 'updated_at'>;

export interface RapidAPIResponse {
  word: string;
  results: Result[];
  syllables: Syllables;
  pronunciation: Pronunciation;
  frequency: number;
}

export interface Pronunciation {
  all: string;
}

export interface Result {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  typeOf: string[];
  hasTypes?: string[];
  derivation?: string[];
  examples?: string[];
}

export interface Syllables {
  count: number;
  list: string[];
}
