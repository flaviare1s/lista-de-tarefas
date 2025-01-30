const form = document.querySelector("#todo-form");
const TaskTitleInput = document.querySelector("#new-task-input");
const todoList = document.querySelector("#todo-list");
const removeTaskButton = document.querySelector("#remove-task-button");

let tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTitle = TaskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres!");
    return;
  }

  // Adicionando a nova tarefa no array de tasks
  tasks.push(taskTitle);

  // Criando os elementos:

  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("task-container");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "task");

  const span = document.createElement("span");
  span.textContent = taskTitle;

  const button = document.createElement("button");
  button.textContent = "x";
  button.setAttribute("id", "remove-task-button");

  TaskTitleInput.value = "";

  // Adicionando a nova tarefa no HTML
  div.appendChild(input);
  div.appendChild(span);
  li.appendChild(div);
  li.appendChild(button);
  todoList.appendChild(li);
})
