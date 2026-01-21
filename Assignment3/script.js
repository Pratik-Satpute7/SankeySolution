const tInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-task-btn");
const tList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const jokeSection = document.getElementById("joke-section");
const progressBar = document.getElementById("progress-bar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
  tList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <span class="task-text ${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <div class="task-buttons">
        <button class="complete-btn" data-id="${task.id}">✔</button>
        <button class="edit-btn" data-id="${task.id}">Edit</button>
        <button class="delete-btn" data-id="${task.id}">Delete </button>
      </div>
    `;

    tList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  totalTasks.textContent = total;
  completedTasks.textContent = completed;

  progressBar.style.width = percent + "%";
}


addBtn.addEventListener("click", () => {
  const text = tInput.value.trim();
  if (!text) return;
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });
  tInput.value = "";
  saveTasks();
  displayTasks();
});

// Event delegation for task buttons
tList.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return;

  if (e.target.classList.contains("complete-btn")) {
    task.completed = !task.completed;
  }

  if (e.target.classList.contains("edit-btn")) {
    const newText = prompt("Edit task:", task.text);
    if (newText) task.text = newText.trim();
  }

  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter(t => t.id !== id);
  }

  saveTasks();
  displayTasks();
});
 
async function fetchJoke() {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await res.json();

    const jokeParagraph = jokeSection.querySelector("p");
    jokeParagraph.textContent = data.value;
  } catch {
    const jokeParagraph = jokeSection.querySelector("p");
    jokeParagraph.textContent = "Sorry Try again..";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
  fetchJoke();
});
