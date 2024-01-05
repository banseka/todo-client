import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
     MatInputModule,
     FormsModule,
     MatFormFieldModule,
     MatButtonModule,
     MatIconModule,
     MatSelectModule,
     MatDialogTitle, MatDialogContent
    ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  todoForm!: FormGroup

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData){
    this.todoForm = this.fb.group({
      title: ["", Validators.required],
      description: ['', Validators.required, Validators.maxLength(150)],
      priority: ['', Validators.required]
    })
  }
addTodo() {
throw new Error('Method not implemented.');
}

}
