// Select elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const filterDate = document.getElementById("filterDate");
const filterText = document.getElementById("filterText");
const applyFilterBtn = document.getElementById("applyFilterBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filteredTasks = null) {
  taskList.innerHTML = "";
  let displayTasks = filteredTasks || tasks;

  displayTasks.forEach(task => {
    let index = tasks.indexOf(task); 
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.date}
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task
addTaskBtn.addEventListener("click", () => {
  if (taskTitle.value === "" || taskDate.value === "") {
    alert("Please fill all fields!");
    return;
  }

  let newTask = {
    title: taskTitle.value,
    date: taskDate.value
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  taskTitle.value = "";
  taskDate.value = "";
});

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Reminders
setInterval(() => {
  let today = new Date().toISOString().split("T")[0];
  tasks.forEach(task => {
    if (task.date === today) {
      alert(`Reminder: You have to complete "${task.title}" today!`);
    }
  });
}, 60000);

// Apply filter
applyFilterBtn.addEventListener("click", () => {
  let dateFilter = filterDate.value;
  let textFilter = filterText.value.toLowerCase();

  let filtered = tasks.filter(task => {
    let matchesDate = dateFilter ? task.date === dateFilter : true;
    let matchesText = textFilter ? task.title.toLowerCase().includes(textFilter) : true;
    return matchesDate && matchesText;
  });

  renderTasks(filtered);
});

// Clear filter
clearFilterBtn.addEventListener("click", () => {
  filterDate.value = "";
  filterText.value = "";
  renderTasks();
});

// Initial render
renderTasks();
