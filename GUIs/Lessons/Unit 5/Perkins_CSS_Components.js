//canvas practice
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

ctx.fillStyle = "#FF0000";
ctx.fillRect(50,50, 100, 100);

ctx.fillStyle = "#00FF00";
ctx.fillRect(200, 50, 100, 100);



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

const container = document.querySelector('.container');
const loader = document.querySelector('.loader');

container.addEventListener('mousedown', (e) => {
    const animation = loader.animate(
        [{
            transform: `translate(${e.clientX - 64}px, ${e.clientY - 64}px)`
        }],
        {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-in-out'
        })
        animation.addEventLister('finish', () => {
            // loader.style.display = 'block';
            console.log('animation finished');
        });
})


// drawer 
let isNavOpen = false;
const drawer = document.getElementById("drawer");

document.getElementById("menu").addEventListener("click", () => {
    console.log("menu clicked");
});



