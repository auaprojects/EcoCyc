export interface Request {
  uid?: string;
  _id?: string;
  _rev?: string;
  category: string;
  userId?: string;
  quantity: string;
  addressLine1: string;
  city?: string;
  fullname?: string;
  weight?: string;
  description?: string;
  addressLine2?: string;
  state?: string;
  status: string;
  pickupDate?: string;
  pickupTime?: string;
  photoURL?: string;
  createdAt?: string;
}
