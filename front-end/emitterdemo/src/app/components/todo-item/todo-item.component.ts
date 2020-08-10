import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() time_input_value: string;
  @Input() todo: Todo;

  @Output() deleteTodoItem: EventEmitter<Todo> = new EventEmitter();
  editRequest: boolean = false;
  editStatus: boolean = true;
  scheduled: boolean = false;
  todoTime: string;
  scheduled_status_flag: boolean = false;
  completed_status_flag: boolean = false;
  updateTodoValue:string;


  @Output() timeObj: EventEmitter<any> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    /*update completed and scheduled status based on fetched todo from todos component */
    this.scheduled_status_flag = this.todo.scheduled;
    this.completed_status_flag = this.todo.completed;
    this.todoTime = this.todo.time.slice(0,-3);
  }


  /* Set dynamic css class i.e todo */
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes
  }


  /* Todo toggle checkbox event handler */
  onToggle(todo: Todo) {
    // Toggle in ui
    this.todo.completed = !this.todo.completed;
    console.log('Inside togggle ' + todo.completed);

    // Toggle at server backend
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    });
  }

  /* Todo delete button event handler*/
  onDelete(todo: Todo) {
    console.log('Inside delete ' + todo.completed);
    this.deleteTodoItem.emit(todo);
  }

  /* Todo click button event handler for edit functionality */
  onEdit(todo: Todo) {
    this.editRequest = !this.editRequest;
    this.editStatus = !this.editStatus;
  }

  /* Todo click button event handler for update functionality */
  onUpdate(updateform:any,todo: Todo) {
    this.editStatus = !this.editStatus;
    this.editRequest = !this.editRequest;
    this.updateTodoValue = ((document.getElementById("updateTodoTitleID") as HTMLInputElement).value);
    this.todo.title = this.updateTodoValue;
    this.todoService.updateTodoTitleService(todo).subscribe(todo =>{
      console.log(todo)
    });
  }


  /* Blur event handler for time */
  getTime(val: any, todo: Todo) {
    todo.time = val.target.value;
    let h = todo.time.slice(0,-3);
    let m = todo.time.slice(3);
    let ampm = h >= "12" ?"PM":"AM";
    this.todoTime = h+":"+m;
    todo.time = h+":"+m+" "+ampm;
  }

  /* Schedule checkbox event handler for todo task scheduling */
  scheduleTask(val: any, todo: Todo) {
    this.scheduled = !this.scheduled;
    todo.scheduled = !todo.scheduled;
    this.timeObj.emit(todo);

    this.todoService.scheduleTodoService(todo).subscribe(todo => {
      console.log(todo);
    });
  }
}
