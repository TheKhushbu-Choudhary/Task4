document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const pendingTasks = document.getElementById('pendingTasks');
    const clearCompleted = document.getElementById('clearCompleted');
    const clearAll = document.getElementById('clearAll');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.name}
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
        updateStats();
    }

    function updateStats() {
        totalTasks.textContent = `Total: ${tasks.length}`;
        const completedCount = tasks.filter(task => task.completed).length;
        completedTasks.textContent = `Completed: ${completedCount}`;
        pendingTasks.textContent = `Pending: ${tasks.length - completedCount}`;
    }

    addBtn.addEventListener('click', function() {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            taskInput.value = '';
            saveAndRender();
        }
    });

    taskList.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            saveAndRender();
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveAndRender();
        }
    });

    clearCompleted.addEventListener('click', function() {
        tasks = tasks.filter(task => !task.completed);
        saveAndRender();
    });

    clearAll.addEventListener('click', function() {
        tasks = [];
        saveAndRender();
    });

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    renderTasks();
});

