import { Component, Input } from '@angular/core';
import { PET_STATUS } from '../pets.typings';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
// TODO implement a slider for pet photos
export class PetCardComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) status?: PET_STATUS;
  @Input({ required: true }) photo?: string;

  handlePhotoFailed() {
    this.photo = '/assets/pet-fallback.svg';
  }
}
