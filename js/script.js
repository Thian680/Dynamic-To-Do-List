const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => addTaskToDOM(taskText));
}

function addTaskToDOM(taskText) {
  const listItem = document.createElement("li");
  listItem.textContent = taskText;

  const deleteButton = document.createElement("Button");
  deleteButton.textContent = "✖";
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(listItem);
    removeTaskFromStorage(taskText);
  });

  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
}

function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    addTaskToDOM(task);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
  }
});

loadTasks();

// Volume Control

// // Make volume button draggable

// let isDragging = false;
// let offsetX, offsetY;

// volumeBtn.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     const rect = volumeBtn.getBoundingClientRect();
//     offsetX = e.clientX - rect.left;
//     offsetY = e.clientY - rect.top;
//     volumeBtn.style.cursor = 'grabbing';
// });

// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//         const x = e.clientX - offsetX;
//         const y = e.clientY - offsetY;

//         // Keep button within window bounds
//         const maxX = window.innerWidth - volumeBtn.offsetWidth;
//         const maxY = window.innerHeight - volumeBtn.offsetHeight;

//         volumeBtn.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
//         volumeBtn.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
//         volumeBtn.style.bottom = 'auto';
//         volumeBtn.style.right = 'auto';
//     }
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
//     volumeBtn.style.cursor = 'pointer';
// });

// // Prevent click from firing during drag
// volumeBtn.addEventListener('click', (e) => {
//     if (isDragging) {
//         e.stopPropagation();
//     }
// });
