import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DialogTypes } from 'src/shared/enums/dialog-types';

@Component({
  selector: 'app-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input() message: string;
  @Input() title: string;
  @Input() type: DialogTypes;
  @Input() buttons: string[];
  @Output() confirm = new EventEmitter<any>();

  close(): void {
    this.confirm.emit(false);
    const elem = document.getElementsByClassName('dialog')[0];
    elem.classList.remove('is-shown');
  }

  save(): void {
    this.confirm.emit(true);
    this.close();
  }
}
