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


// Image Carousel
const carousel = document.querySelectorAll('.carousel-item');
console.log(carousel);
let carouselCopy = [...carousel];


[...carousel].forEach((image) => {
    //1. nothing here
    setTimeout(() => {
        // 1. for each image, create an element of type img
        document.querySelector('#carousel').remove();
        // 1.b for each replace the src of the image with the next image in the array
        document.querySelector('#carousel').appendChild(image);
        // 2. add a class to the image focused in the carousel
        // 3. remove the class from the image that is no longer in focus
        // 4. change the order of the original array: move the first image to the end of the array
        }, index * 1000); // Change the delay time (in milliseconds) as per your requirement
})