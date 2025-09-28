import { category } from "./category";

export interface video {
  _id?: number;
  slug?: string;
  title: string;
  description: string;
  poster: File | Blob | null | string;
  link: File | Blob | null | string;
  author?: string;
  posterLink?: string
  videoLink?: string
  category: string;
  isAvailable: boolean;
  created_at?: Date;
  updated_at?: Date;

}
