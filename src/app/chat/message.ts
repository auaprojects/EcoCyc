export interface Message {
  _id?: string;
  _rev?: string;
  message: string;
  sender: string;
  receiver: string;
  type?: string;
  threadNumber: string;
  createdAt?: string;
  senderPhoto?: string;
  receiverPhoto?: string;
}
