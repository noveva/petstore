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
  filterByOptions: PetDropdownListItem[] = PET_STATUS_DROPDOWN_LIST_ITEMS.map(
    listItem => {
      if (listItem.value === this.defaultFilterStatus) {
        listItem.selected = true;
      }
      return listItem;
    }
  );
  private petsFilteredBy?: PET_STATUS;

  constructor(
    private petStoreService: PetstoreService,
    private destroyRef: DestroyRef // under dev preview, perfect for a pet project
  ) {}

  ngOnInit(): void {
    this.getPets(this.defaultFilterStatus);
  }

  private getPets(status: PET_STATUS) {
    this.petStoreService
      .getPets(status)
      .pipe(takeUntilDestroyed(this.destroyRef)) // operator in dev preview, too tempting to not to give it a go in a pet project
      .subscribe({
        next: pets => {
          this.pets = pets;
          this.petsFilteredBy = status;
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
    if (pet && pet.status === this.petsFilteredBy) {
      // the requirement is formulated as "Refresh the overview after adding a new pet."
      // if "refresh" === "show the pet you just added": the two lines below are fine, spares you an API call
      this.pets = this.pets || [];
      this.pets.push(pet);
      // if "refresh" === "fetch the list with the same status", the line below should be uncommented instead of the two lines above
      // this.getPets(this.petsFilteredBy);
    }
  }
}
