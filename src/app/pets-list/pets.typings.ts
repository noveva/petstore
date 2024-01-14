import { ListItem } from 'carbon-components-angular';

export type PET_STATUS = 'pending' | 'available' | 'sold';

export interface Pet {
  id: number;
  name: string;
  status: PET_STATUS;
  photoUrls: string[];
}

export interface PetDropdownListItem extends ListItem {
  value: PET_STATUS;
}
