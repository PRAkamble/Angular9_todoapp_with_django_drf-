import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title:string;
  @Output() addTodoItem:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  /* Todo ngform submit event handler for new data */
  onSubmit(regForm:any){
    console.log(regForm);
    console.log("Inside onsubmit");
    const todo = {
      title : this.title,
      completed : false,
      scheduled : false,
      time : '13:00 PM'
    }

    this.addTodoItem.emit(todo);
  }

}
