import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatDialog, MatDialogConfig,
} from '@angular/material/dialog';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoService } from '../services/todos/todo.service';
import { AuthServiceService } from '../services/auth-service.service';
import { AsyncPipe } from '@angular/common';
import { filter, tap } from 'rxjs';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, TodoItemComponent, MatGridListModule, AsyncPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{

  userData: any
  constructor(
    public dialog: MatDialog,
    public todoService: TodoService,
    private authService: AuthServiceService){

  }

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        this.userData = user
      })

      this.loadTodos()
  }

  openDialog() {
    this.dialog.open(AddTodoComponent, {});
  }

  completeTodo(todo: any){
    todo.completed = true
    this.todoService.updateTodo(todo._id, todo).subscribe()
  }


edithTodo(todo: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.data = todo
  this.dialog.open(AddTodoComponent, dialogConfig)
  }

  deleteTodo(todo: any) {
    this.todoService.deleteTodo(todo._id).subscribe()
    this.loadTodos()
  }


  loadTodos(){
    const params = {
      userId: this.userData._id
    }
    this.todoService.loadUserTodo(params).subscribe()
  }

}
