import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    date = new Date();
    todomydate = this.date.toString();
    //string convert
	todoList: string [] = [];
    todo: string;
    tododesc: string;
    
	
  constructor(public navCtrl: NavController, 
    public dataService: DataProvider) {
	this.dataService.getData().then((todos) => {
		if(todos) {
			this.todoList = todos;
		}
	});
  }

	addTodo() {
        this.todoList.push(this.todo);
        this.todoList.push(this.tododesc);
        this.todoList.push(this.todomydate);
		this.dataService.save(this.todoList);
        this.todo = "";
        this.tododesc = "";
        
    }
	
	editTodo(item) {
		var index = this.todoList.indexOf(item, 0);
        if (index > -1 && this.todo != "") {
            this.todoList[index] = this.todo;
			this.dataService.save(this.todoList);
            this.todo = "";
            this.tododesc = "";
        }
	}
	
    deleteTodo(item) {
        var index = this.todoList.indexOf(item, 0);
        if (index > -1) {
            this.todoList.splice(index, 1);
			this.dataService.save(this.todoList);
        }
    }
}
