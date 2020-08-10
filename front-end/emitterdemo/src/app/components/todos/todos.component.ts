import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';
import { ThrowStmt } from '@angular/compiler';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService, private service: NotificationsService) { }

  ngOnInit(): void {
    /* Fetching all todos from getTodoService */
    this.todoService.getTodoService().subscribe(todos => {
      this.todos = todos;

      /* Notification service */
      let i = setInterval(() => {

        let date = new Date();
        let systime = this.pad(date.getHours()) + ":" + this.pad(date.getMinutes()) + " " + date.toLocaleTimeString().slice(date.toLocaleTimeString().length - 2);
        console.log("system time "+systime);
        for (let t of this.todos) {
          console.log("todo time "+t.time);
          if (!t.completed) {
            if (t.scheduled) {
              if (t.time == systime) {
                console.log("Time matched!!!!");

                /* Reminder notification service */
                this.service.alert("Todo-Reminder", t.title, {
                  position: ['bottom', 'right'],
                  timeOut: 10000,
                  animate: 'fade',
                  showProgressBar: true
                });
              }
              else {
                console.log("Time not matched!!!!");
              }
            }
            else {
              console.log("Todo not scheduled!!!!");
            }
          }
          else {
            console.log("Todo is marked as completed");
          }
        }

      }, 45000);
    });
  }

  /* Appending leading zeros */
  pad(n: number): string {
    return n < 10 ? '0' + n : n + '';
  }

  /* get time data from todo-item component*/
  getData(todo: Todo) {
    console.log('Data from child ' + todo.scheduled + " and " + todo.time);
  }

  /* get todo to delete from todo-item component*/
  getDeleteTodoItem(todo: Todo) {
    // Delete from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete from backend
    this.todoService.deleteTodoService(todo).subscribe();
  }

  /* get new todo from add-todo component */
  getNewTodoItem(todo: any) {
    this.todoService.addTodoService(todo).subscribe(todo => {
      this.todos.unshift(todo);
    });
  }

}
