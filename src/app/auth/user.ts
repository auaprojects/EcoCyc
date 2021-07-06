export interface User {
  uid: string;
  _id?: string;
  _rev?: string;
  email: string;
  fullname: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  role: string;
  phone?: string;
}
