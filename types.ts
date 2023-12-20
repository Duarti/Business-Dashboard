export type Business = {
  id: string;
  name: string;
  profile: Profile;
  created_at: string;
};

export type BusinessInput = {
  name: string;
  userId: string;
};

export type Profile = {
  id: string;
  email: string;
};
