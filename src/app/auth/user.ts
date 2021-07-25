export interface User {
  _id?: string;
  _rev?: string;
  email: string;
  fullname: string;
  photoURL: string;
  password?: string;
  role: string;
  phone?: string;
}
