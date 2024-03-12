const spans = document.body; // access the body tag from html
const spans1 = document.getElementsByTagName('span'); // access the span tag from html

console.log(spans1);

const firstSpan = document.getElementById("kabob-case-span-1"); // access the first span tag from html
console.log(firstSpan); // should output the first span tag 
console.log(firstSpan.textContent); // should output the text content of the first span tag
console.log(firstSpan.innerHTML); // should output the inner html of the first span tag 
const contentElements = document.getElementsByClassName("content"); // access the class content from html
console.log(contentElements); // should output the class content

// Commands 'alert', 'prompt', and 'confirm' are used to interact with the user (don't use)
console.log("the command alert creates a modal dialogue box that displays a message and a button to close the box");
const defaultForprompt = "initial value, but is optional";
let result = prompt(title, defaultForprompt);
const question = "This will return true if user clicks 'ok' and false if user clicks 'cancel'"
let isTrue = confirm(question);

const button1 = document.getElementById('button-1');
button1.addEventListener('click', () => {
  console.log('button 1 clicked');
});
// alternative to 'alert' is 'console.log', to 'prompt' is 'input', and to 'confirm' is 'confirm'
// alert, prompt, and confirm are not used in modern web development because they are blocking and can be annoying to the user
// and they block the browser UI until the user responds

//Blur events
