const fabButton = document.querySelector('.button');

fabButton.addEventListener('mousedown', (e) => {
    e.target.dataset.pressed = 'true';
})

fabButton.addEventListener('mouseup', (e) => {
    e.target.dataset.pressed = 'false';

})

fabButton.addEventListener('mouseleave', (e) => {
    e.target.dataset.pressed = 'false';
})


// drawer 
let isNavOpen = false;
const drawer = document.querySelector("#drawerOptions");

document.getElementById("drawerMenu").addEventListener("click", () => {
    isNavOpen = !isNavOpen;
    drawer.dataset.open = `${isNavOpen}`;
});
