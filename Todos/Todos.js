// todoList = [{
//         text: "HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Python",
//         uniqueNo: 2
//     },
//     {
//         text: "React",
//         uniqueNo: 3
//     }
// ];

count = 0;
todoList = [];
let stringifiedTodoList = localStorage.getItem("todoList");
console.log(stringifiedTodoList);
if (stringifiedTodoList != null) {
    todoList = JSON.parse(stringifiedTodoList);
    todoListLength = todoList.length - 1;
    if (todoListLength > 0) {
        count = todoList[todoListLength].uniqueNo;
    }
}



function onAddTodo() {
    let userInputEle = document.getElementById("userInput");
    let userVal = userInputEle.value;
    if (userVal == "") {
        alert("please specify what you want to add");
        return;
    }
    count = count + 1;
    let newTodo = {
        text: userVal,
        uniqueNo: count,
        checkStatus: false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    userInputEle.value = "";
    saveTodo(todoList);

}

function statusChange(labelId, todoId) {
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("strike");

    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId == todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObj = todoList[todoIndex];
    console.log(todoObj);
    if (todoObj.checkStatus === true) {
        todoObj.checkStatus = false;
    } else {
        todoObj.checkStatus = true;
    }
    saveTodo(todoList);

}

function saveTodo(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onDeleteItem(todoId) {
    let liEle = document.getElementById(todoId);
    ulEle.removeChild(liEle);

    todoIndex = todoList.findIndex(function(eachTodo) {
        eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId == todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(todoIndex, 1);
    saveTodo(todoList);
};


let ulEle = document.getElementById("task-container");
let addEle = document.getElementById("add");
addEle.onclick = function() {
    onAddTodo();
};


function createAndAppend(todo) {
    let liId = "todo" + todo.uniqueNo;
    let liEle = document.createElement("li");
    liEle.id = liId;
    liEle.classList.add("li-item", "d-flex", "flex-row");
    ulEle.appendChild(liEle)

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    let checkboxId = todo.uniqueNo;
    inputElement.id = checkboxId;
    inputElement.classList.add("check-box")
    liEle.appendChild(inputElement);

    let labelCon = document.createElement("div");
    labelCon.classList.add("label-container", "d-flex", "flex-row", "shadow");
    liEle.appendChild(labelCon);

    let labelEle = document.createElement("label");
    labelEle.setAttribute("for", checkboxId);
    let labelId = "label" + todo.uniqueNo;
    labelEle.id = labelId;
    labelEle.textContent = todo.text;
    labelEle.classList.add("label-text")
    inputElement.onclick = function() {
        statusChange(labelId, liId);
    }
    if (todo.checkStatus == true) {
        labelEle.classList.add("strike");
        inputElement.checked = todo.checkStatus;
    }
    labelCon.appendChild(labelEle);

    let deleteConEle = document.createElement("div");
    deleteConEle.classList.add("delete-container");
    labelCon.appendChild(deleteConEle);

    let anchor = document.createElement("a");
    anchor.href = "#";
    deleteConEle.appendChild(anchor);

    let deleteiconEle = document.createElement("i");
    deleteiconEle.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteiconEle.onclick = function() {
        onDeleteItem(liId);
    }
    anchor.appendChild(deleteiconEle);
}

for (eachTodo of todoList) {
    createAndAppend(eachTodo);
}

console.log(ulEle);