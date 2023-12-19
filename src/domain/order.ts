import { Product } from '@/domain/product';
import { Profile } from '@/domain/profile';

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  paidAmount: number;
  product: Product;
  member: Profile;
  status: OrderStatus;
}

export interface ExtendedOrder extends Order {
  orderUrl: string;
  orderSecret: string;
}

export enum OrderStatus {
  READY = 'READY',
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
}
