// 1. Select all the elements that are going to control the whole scenario
// 2. Initialize a variable here
// 3. Define a function that changes the display
// 4. Add an event listener

// Step: 1
const countDisplay = document.getElementById("countDisplay");
const incrementButton = document.getElementById("incrementBut")
const decrementButton = document.getElementById("decrementBut")
const errorMsg = document.getElementById("errorMsg")

// Step: 2
let count = 0;

// Step: 3
// This is controlling what number will appear on the screen upon button clicks
function updateDisplay() {
    countDisplay.textContent = count;
    if (count > 0) {
        errorMsg.setAttribute("hidden", false)
    }
}

// Step: 4
// Increment Functionality
incrementButton.addEventListener("click", function() {
    count++;
    updateDisplay();
})

// Decrement Functionality
decrementButton.addEventListener("click", function() {
    if (count > 0) {
        count--;
    }
    errorMsg.removeAttribute("hidden");
    updateDisplay();
})

// Calling the update display function, just to make sure that the final value is correctly displayed on the screen
updateDisplay();
