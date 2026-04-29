export type Contact = {
  name: string;
  phone: string;
};

export type Competition = {
  id: string;
  title: string;
  theme?: string | null;
  description: string | null;
  registrationStartDate?: string | null;
  registrationEndDate?: string | null;
  registrationLink: string;
  contacts?: Contact[] | null;
  tags?: string | null;
  imageUrl?: string | null;
  year?: number;
  isArchived?: boolean;
  participants?: number | null;
  winner?: string | null;
  runnerUp?: string | null;
  thirdPlace?: string | null;
  galleryUrls?: string[] | null;
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

export type Sponsor = {
  id: string;
  name: string;
  imageUrl: string | null;
  link: string | null;
  tier: string | null;
};

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
