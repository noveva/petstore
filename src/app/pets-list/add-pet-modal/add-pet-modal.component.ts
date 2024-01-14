import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { PetstoreService } from '../../services/petstore/petstore.service';
import { PET_STATUS, Pet } from '../pets.typings';
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
export class AddPetModalComponent implements OnDestroy {
  destroyed: Subject<boolean> = new Subject();
  petStatusSelectOptions = PET_STATUS_DROPDOWN_LIST_ITEMS;
  petForm = this.getNewPetForm();
  isSubmitting: boolean = false;

  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<Pet | undefined> = new EventEmitter();

  constructor(private petStoreService: PetstoreService) {}

  ngOnDestroy(): void {
    // current state of affairs for subscriptions cleanup if you don't want to use destroyRef since it's still under dev preview
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  private getNewPetForm(): FormGroup<{
    name: FormControl<string | null>;
    status: FormControl<PET_STATUS | null>;
    photoUrls: FormArray<FormControl<string>>;
  }> {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(140)
      ]),
      status: new FormControl<PET_STATUS>(this.petStatusSelectOptions[0].value),
      photoUrls: new FormArray(
        [this.getNewPhotoUrlFormControl()], // TODO add custom validator for URL validation with smt like `url-regex-safe`, separate case would be the data URLs
        Validators.required
      )
    });
  }

  private getNewPhotoUrlFormControl(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  private generateIdFromUUID(idString: string): number {
    // this attempts to randomize the id at least a bit to reduce the chance of it clashing when adding a new pet
    // not production code, just working with what's there taken the assignment circumstances
    const now = new Date().getTime().toString();
    const charCodeSum = Array.from(idString).reduce(
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
    this.isSubmitting = true;
    this.petStoreService
      .addPet(formData as Pet)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: pet => {
          this.closeModal.emit(pet);
          this.petForm = this.getNewPetForm();
        },
        error: error => {
          // TODO add ErrorInterceptor to display toast error messages at app root as CDS demo shows
          console.error(error);
        },
        complete: () => (this.isSubmitting = false)
      });
  }

  handleClose() {
    this.closeModal.emit();
  }

  removeUrl(index: number) {
    this.petForm.controls.photoUrls.removeAt(index);
  }

  addUrl() {
    this.petForm.controls.photoUrls.push(this.getNewPhotoUrlFormControl());
  }
}
