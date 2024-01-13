import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule, ModalModule } from 'carbon-components-angular';

@Component({
  selector: 'app-add-pet-modal',
  standalone: true,
  imports: [ModalModule, ButtonModule],
  templateUrl: './add-pet-modal.component.html',
  styleUrl: './add-pet-modal.component.scss'
})
export class AddPetModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  handleAdd() {
    this.closeModal.emit(true);
  }

  handleClose() {
    this.closeModal.emit(false);
  }
}
