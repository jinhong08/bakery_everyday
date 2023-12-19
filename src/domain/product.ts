import { Store } from '@/domain/store';
import { File } from '@/domain/file';

export enum BreadType {
  BREAD = 'BREAD',
  COOKIES = 'COOKIES',
  DONUTS = 'DONUTS',
  CAKES = 'CAKES',
  TARTS = 'TARTS',
  CROISSANTS = 'CROISSANTS',
  PASTRIES = 'PASTRIES',
  SANDWICHES = 'SANDWICHES',
  PETIT_FOUR = 'PETIT_FOUR',
  ETC = 'ETC',
}

export const getBreadTypeName = (breadType: BreadType): string => {
  if (breadType === BreadType.BREAD) {
    return '식빵';
  } else if (breadType === BreadType.COOKIES) {
    return '쿠키';
  } else if (breadType === BreadType.DONUTS) {
    return '도넛';
  } else if (breadType === BreadType.CAKES) {
    return '케이크';
  } else if (breadType === BreadType.TARTS) {
    return '타르트';
  } else if (breadType === BreadType.CROISSANTS) {
    return '크로와상';
  } else if (breadType === BreadType.PASTRIES) {
    return '페스츄리';
  } else if (breadType === BreadType.SANDWICHES) {
    return '샌드위치';
  } else if (breadType === BreadType.PETIT_FOUR) {
    return '구움과자';
  } else if (breadType === BreadType.ETC) {
    return '기타';
  }

  return '';
};

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  store: Store;
  image?: File;
  name: string;
  description: File[];
  breadType: BreadType;
  price: number;
  quantity?: number;
  score: number;
}
