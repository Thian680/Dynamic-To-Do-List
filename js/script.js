const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList")

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => addTaskToDOM(taskText));
}

function addTaskToDOM(taskText){
    const listItem = document.createElement("li");
    listItem.textContent = taskText;


    const deleteButton = document.createElement("Button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(listItem);
        removeTaskFromStorage(taskText);
    });


    listItem.appendChild(deleteButton)
    taskList.appendChild(listItem);
}

function removeTaskFromStorage(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", () =>{
    const task = taskInput.value.trim();
    if (task !== ""){
        addTaskToDOM(task);

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
    }
});

loadTasks();

// Volume Control
const bgMusic = document.getElementById('bgMusic');
const volumeBtn = document.getElementById('volumeBtn');
const speakerIcon = volumeBtn.querySelector('.speaker-icon');

let isMuted = true; // Start muted (browsers require user interaction to autoplay)
bgMusic.volume = 0.4; // Set default volume to 40%

// Try to autoplay (most browsers block this, so we start muted)
bgMusic.play().catch(() => {
    console.log('Autoplay blocked - waiting for user interaction');
});

// Set initial icon (muted state)
speakerIcon.textContent = '🔇'; // Speaker with X

// Volume button click handler
volumeBtn.addEventListener('click', () => {
    if (isMuted) {
        // Unmute
        bgMusic.play().then(() => {
            bgMusic.muted = false;
            speakerIcon.textContent = '🔊'; // Speaker with sound waves
            volumeBtn.classList.add('playing');
            isMuted = false;
            
            // Optional: Show toast notification
            showVolumeNotification('Music On 🎵');
        }).catch(err => {
            console.log('Playback failed:', err);
            // Manual unmute if play fails
            bgMusic.muted = false;
            speakerIcon.textContent = '🔊';
            volumeBtn.classList.add('playing');
            isMuted = false;
        });
    } else {
        // Mute
        bgMusic.muted = true;
        speakerIcon.textContent = '🔇'; // Speaker with X
        volumeBtn.classList.remove('playing');
        isMuted = true;
        showVolumeNotification('Music Off 🔇');
    }
});

// Optional: Show temporary notification
function showVolumeNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 30px;
        background: rgba(123, 57, 230, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 30px;
        font-family: 'Pixelfy_Sans', Arial, sans-serif;
        border: 2px solid white;
        box-shadow: 0 5px 0px 1px rgb(67, 14, 136);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 1500);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(-100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

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