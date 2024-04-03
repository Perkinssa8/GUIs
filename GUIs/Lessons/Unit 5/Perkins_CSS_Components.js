let NavOpen = false;
const drawer2 = document.querySelector("#mainDrawer");

document.getElementById("hamburger").addEventListener("click", () => {
    window.scrollTo(0, 0);
    NavOpen = !NavOpen;
    drawer2.dataset.open = `${NavOpen}`;
});

//fabButton
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
const carouselHTML = document.querySelectorAll('.carousel-item');

class ImageCarousel {
    constructor(carousel) {
        this.carousel = carousel;
        this.parent = document.querySelector('#carousel');
        this.carouselArray = Array.from(this.carousel);
    }

    next() {
        this.carouselArray[2].dataset.on = 'false';
        const firstImage = this.carouselArray.shift();
        this.carouselArray.push(firstImage);
        this.carouselArray[2].dataset.on = 'true';
    }

    getImages() {
        return this.carousel;
    }

    render() {
        this.parent.innerHTML = '';
        this.carouselArray.forEach((image) => {
            this.parent.appendChild(image);
        });
    }
}


const carousel = document.querySelector('#carousel');

let play = new ImageCarousel(carouselHTML);

carousel.addEventListener('animationiteration', () => {
    play.next();
    play.render();
});

const clickLoader = document.querySelector('.loader');

clickLoader.addEventListener('click', () => {
    clickLoader.dataset.pressed = 'true';
    clickLoader.dataset.open = 'true';
});

clickLoader.addEventListener('animationiteration', () => {
    clickLoader.dataset.pressed = 'false';
});

