const containerDiv = document.querySelector('.container');
const containerDivH1 = document.querySelector('h1');

const popUpButton = document.querySelector('#popupButton');
const popUp = document.querySelector('.popup');

const addTaskButton = document.querySelector('#addTaskButton');
const taskInput = document.querySelector('#taskInput');

const firstTask = document.querySelector('.task');
const firstCheckBox = document.querySelector('input');
firstCheckBox.disabled = true;

const body = document.querySelector('body');

popUpButton.addEventListener('click', function(){
    body.classList.toggle('blur');
    
    popUp.classList.toggle('open-popup');
    taskInput.value = '';
})

document.addEventListener('click', function(event) {
    if (!popUp.contains(event.target) && !popUpButton.contains(event.target)) {
        if (body.classList.contains('blur')) {
            body.classList.remove('blur');
            popUp.classList.remove('open-popup');
        }
    }
})


let i = 1;
addTaskButton.addEventListener('click', function(){
    if (taskInput.value.trim() !== ''){
        const newDiv = document.createElement('div');
        newDiv.classList.add('task');

        const textDiv = document.createElement('div');
        textDiv.innerText = taskInput.value;
        textDiv.classList.add('taskText');
        
        const round = document.createElement('div');
        round.classList.add('round');

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('id', 'checkbox'+i);
        
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
          });
        


        const label = document.createElement('label');
        label.setAttribute('for', 'checkbox'+i);
        
        round.append(checkBox);
        round.append(label);
        
        if (i === 1){
            const temporary = firstTask;
            firstCheckBox.checked = true;
            temporary.remove();
            containerDiv.append(temporary);
        }

        i++;

        newDiv.append(round);
        newDiv.append(textDiv);
        
        containerDivH1.insertAdjacentElement('afterend', newDiv);
        
        taskInput.value = '';
    }
    
    popUp.classList.toggle('open-popup');
    body.classList.toggle('blur');
})
