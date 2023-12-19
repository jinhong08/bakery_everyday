import { Manager } from '@/domain/manager';
import { File } from '@/domain/file';

export interface Store {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isManager: boolean;
  name: string;
  description: string;
  location: string;
  phone: string;
  manager: Manager;
  image: File;
}
