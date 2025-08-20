export type Role = 'Admin' | 'Visitor';

export interface UserLogin{
id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}