import { Profile } from '@/domain/profile';
import { Product } from '@/domain/product';
import { File } from '@/domain/file';

export interface Review {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  member: Profile;
  product: Product;
  score: number;
  content: string;
  attachment: File[];
}

export interface ReviewList {
  content: Review[];
  totalElement: number;
}
