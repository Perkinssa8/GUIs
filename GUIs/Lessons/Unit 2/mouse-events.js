// 5 mouse events, enter, leave, down, up, move
// mouse down event: different than click, click is when you press and release the mouse button, mouse down is when you press the mouse button
const output = document.getElementById("output");


document.body.addEventListener("mousedown", (e) => {
    output.innerHTML = `x: ${e.clientX}, y: ${e.clientY}`; //attributes to retrieve the x and y coordinates of the mouse
});

// replace with mouseup, or mousemove to see the coordinates when you release the mouse or move the mouse
