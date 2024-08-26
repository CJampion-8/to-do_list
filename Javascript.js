const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('tasks');
const taskUser = document.getElementById('taskUser'); 

// Adding a task
function addTask() {
    if (taskInput.value === '') {
        alert('Please enter a task');
    } else {
        // Create a new task
        const task = document.createElement('li');
        task.innerHTML = taskInput.value;
        taskList.appendChild(task);

        const removeTaskButton = document.createElement('span');
        removeTaskButton.className = 'removeTaskIcon';
        removeTaskButton.innerHTML = '<img src="./src/trash.png" alt="Remove Task" style="width: 15px; height: 15px;"/>';
        task.appendChild(removeTaskButton);
        
        saveTasks();
    } taskInput.value = '';
}

// Also triggering addTask() when the enter key is pressed
document.getElementById('task-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

// Toggling between task being checked or unchecked
container.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveTasks();
    }
} );

// Toggle between light and dark theme
container.addEventListener('click', function(e) {
    if (e.target.tagName === 'changeThemeButton') {
        e.target.classList.toggle('checked');
        saveTasks();
    }
} );

container.addEventListener('mouseover', function(e) {
    if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
        const removeTaskButton = e.target.querySelector('.removeTaskIcon');
        if (removeTaskButton) {
            removeTaskButton.style.visibility = 'visible';
        }
    }
});

container.addEventListener('mouseout', function(e) {
    if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
        const isChild = e.relatedTarget && e.target.contains(e.relatedTarget);
        if (!isChild) {
            const removeTaskButton = e.target.querySelector('.removeTaskIcon');
            if (removeTaskButton) {
                removeTaskButton.style.visibility = 'hidden';
            }
        }
    }    
});

// Removing a task
container.addEventListener('click', function(e) {
    let targetElement = e.target;

    // Check if the target or any of its parents have the 'removeTaskIcon' class
    while (targetElement != null && !targetElement.classList.contains('removeTaskIcon')) {
        if (targetElement === container) {
            // Reached the container, stop the loop
            return;
        }
        targetElement = targetElement.parentElement;
    }

    // If a removeTaskIcon was clicked, remove the task
    if (targetElement != null && targetElement.classList.contains('removeTaskIcon')) {
        targetElement.parentElement.remove();
        saveTasks();
    }
});

// Prompt for a user's name upon first visit
function getName() {
    const name = prompt('What is your name?');
    if (name === null || name === '') {
        taskUser.innerHTML = "Your To-Do List";
    } else {
        taskUser.innerHTML = name + "'s To-Do List";
    }
}

// Save and load user's name
if (!localStorage.getItem('storedName')) {
    getName();
    saveName();
} else {
    loadName();
}

// Save and load tasks
if (!localStorage.getItem('tasks')) {
    saveTasks();
} else {
    loadTasks();
}
 // Name functions
function saveName() {
    const name = taskUser.innerHTML;
    localStorage.setItem('storedName', name);
}

function loadName() {
    taskUser.innerHTML = localStorage.getItem('storedName');
}

// Task functions
function saveTasks() {
    const tasks = taskList.innerHTML;
    localStorage.setItem('storedTasks', tasks);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem('storedTasks');
}

function checkTheme() {
    let themeIcon = document.getElementById('changeThemeButton');
    let lightIcon = '<img src="./src/sun.png" alt="Light Theme" style="width: 25px; height: 25px;"/>';
    let darkIcon = '<img src="./src/moon.png" alt="Dark Theme" style="width: 25px; height: 25px;"/>';
    let backgroundArt = document.body;
    let containerBackground = document.getElementById('container');
    let headerTextColor = document.getElementById('taskUser');
    let listTextColor = document.getElementById('task-input');

window.addEventListener('load', function() {
    loadName();
    loadTasks();
});
