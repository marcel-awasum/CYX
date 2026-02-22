const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const errorEl = document.getElementById('error');

const tasks = [];

function render() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';

    const label = document.createElement('span');
    label.textContent = task;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      render();
    });

    li.append(label, removeBtn);
    taskList.appendChild(li);
  });

  emptyState.style.display = tasks.length ? 'none' : 'block';
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    errorEl.textContent = 'Please enter a task before adding.';
    taskInput.focus();
    return;
  }

  errorEl.textContent = '';
  tasks.push(text);
  taskInput.value = '';
  taskInput.focus();
  render();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

render();
