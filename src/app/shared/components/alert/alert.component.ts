import { Component } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {EventService} from "../../services/EventService";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    ToastModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  constructor(private messageService: MessageService, private eventService: EventService) {
    this.eventService.listen('alert-success', (message) => this.showSuccessAlert(message));
    this.eventService.listen('alert-info', (message) => this.showInfoAlert(message));
    this.eventService.listen('alert-warning', (message) => this.showWarningAlert(message));
    this.eventService.listen('alert-error', (message) => this.showErrorAlert(message));
  }

  showErrorAlert(message: string) {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Błąd',
        detail: message
      }
    );
  }

  showWarningAlert(message: string) {
    this.messageService.add(
      {
        severity: 'warning',
        summary: 'Ostrzeżenie',
        detail: message
      }
    );
  }

  showInfoAlert(message: string) {
    this.messageService.add(
      {
        severity: 'info',
        summary: 'Info',
        detail: message
      }
    );
  }

  showSuccessAlert(message: string) {
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Sukces',
        detail: message
      }
    );
  }
}
