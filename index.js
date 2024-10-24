const addBtn = document.getElementById("add-Btn");
const todoInput = document.getElementById("input");
const todoDate = document.getElementById("dueDate");
const todoList = document.getElementById("todo-list");

const currentDate = new Date().toISOString().split("T")[0];
todoDate.setAttribute("min", currentDate);

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskInput = todoInput.value.trim();
  const taskDate = todoDate.value;

  if (!taskInput) {
    alert("Please enter a task.");
    return;
  }

  // Create a new task
  const newTask = document.createElement("li");
  newTask.classList.add("list-items");

  // Complete Task button
  //   const completeBtn = document.createElement("input");
  //   completeBtn.type = "checkbox";
  //   completeBtn.classList.add("complete-task");
  //   completeBtn.addEventListener("change", () => {
  //     newTask.classList.toggle("completed");
  //     const editBtn = newTask.querySelector(".editBtn");
  //     if (editBtn) {
  //       newTask.removeChild(editBtn);
  //     }
  //   });
  //   newTask.appendChild(completeBtn);

  // Complete Task button
  const completeBtn = document.createElement("input");
  completeBtn.type = "checkbox";
  completeBtn.classList.add("complete-task");
  completeBtn.addEventListener("change", () => {
    // Mark as completed
    newTask.classList.add("completed");

    const editBtn = newTask.querySelector(".editBtn");
    if (editBtn) {
      newTask.appendChild(editBtn);
    }

    setTimeout(() => {
      if (confirm("This task is marked as completed, and will be deleted.")) {
        todoList.removeChild(newTask);
        alert("Task Deleted!");
      } else {
        completeBtn.checked = false;
        newTask.classList.remove("completed");
      }
    }, 2000);
  });

  newTask.appendChild(completeBtn);

  // Add task text
  const taskText = taskDate ? `${taskInput} (Due on: ${taskDate})` : taskInput;
  newTask.appendChild(document.createTextNode(taskText));

  // Delete Task feature
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Delete Task";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      todoList.removeChild(newTask);
      alert("Task Deleted!");
    }
  });
  newTask.appendChild(removeBtn);

  // Edit task items
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Task";
  editBtn.classList.add("editBtn");
  newTask.appendChild(editBtn);
  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.value = taskInput;
    const editDateInput = document.createElement("input");
    editDateInput.classList.add("editDateInput");
    editDateInput.type = "date";
    editDateInput.value = taskDate;
    newTask.innerHTML = "";
    editDateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
    newTask.appendChild(editInput);
    newTask.appendChild(editDateInput);

    // Save edited task
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Task";
    saveBtn.classList.add("saveBtn");
    newTask.appendChild(saveBtn);
    saveBtn.addEventListener("click", () => {
      const editedTask = editInput.value.trim();
      const editedDate = editDateInput.value.trim();
      if (editedTask) {
        const updatedText = editedDate
          ? `${editedTask} (Due on: ${editedDate})`
          : editedTask;
        newTask.innerHTML = "";
        newTask.appendChild(completeBtn);
        newTask.appendChild(document.createTextNode(updatedText));
        newTask.appendChild(removeBtn);
        newTask.appendChild(editBtn);
      }
    });
  });

  // Add the new task to the list
  todoList.appendChild(newTask);
  todoInput.value = "";
  todoDate.value = "";
});

// Dark Mode
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
  }
});
