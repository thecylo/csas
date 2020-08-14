import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { BusyIndicatorComponent } from './components/busy-indicator/busy-indicator.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [NotificationComponent, BusyIndicatorComponent, DialogComponent],
  imports: [CommonModule],
  exports: [NotificationComponent, BusyIndicatorComponent],
})
export class SharedModule {}
