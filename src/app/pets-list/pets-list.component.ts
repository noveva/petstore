import { Component } from '@angular/core';
import { MOCK_PETS } from './mock-pets';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent {
  pets = MOCK_PETS;
}
