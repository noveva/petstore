import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ButtonModule,
  InputModule,
  ModalModule,
  SelectModule
} from 'carbon-components-angular';
import { v4 as uuid } from 'uuid';
import { Pet, PET_STATUS } from '../pets.typings';
import { PET_STATUS_DROPDOWN_LIST_ITEMS } from '../pets.constants';

@Component({
  selector: 'app-add-pet-modal',
  standalone: true,
  imports: [
    ModalModule,
    ButtonModule,
    InputModule,
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-pet-modal.component.html',
  styleUrl: './add-pet-modal.component.scss'
})
export class AddPetModalComponent {
  petStatusSelectOptions = PET_STATUS_DROPDOWN_LIST_ITEMS;
  petForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    status: new FormControl<PET_STATUS>(this.petStatusSelectOptions[0].value)
    // photoUrls: new FormControl<string[]>([], Validators.required)
  });

  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  private generateIdFromUUID(idAsString: string): number {
    // the ways ids look in the API, it's just pets.length + 1
    // this felt so wrong, that decided to attempt to randomize this at least a bit to reduce the chance of ids clash when adding a new pet
    // not production code, just workign with what's there taken the assignment circumstances
    const now = new Date().getTime().toString();
    const charCodeSum = Array.from(idAsString).reduce(
      (accumulator, currentValue) => accumulator + currentValue.charCodeAt(0),
      0
    );
    return Number(now.concat(charCodeSum.toString()));
  }

  handleAdd() {
    const id = this.generateIdFromUUID(uuid());
    console.log(id, this.petForm.valid, JSON.stringify(this.petForm.value));
    // const formData = {
    //   id: new DataView(uuidParse(uuid())).getUint32(0)
    // };
    // this.closeModal.emit(true);
  }

  handleClose() {
    this.closeModal.emit(false);
  }
}
