import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ButtonModule,
  DropdownModule,
  IconModule,
  ModalModule
} from 'carbon-components-angular';
import { PetCardComponent } from './card/card.component';
import { PET_STATUS, Pet, PetDropdownListItem } from './pets.typings';
import { PetstoreService } from '../services/petstore/petstore.service';
import { AddPetModalComponent } from './add-pet-modal/add-pet-modal.component';
import { PET_STATUS_DROPDOWN_LIST_ITEMS } from './pets.constants';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [
    ModalModule,
    PetCardComponent,
    AddPetModalComponent,
    DropdownModule,
    ButtonModule,
    IconModule
  ],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent implements OnInit {
  pets?: Pet[];
  isAddingPet: boolean = false;
  defaultFilterStatus: PET_STATUS = 'available';
  filterByOptions: PetDropdownListItem[] = PET_STATUS_DROPDOWN_LIST_ITEMS;

  constructor(
    private petStoreService: PetstoreService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getPets();
  }

  private getPets(status: PET_STATUS = this.defaultFilterStatus) {
    this.petStoreService
      .getPets(status)
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

  // Angular CDS does not provide a type and uses object instead :(
  handleStatusSelected($event: any) {
    const selected =
      $event && $event.item ? $event.item.value : this.defaultFilterStatus;
    this.getPets(selected);
  }

  addPet() {
    this.isAddingPet = true;
  }

  handleCloseModal(pet?: Pet) {
    this.isAddingPet = false;
    console.log('CLOSED, should update list? ', JSON.stringify(pet));
  }
}
