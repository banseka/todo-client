import { Component, Inject, OnInit } from '@angular/core';
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
  MatDialogRef,
} from '@angular/material/dialog';
import { TodoService } from '../../services/todos/todo.service';
import { AuthServiceService } from '../../services/auth-service.service';

interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
  data: any
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
export class AddTodoComponent implements OnInit {
  todoForm!: FormGroup

  todo: any = {
    title: "",
    description: "",
    priority:""
  }
  userId!: string;
  constructor(
    private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA)  data: any,
      private todoServoce: TodoService,
      private userService: AuthServiceService,
      public dialogRef: MatDialogRef<AddTodoComponent>
     ){
    this.todoForm = this.fb.group({
      title: ["", Validators.required],
      description: ['', Validators.required, Validators.maxLength(150)],
      priority: ['', Validators.required]
    })

    this.todo = data

    this.userService.user$.subscribe(user => {
      this.userId = user._id
    })
  }

  ngOnInit(): void {
      console.log(this.todo)

    if (this.todo) {
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description,
        priority: this.todo.priority
      })
    }
  }

addTodo() {
  this.todoServoce.addTodo({...this.todoForm.value, userId: this.userId}).subscribe(response => {
    this.dialogRef.close(true)

  })

  this.todoServoce.loadUserTodo({userId: this.userId}).subscribe()
}

updateTodo(){
  this.todoServoce.updateTodo(this.todo._id, this.todoForm.value).subscribe()
  this.todoServoce.loadUserTodo({userId: this.userId}).subscribe()
  this.dialogRef.close(true)


}


}
