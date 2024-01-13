export type PET_STATUS = 'pending' | 'available' | 'sold';

export interface Pet {
  id: number;
  name: string;
  status: PET_STATUS;
  photoUrls: string[];
}
