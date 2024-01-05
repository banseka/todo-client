import { Component } from '@angular/core';
import { ErrorMessageService } from './error-message.service';
import { Observable, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  showMessage: boolean = false;

  errors$!: Observable<string[]>


  constructor(public messagesService: ErrorMessageService) {

  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => this.showMessage = true)
    )

  }

  onClose() {
    this.showMessage = false
  }

}
