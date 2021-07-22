'use strict'

const addInfo = document.querySelector('.description');
const addBtn = document.querySelector('.add-btn');
const todo = document.querySelector('.todo-list-content');

let todoList = [];

if (localStorage.todo) {
    todoList = JSON.parse(localStorage.todo);
    showTodoList();
}

addBtn.addEventListener('click', () => {
    if (addInfo.value === '') {
        return;
    }

    let todoItem = {
        todo: addInfo.value,
        checked: false,
        important: false,
    }

    addInfo.value = '';
    todoList.push(todoItem);
    showTodoList();
    localStorage.setItem('todo', JSON.stringify(todoList));
})

function showTodoList() {
    let displayList = '';

    if (todoList.length === 0) todo.innerHTML = '';

    todoList.forEach( (item, i) => {
        displayList += `
        <li>
            <input type='checkbox' id='item-${i}' ${item.checked ? 'checked' : ''}>
            <label for='item-${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `
        todo.innerHTML = displayList;
    })
}

todo.addEventListener('change', (event) => {
    let inputId = event.target.getAttribute('id');
    let label = todo.querySelector('[for=' + inputId + ']');
    let labelText = label.innerHTML;

    todoList.forEach( (item) => {
        if (item.todo === labelText) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }     
    })
})

todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    todoList.forEach( (item, i) => {
        if(item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            
            showTodoList();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})