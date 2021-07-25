export interface Message {
  _id?: string;
  _rev?: string;
  message: string;
  sender: string;
  receiver: string;
  threadNumber: number;
  senderPhoto: string;
  receiverPhoto: string;
}
