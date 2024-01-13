import { Component } from '@angular/core';
import { MOCK_PETS } from './mock-pets';
import { PetCardComponent } from './card/card.component';
import { Pet } from './pets.typings';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [PetCardComponent],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent {
  pets: Pet[] = MOCK_PETS;
}
