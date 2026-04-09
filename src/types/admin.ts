export type Competition = {
  id: string;
  title: string;
  description: string;
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

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
