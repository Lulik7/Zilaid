// To do List

// 1. Collect the elements involved
const todoInput = document.getElementById("todoList")
const todoBtn = document.getElementById("addBtn")
const todoItems = document.getElementById("todoItems")

// 2. Add the event action to the button
todoBtn.addEventListener("click", function() {

    // Steps performed by the user
    // 1. Enter the task
    // 2. Hit the button
    // 3. Task is added to the list

    // 3. Pick the data from input field
    const taskText = todoInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const newTodoItem = document.createElement("li");
    newTodoItem.innerHTML = `
        <span> ${taskText} </span>
        <button class="deleteBtn" > Delete Task </button>
    `;

    todoItems.appendChild(newTodoItem);

    // 4. Clear the input field
    todoInput.value = "";
})

// This is the delete button functionality, which we added with the task to the list
todoItems.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteBtn")) {
        const removeListItem = event.target.closest("li");
        removeListItem.remove();
    }
})
