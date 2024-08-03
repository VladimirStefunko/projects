const containerDiv = document.querySelector('.container');
const containerDivH1 = document.querySelector('h1');

const popUpButton = document.querySelector('#popupButton');
const popUp = document.querySelector('.popup');

const addTaskButton = document.querySelector('#addTaskButton');
const taskInput = document.querySelector('#taskInput');

const body = document.querySelector('body');

let i = 1;

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        tasks.push({
            text: task.querySelector('.taskText').innerText,
            checked: task.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.checked);
    });
}

popUpButton.addEventListener('click', function(){
    body.classList.toggle('blur');
    popUp.classList.toggle('open-popup');
    taskInput.value = '';
});

document.addEventListener('click', function(event) {
    if (!popUp.contains(event.target) && !popUpButton.contains(event.target)) {
        if (body.classList.contains('blur')) {
            body.classList.remove('blur');
            popUp.classList.remove('open-popup');
        }
    }
});

function addTask(text, checked = false) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('task');

    const textDiv = document.createElement('div');
    textDiv.innerText = text;
    textDiv.classList.add('taskText');
    
    const round = document.createElement('div');
    round.classList.add('round');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'checkbox'+i);
    checkBox.checked = checked;
    
    checkBox.addEventListener('change', function() {
        if (this.checked) {
            const temporary = this.parentElement.parentElement;
            temporary.remove();
            containerDiv.append(temporary);
        } else {
            const temporary = this.parentElement.parentElement;
            temporary.remove();
            containerDivH1.insertAdjacentElement('afterend', newDiv);
        }
        saveTasks();
    });

    const label = document.createElement('label');
    label.setAttribute('for', 'checkbox'+i);
    
    round.append(checkBox);
    round.append(label);
    
    i++;

    newDiv.append(round);
    newDiv.append(textDiv);

    deleteButton = document.createElement('button');
    deleteButton.innerHTML = '╳';
    deleteButton.classList.add('deleteButton')
    deleteButton.addEventListener('click', function() {
        newDiv.remove();
        saveTasks();
    });

    newDiv.append(deleteButton);
    
    if (checkBox.checked) {
        containerDiv.append(newDiv);
    }
    else {
        popUpButton.insertAdjacentElement('beforebegin', newDiv);
    }

    saveTasks();
}

addTaskButton.addEventListener('click', function(){
    if (taskInput.value.trim() !== ''){
        addTask(taskInput.value);
        taskInput.value = '';
    }
    popUp.classList.toggle('open-popup');
    body.classList.toggle('blur');
});

document.addEventListener('DOMContentLoaded', loadTasks);
