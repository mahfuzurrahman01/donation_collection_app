import { ObjectId } from "bson";

export interface IUserInfo {
  name: string;
  role: string;
  email: string;
}
export interface IDonation {
  name: string;
  category: string;
  imageLink: string;
  description: string;
  _id?: ObjectId | any;
  fundCollected?: number;
}
