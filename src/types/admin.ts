export type Competition = {
  id: string;
  title: string;
  description: string;
  registrant_count: number;
};

export type Registrant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  createdAt: string;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
};

export type Division = {
  id: string;
  name: string;
  imageUrl: string | null;
  isCore?: boolean;
};

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
