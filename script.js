let tasks = [];

function renderTasks() {
  const pendingList = document.getElementById('pendingTasks');
  const completedList = document.getElementById('completedTasks');
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (${task.timestamp})`;
    li.appendChild(taskText);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    if (!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.onclick = () => completeTask(index);
      buttonDiv.appendChild(completeBtn);
    }

    li.appendChild(buttonDiv);

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text) {
    const timestamp = new Date().toLocaleString();
    tasks.push({ text, completed: false, timestamp });
    input.value = '';
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function completeTask(index) {
  tasks[index].completed = true;
  tasks[index].timestamp += ' (Completed: ' + new Date().toLocaleString() + ')';
  renderTasks();
}