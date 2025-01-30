const form = document.querySelector("#todo-form");
const TaskTitleInput = document.querySelector("#new-task-input");
const todoList = document.querySelector("#todo-list");

let tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTitle = TaskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter pelo menos 3 caracteres!");
    return;
  }

  // Criando um ID único para a tarefa
  const taskId = `task-${tasks.length}`;

  // Adicionando a nova tarefa no array de tasks
  tasks.push({
    id: taskId,
    title: taskTitle,
    done: false,
  });

  // Criando os elementos:
  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("task-container");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", taskId);
  input.addEventListener("change", (e) => {
    const liToToggle = e.target.parentElement;
    const labelToToggle = liToToggle.querySelector("label");
    const done = e.target.checked;

    labelToToggle.style.textDecoration = done ? "line-through" : "none";

    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );

    console.log(tasks);
  });

  const label = document.createElement("label");
  label.setAttribute("for", taskId);
  label.textContent = taskTitle;

  const button = document.createElement("button");
  button.textContent = "x";
  button.setAttribute("id", "remove-task-button");
  button.addEventListener("click", (e) => {
    const liToRemove = e.target.parentElement;
    const titleToRemove = label.textContent;
    tasks = tasks.filter((task) => task.title !== titleToRemove);
    todoList.removeChild(liToRemove);
    console.log(tasks);
  });

  TaskTitleInput.value = "";

  // Adicionando a nova tarefa no HTML
  div.appendChild(input);
  div.appendChild(label);
  li.appendChild(div);
  li.appendChild(button);
  todoList.appendChild(li);
});
