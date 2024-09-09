var myApp = angular.module('todoApp', ['ui.router']);


myApp.config(function ($stateProvider) {
    var helloState = {
        name: 'todo',
        url: '/todo',
        templateUrl: 'todotemplate.html',
        controller: "TodoListController"
    }

    var aboutState = {
        name: 'notes',
        url: '/notes',
        templateUrl: 'notestemplate.html',
        controller: "noteListController"
    }

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});

const request = indexedDB.open("TodoDatabase", 1)

request.error = function (event) {
    console.log("Error in Request")
}

request.onupgradeneeded = (event) => {
    let db = request.result;
    let sessionEmail = sessionStorage.getItem("email")

    let response = db.createObjectStore("Todo", { keyPath: "email"});
    response.createIndex("text", "text", { unique: false })

}
let Data = []
request.onsuccess = function (event) {
    let db = request.result;
    let transaction = db.transaction("Todo", "readwrite")
    let store = transaction.objectStore("Todo")
    //     let responseSave = store.add({
    //         id: 2,
    //         text: "Erp",
    //         done: false   
    //  })
    let responseResult = store.getAll()
    

    responseResult.onsuccess = (e) => {
        console.log(e.target.result)
        Data = e.target.result;
    }
    responseResult.onerror = (e) => {
        console.log(e.target.result)
    }
}


myApp.controller('TodoListController', function () {



    this.todos = Data;



    this.addTodo = function () {
        const textToSave =this.todoText
        let sessionEmail = sessionStorage.getItem("email")
        let arr =[]
        arr.push({
            text: textToSave,
            done: false
        })
        
        const request = indexedDB.open("TodoDatabase", 1)
        request.onsuccess = function (event) {
            let db = request.result;
            
            let transaction = db.transaction("Todo", "readwrite")
            let store1 = transaction.objectStore("Todo")
            let store2 = transaction.objectStore("data")
          

            arr.forEach(element =>{
                store1.add(element)
            })
            
                // let responseSave = store.add({
                //     text: textToSave,
                //     email: sessionEmail,
                //     done: false
                // })
        
            
        
        
        
        
            // responseSave.onsuccess = (e) => {
            //     console.log(e.target.result)
        
            // }
            // responseSave.onerror = (e) => {
            //     console.log(e.target.result)
            // }
          
        }


    };
    this.delTodo = function (index) {
        console.log(index)
        this.todos.splice(index, 1);
    }
    this.updateTodo = function (index) {
        const updateValue = prompt("Enter New Todo Task")
        console.log(updateValue)
        this.todos[index].text == updateValue
    }


}).controller('noteListController', function () {
    this.notes = [
        { text: ' cI hope this message finds you well. My name is Shivanshu Gupta, and I am writing to express my interest in the internship opportunity that focuses on Kotlin and Jetpack Compose. I am enthusiastic about contributing to your team and further honing my skills in Android development. As a passionate Android developer, I have been working extensively with Kotlin and Jetpack Compose, and I am confident in my ability to add value to your projects. I have developed several applications that demonstrate my understanding of modern Android development practices, which you can review on my GitHub project links:ricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricket 1hr', title: "My Journey" },
        { text: 'Classecricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcrickets', title: "yesterday" },
        { text: 'Erp cricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricketcricket', title: "title" }
    ];
    this.addNote = function () {
        this.notes.push({ text: this.noteText, title: this.notes.length });
        this.noteText = '';
    };
    this.deltodo = function (index) {
        console.log(index)
        this.notes.splice(index, 1);
    }

})
/*
'<div class="todoList" ng-controller="TodoListController as todoList">'
    +'<form ng-submit="todoList.addTodo()"><input type="text" ng-model="todoList.todoText"  size="30"placeholder="add new todo"><input class="btn-primary" type="submit" value="add"></form>'+'<ul class="unstyled"><li ng-repeat="todo in todoList.todos"><label class="checkbox">'
    +'<input type="checkbox" ng-model="todo.done"><span class="done-{{todo.done}}">{{todo.text}}</span>'+'</label></li></ul></div>' */


