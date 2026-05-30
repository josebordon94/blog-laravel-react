export type User = {
  id: number;
  name: string;
  email: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  image_path?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export const IS_TYPES_LOADED = true;
