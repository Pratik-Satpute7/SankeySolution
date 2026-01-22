const jokeSection = document.getElementById("joke");
const tInput = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const tList = document.getElementById("tList");
const trackingbar = document.getElementById("trackingbar");
const totalTasks = document.getElementById("total");
const completedTasks = document.getElementById("tTomplete");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  tList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "taskElement";

    li.innerHTML = `
      <span class="task-text ${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <div class="task-buttons">
        <button class="completebtn" data-id="${task.id}">✔</button>
        <button class="editbtn" data-id="${task.id}">Edit</button>
        <button class="deletebtn" data-id="${task.id}">Delete </button>
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

  trackingbar.style.width = percent + "%";
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

tList.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return;

  if (e.target.classList.contains("completebtn")) {
    task.completed = !task.completed;
  }

  if (e.target.classList.contains("editbtn")) {
    const newText = prompt("Edit task:", task.text);
    if (newText) task.text = newText.trim();
  }

  if (e.target.classList.contains("deletebtn")) {
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
