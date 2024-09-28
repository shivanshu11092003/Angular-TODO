const request = indexedDB.open("TodoDatabase", 1);

request.error = function (event) {
  console.log("Error in Request");
};

request.onupgradeneeded = (event) => {
  let db = request.result;

  let response = db.createObjectStore("Todo", {
    keyPath: "id",
    autoIncrement: true,
  });
  response.createIndex("text", "text", { unique: false });
  response.createIndex("email", "email", { unique: false });
};
//Getting Data
let Data = [];
request.onsuccess = function (event) {
  let db = request.result;
  let transaction = db.transaction("Todo", "readwrite");
  let store = transaction.objectStore("Todo");

  let index = store.index("email");
  let responseResult = index.getAll(sessionStorage.getItem("email"));

  responseResult.onsuccess = (e) => {
    Data = e.target.result;

    console.log(Data);
  };
  console.log(responseResult);

  responseResult.onerror = (e) => {
    console.log(e.target.result);
  };
};

var myApp = angular.module("todoApp", ["ui.router"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/todo");
  var helloState = {
    name: "todo",
    url: "/todo",
    templateUrl: "todotemplate.html",
    controller: "TodoListController",
  };

  var aboutState = {
    name: "notes",
    url: "/notes",
    templateUrl: "notestemplate.html",
    controller: "noteListController",
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});

myApp.factory("product", function () {
  let product = [];

  const request = indexedDB.open("TodoDatabase", 1);
  let Data = [];
  request.onsuccess = function (event) {
    let db = request.result;
    let transaction = db.transaction("Todo", "readwrite");
    let store = transaction.objectStore("Todo");

    let index = store.index("email");
    let responseResult = index.getAll(sessionStorage.getItem("email"));

  responseResult.onsuccess = (e) => {
    product = e.target.result;
    


      
    };


    responseResult.onerror = (e) => {
      console.log(e.target.result);
    };
  };
  
  return product


});

//Todo
myApp.controller("TodoListController", ["product",function (product) {
  

    this.todos = Data;

    console.log(product);

    this.addTodo = function () {
      const textToSave = this.todoText;
      console.log(textToSave)
      let sessionEmail = sessionStorage.getItem("email");
      let arr = [];
      arr.push({
        text: textToSave,
        email: sessionEmail,
        done: false,
      });

      const request = indexedDB.open("TodoDatabase", 1);
      request.onsuccess = function (event) {
        let db = request.result;

        let transaction = db.transaction("Todo", "readwrite");
        let store = transaction.objectStore("Todo");

        arr.forEach((element) => {
          store.add(element);
        });
      };
      this.todoText = "";

      this.todos = Data;
    };

    this.delTodo = function (index) {
      const request = indexedDB.open("TodoDatabase", 1);
      request.onsuccess = function (event) {
        let db = request.result;
        let transaction = db.transaction("Todo", "readwrite");
        let store = transaction.objectStore("Todo");

        console.log(Data[index].id);

        store.delete(Data[index].id);
        Data.splice(index, 1);

        this.todos = Data;
      };
    };

    this.updateTodo = function (index) {
      const updateValue = prompt("Enter New Todo Task");
      console.log(updateValue);

      const request = indexedDB.open("TodoDatabase", 1);
      request.onsuccess = function (event) {
        let db = request.result;

        let transaction = db.transaction("Todo", "readwrite");
        let store = transaction.objectStore("Todo");
        const sessionEmail = sessionStorage.getItem("email");

        console.log(Data[index].id);
        const elementId = Data[index].id;
        const status = Data[index].done;
        console.log(elementId);

        store.put({
          id: elementId,
          text: updateValue,
          email: sessionEmail,
          done: status,
        });
      };
    };

    this.updateStatus = function (index) {
      console.log(Data);

      const request = indexedDB.open("TodoDatabase", 1);
      request.onsuccess = function (event) {
        let db = request.result;

        let transaction = db.transaction("Todo", "readwrite");
        let store = transaction.objectStore("Todo");
        const sessionEmail = sessionStorage.getItem("email");

        console.log(Data[index].id);
        const elementId = Data[index].id;
        let status1 = Data[index].done;

        if (!status1) {
          status1 = true;
        } else {
          status1 = false;
        }
        const updateValue = Data[index].text;
        let status = Data[index].done;

        console.log(status);

        store.put({
          id: elementId,
          text: updateValue,
          email: sessionEmail,
          done: status,
        });
        // location.reload();
      };
    };
  },
]);

const requestNotes = indexedDB.open("NotesDatabase", 1);

requestNotes.error = function (event) {
  console.log("Error in Request");
};

requestNotes.onupgradeneeded = (event) => {
  let db = requestNotes.result;

  let response = db.createObjectStore("Notes", {
    keyPath: "id",
    autoIncrement: true,
  });
  response.createIndex("text", "text", { unique: false });
  response.createIndex("email", "email", { unique: false });
};
let notesData = [];
requestNotes.onsuccess = function (event) {
  let db = requestNotes.result;
  let transaction = db.transaction("Notes", "readwrite");
  let store = transaction.objectStore("Notes");
  //     let responseSave = store.add({
  //         id: 2,
  //         text: "Erp",
  //         done: false
  //  })
  let index = store.index("email");
  let responseResult = index.getAll(sessionStorage.getItem("email"));

  responseResult.onsuccess = (e) => {
    console.log(e.target.result);
    notesData = e.target.result;
  };
  responseResult.onerror = (e) => {
    console.log(e.target.result);
  };
};

myApp.controller("noteListController", function () {
  this.notes = notesData;

  this.addNote = function () {
    console.log("Adding ....");
    const textToSave = this.noteText;
    let sessionEmail = sessionStorage.getItem("email");
    let arr = [];
    console.log(textToSave);
    arr.push({
      text: textToSave,
      email: sessionEmail,
    });
    console.log(arr);

    const requestNotes = indexedDB.open("NotesDatabase", 1);
    requestNotes.onsuccess = function (event) {
      let db = requestNotes.result;

      let transaction = db.transaction("Notes", "readwrite");
      let store = transaction.objectStore("Notes");

      arr.forEach((element) => {
        store.add(element);
      });
    };
    this.noteText = "";
    location.reload();
  };
  this.delTodo = function (index) {
    const requestNotes = indexedDB.open("NotesDatabase", 1);
    requestNotes.onsuccess = function (event) {
      let db = requestNotes.result;

      let transaction = db.transaction("Notes", "readwrite");
      let store = transaction.objectStore("Notes");
      let indexofStore = store.index("email");
      let responseResult = indexofStore.getAll(sessionStorage.getItem("email"));

      responseResult.onsuccess = (e) => {
        console.log(e.target.result);
        notesData = e.target.result;
      };
      console.log(notesData[index].id);

      store.delete(notesData[index].id);
      Data.splice(index,1)
    };
  };

  this.updateTodo = function (index) {
    const updateValue = prompt("Enter Note Task");
    console.log(updateValue);

    const requestNotes = indexedDB.open("NotesDatabase", 1);
    requestNotes.onsuccess = function (event) {
      let db = requestNotes.result;

      let transaction = db.transaction("Notes", "readwrite");
      let store = transaction.objectStore("Notes");
      const sessionEmail = sessionStorage.getItem("email");

      console.log(notesData[index].id);
      const elementId = notesData[index].id;
      console.log(elementId);

      store.put({
        id: elementId,
        text: updateValue,
        email: sessionEmail,
      });
      location.reload();
    };
  };
});

// document.getElementById("logout").addEventListener("click", () => {
//   window.location.assign("http://127.0.0.1:5501/LoginModule/Login.html");
// });
