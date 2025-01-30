const form = document.querySelector("#todo-form");
const TaskTitleInput = document.querySelector("#new-task-input");
const todoList = document.querySelector("#todo-list");

let tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTitle = TaskTitleInput.value;

  if (taskTitle.length < 3) {
    alert('Sua tarefa precisa ter pelo menos 3 caracteres!');
    return;
  }

  // Adicionando a nova tarefa no array de tasks
  tasks.push(taskTitle);

  // Adicionando a nova tarefa no HTML

  const li = document.createElement('li');
  li.textContent = taskTitle;

  todoList.appendChild(li)
})
