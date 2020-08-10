import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Todo} from '../models/Todo'
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'http://127.0.0.1:8000/todo/'
  constructor(private http:HttpClient) { }

  /* Get todos api */
  getTodoService():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl);
  }

  /* mark completed todos api */
  toggleCompleted(todo:Todo):Observable<any>{
    return this.http.put(`${this.todosUrl}${todo.id}/`,todo,httpOptions);
  }

  /* mark scheduled todos api */
  scheduleTodoService(todo:Todo):Observable<any>{
    return this.http.put(`${this.todosUrl}${todo.id}/`,todo,httpOptions);
  }

  /* update todo title api */
  updateTodoTitleService(todo:Todo):Observable<any>{
    return this.http.put(`${this.todosUrl}${todo.id}/`,todo,httpOptions);
  }

  /* delete todo api */
  deleteTodoService(todo:Todo):Observable<any>{
    return this.http.delete(`${this.todosUrl}${todo.id}/`,httpOptions);
  }

  /* add todo api */
  addTodoService(todo:any):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl,todo,httpOptions); 
  }
}
