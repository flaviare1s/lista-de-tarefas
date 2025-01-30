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
  tasks.push({
    title: taskTitle,
    done: false});

  // Criando os elementos:

  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("task-container");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "task");
  input.addEventListener("change", (e) => {
    const liToToggle = e.target.parentElement;
    const spanToToggle = liToToggle.querySelector("span");
    const done = e.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks =tasks.map((task) => {
      if (task.title === spanToToggle.textContent) {
        return {
          title: task.title,
          done: !task.done
        }
      }
      return task;
    })
    console.log(tasks);
  })

  const span = document.createElement("span");
  span.textContent = taskTitle;

  const button = document.createElement("button");
  button.textContent = "x";
  button.setAttribute("id", "remove-task-button");
  button.addEventListener("click", (e) => {
    const liToRemove = e.target.parentElement;
    const titleToRemove = liToRemove.querySelector("span").textContent;
    tasks = tasks.filter((task) => task.title !== titleToRemove);
    todoList.removeChild(liToRemove);
    console.log(tasks);
  })

  TaskTitleInput.value = "";

  // Adicionando a nova tarefa no HTML
  div.appendChild(input);
  div.appendChild(span);
  li.appendChild(div);
  li.appendChild(button);
  todoList.appendChild(li);
})
