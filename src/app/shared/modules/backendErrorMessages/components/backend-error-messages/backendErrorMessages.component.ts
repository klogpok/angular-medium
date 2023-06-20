import { Component, Input, OnInit } from '@angular/core';
import { IBackendErrors } from '@shared/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: IBackendErrors | null;

  ngOnInit() {}
}
