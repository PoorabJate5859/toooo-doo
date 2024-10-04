const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn" onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                <button class="delete-btn" onclick="deleteTask(${index}, this)">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
};

addBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim(); 
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        saveTasks(); 
        renderTasks(); 
        todoInput.value = ""; 
        addBtn.classList.add("flipped"); 
        setTimeout(() => {
            addBtn.classList.remove("flipped");
        }, 600); 
    }
});

const toggleTask = (index) => {
    const task = tasks[index];
    task.completed = !task.completed; 
    saveTasks(); 
    renderTasks(); 
};

const deleteTask = (index, btn) => {
    const listItem = btn.closest("li"); 
    listItem.classList.add("delete-animate"); 
    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks(); 
        renderTasks(); 
    }, 600); 
};

renderTasks();
