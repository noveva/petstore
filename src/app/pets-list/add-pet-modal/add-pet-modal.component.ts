import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ButtonModule,
  IconModule,
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
    IconModule,
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
    status: new FormControl<PET_STATUS>(this.petStatusSelectOptions[0].value),
    photoUrls: new FormArray(
      [this.getNewPhotoUrlFormControl()], // TODO add custom validator for URL validation with smt like `url-regex-safe`
      Validators.required
    )
  });

  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  private getNewPhotoUrlFormControl(): FormControl {
    return new FormControl('', [Validators.required]);
  }

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
    const formData = {
      ...this.petForm.value,
      id: this.generateIdFromUUID(uuid())
    };
    console.log(this.petForm.valid, JSON.stringify(formData));
    // this.closeModal.emit(true);
  }

  handleClose() {
    this.closeModal.emit(false);
  }

  removeUrl(index: number) {
    this.petForm.controls.photoUrls.removeAt(index);
  }

  addUrl() {
    this.petForm.controls.photoUrls.push(this.getNewPhotoUrlFormControl());
  }
}
