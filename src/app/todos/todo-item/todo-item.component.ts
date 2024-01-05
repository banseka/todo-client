import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {NgClass} from '@angular/common';



@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatButtonModule,     MatTooltipModule,MatIconModule,NgClass
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input() todo: any;

  completeTodo(arg0: any) {
  throw new Error('Method not implemented.');
  }
  editTodo(arg0: any) {
  throw new Error('Method not implemented.');
  }

  getPriorityClass(priority: string) {
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }
}
