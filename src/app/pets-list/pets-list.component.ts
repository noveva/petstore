import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PetCardComponent } from './card/card.component';
import { Pet } from './pets.typings';
import { PetstoreService } from '../services/petstore/petstore.service';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [PetCardComponent],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent implements OnInit {
  pets?: Pet[];

  constructor(
    private petStoreService: PetstoreService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getPets();
  }

  private getPets() {
    this.petStoreService
      .getPets()
      .pipe(takeUntilDestroyed(this.destroyRef)) // operator in dev preview, too tempting to not to give it a go in a pet project
      .subscribe({
        next: pets => {
          this.pets = pets;
        },
        error: () => {
          this.pets = [];
        }
      });
  }
}
