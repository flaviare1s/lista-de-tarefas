const form = document.querySelector("#todo-form");
const TaskTitleInput = document.querySelector("#new-task-input");
const todoList = document.querySelector("#todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Carrega as tarefas ou inicializa um array vazio

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTitle = TaskTitleInput.value.trim();

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres!");
    return;
  }

  // Criando um ID único para a tarefa
  const taskId = `task-${tasks.length}`;

  const newTask = {
    id: taskId,
    title: taskTitle,
    done: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHTML(newTask);

  TaskTitleInput.value = "";
});

function renderTaskOnHTML(task) {
  if (!task.title) return; // Evita criar elementos vazios

  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("task-container");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", task.id);
  input.checked = task.done; // Mantém o estado salvo no localStorage
  input.addEventListener("change", (e) => {
    const liToToggle = e.target.parentElement;
    const labelToToggle = liToToggle.querySelector("label");
    const done = e.target.checked;

    labelToToggle.style.textDecoration = done ? "line-through" : "none";

    tasks = tasks.map((t) => (t.id === task.id ? { ...t, done } : t));

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  const label = document.createElement("label");
  label.setAttribute("for", task.id);
  label.textContent = task.title;
  label.style.textDecoration = task.done ? "line-through" : "none"; // Mantém o estilo salvo

  const button = document.createElement("button");
  button.textContent = "x";
  button.setAttribute("id", "remove-task-button");
  button.addEventListener("click", (e) => {
    const liToRemove = e.target.parentElement;
    tasks = tasks.filter((t) => t.id !== task.id);
    todoList.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  div.appendChild(input);
  div.appendChild(label);
  li.appendChild(div);
  li.appendChild(button);
  todoList.appendChild(li);
}

// Carrega as tarefas do localStorage sem adicioná-las novamente ao array
window.onload = () => {
  tasks.forEach(renderTaskOnHTML);
};
