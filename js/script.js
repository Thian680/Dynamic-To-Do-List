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