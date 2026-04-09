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

const bgMusic = document.getElementById("bgMusic");
const volumeBtn = document.getElementById("volumeBtn");
const speakerIcon = volumeBtn.querySelector(".speaker-icon");

let isMuted = true;
bgMusic.volume = 0.4;
bgMusic.muted = true;

// Set initial icon
speakerIcon.textContent = "🔇";

// Volume button click handler
volumeBtn.addEventListener("click", () => {
  if (isMuted) {
    // Unmute
    bgMusic.muted = false;
    bgMusic.play().then(() => {
      speakerIcon.textContent = "🔊";
      volumeBtn.classList.add("playing");
      isMuted = false;
      showMusicNotification("🎵 Now Playing: Dark Beach - Pastel Ghost 🎵");
    }).catch(err => {
      console.log("Playback failed:", err);
      speakerIcon.textContent = "🔊";
      volumeBtn.classList.add("playing");
      isMuted = false;
    });
  } else {
    // Mute
    bgMusic.muted = true;
    bgMusic.pause();
    speakerIcon.textContent = "🔇";
    volumeBtn.classList.remove("playing");
    isMuted = true;
    showMusicNotification("🔇 Music Paused");
  }
});

// Enhanced notification function
function showMusicNotification(message) {
  // Remove any existing notification
  const existingNotification = document.querySelector('.music-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement("div");
  notification.className = "music-notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 90px;
    left: 30px;
    background: rgba(123, 57, 230, 0.95);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-family: 'Pixelfy_Sans', Arial, sans-serif;
    font-size: 14px;
    border: 2px solid white;
    box-shadow: 0 5px 0px 1px rgb(67, 14, 136);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    white-space: nowrap;
    pointer-events: none;
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Mobile-specific adjustment for notification
function showMusicNotification(message) {
  const existingNotification = document.querySelector('.music-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement("div");
  notification.className = "music-notification";
  notification.textContent = message;
  
  // Check if mobile for responsive positioning
  const isMobile = window.innerWidth <= 920;
  
  notification.style.cssText = `
    position: fixed;
    bottom: ${isMobile ? '80px' : '90px'};
    left: ${isMobile ? '15px' : '30px'};
    background: rgba(123, 57, 230, 0.95);
    color: white;
    padding: ${isMobile ? '8px 16px' : '12px 24px'};
    border-radius: 30px;
    font-family: 'Pixelfy_Sans', Arial, sans-serif;
    font-size: ${isMobile ? '12px' : '14px'};
    border: 2px solid white;
    box-shadow: 0 5px 0px 1px rgb(67, 14, 136);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    white-space: nowrap;
    pointer-events: none;
    max-width: ${isMobile ? '200px' : 'none'};
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Preload audio
bgMusic.load();
