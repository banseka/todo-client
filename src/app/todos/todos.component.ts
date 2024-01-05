import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, TodoItemComponent, MatGridListModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  todos = [
    {
    title:"happy to do ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    priority:"low"
  },
    {
    title:"happy to do ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    priority:"high"
  },
    {
    title:"happy to do ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    priority:"high"
  },
    {
    title:"happy to do ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    priority:"medium"
  },
    {
    title:"happy to do ",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    priority:"low"
  },
]

}
