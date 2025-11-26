// DOM API
const title = document.getElementById("myTitle");

// let username = "Mike";
// console.log(`Welcome ${username}`);
// title.textContent = `Welcome ${username}`;

title.textContent = "This title was <em>changed<em> by JS"
// title.innerHTML = "This title was <em>changed<em> by JS"

// Changing the Styles of elements in JS
title.style.color = "blue";
title.style.backgroundColor = "green";

// We can get an element via different means
// By Class Name
const para = document.getElementsByClassName("myPara");

// By Id
const title_1 = document.querySelector("#myTitle")

// By Either Element name (like p, h1, button) Class Name or Id using Query Selector
const button_tag = document.querySelector("button")

// By Query Selector All we can get access to all the occurances of that element in the HTML
const para_1 = document.querySelectorAll(".myPara")

// Adding a simple event listener to the button
button_tag.addEventListener("click", function() {
    console.log("Button was clicked");
})
