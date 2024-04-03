function newDiv(newSection, src) {
    let lowerSrc = src.toLowerCase();
    let title;
    if (src === "HTML") {
        title = "HTML Script";
    } else if (src === "CSS") {
        title = "CSS Stylesheet";
    } else {
        title = "JavaScript";
    }
    let newDiv = document.createElement("div");
    newDiv.className = "newDiv";
    let divWrapper = `
        <div class="newDiv">
            <h3> ${title}</h3>
            <div class="example">
                <article class="page-content">
                    <pre class="${lowerSrc}" id="${newSection}-${src}"></pre>
                </article>
            </div>
        </div>
        `;
    newDiv.innerHTML = divWrapper;
    let parentSection = document.getElementById(newSection);

    if (parentSection === null) {
        console.log("Parent section not found.");
        return newDiv;
    }else {
        parentSection.appendChild(newDiv);
    }
};

newDiv("canvasBoard", "HTML");
document.getElementById("canvasBoard-HTML").innerText = `
<canvas class="canvas" width="500" height="500" id="canvas"></canvas>
`;

newDiv("canvasBoard", "JavaScript");
document.getElementById("canvasBoard-JavaScript").innerHTML = `

class Animatable {
    update(deltaT){}

    render(ctx){}

    setAnimation(animation){
        this.animation = animation;
    }
}

class Ball extends Animatable {
    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.totalTime = 0;
    }

    update(deltaT){
        this.totalTime += deltaT;
        this.velocity += (deltaT * 9.8 * 5)
        this.y += this.velocity;
        if (this.y + 25>= this.animation. height){
            this.y = this.animation.height - 25;
            this.velocity = -this.velocity + 5;
        }
        if (this.totalTime >5) {
            this.animation.removeAnimatable(this);
        }
    }

    render(ctx) {
        ctx.beginPath()
        ctx.fillSTyle = "#FF1010";
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Animation {
    constructor (ctx, width, height){
        this.animatables = [];
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.lastUpdate = null;
    }

    addAnimatable(animatable){
        this.animatables.push(animatable);
        animatable.setAnimation(this);
    }

    removeAnimatable(animatable){
        this.animatables.splice(this.animatables.indexOf(animatable), 1);
    }

    start(){
        requestAnimationFrame((timestamp) => this.update(timestamp));
    }

    update(timestamp){
        // this only happens on the first frame
        if (this.lastUpdate === null){
            this.lastUpdate = timestamp;
        }
        // compute the amount of time since last update
        const deltaT = (timestamp - this.lastUpdate)/1000; //converts it to seconds
        
        // update the last update time
        this.lastUpdate = timestamp;

        //update each objecs attributes over time
        this.animatables.forEach((animatable) => {
            animatable.update(deltaT);
        });

        // clear the canvas
        this.ctx.clearRect(0,0,canvas.width, canvas.height);

        // render each object
        this.animatables.forEach((animatable) => {
            this.ctx.save();
            animatable.render(this.ctx);
            this.ctx.restore(); 
        });

        // recursive function that updates the animation
        requestAnimationFrame((ts) => this.update(ts));
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const animation = new Animation(ctx, canvas.clientWidth, canvas.clientHeight);
animation.start();

canvas.addEventListener("mousedown", (e) => {
    const ball = new Ball(e.offsetX, e.offsetY);
    animation.addAnimatable(ball);

    // Add event listeners for mousemove and mouseup events
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
    // Create a new ball at the current mouse position
    const ball = new Ball(e.offsetX, e.offsetY);
    animation.addAnimatable(ball);
}

function onMouseUp(e) {
    // Remove the event listeners for mousemove and mouseup events
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
}
`;

newDiv("canvasBoard", "CSS");
document.getElementById("canvasBoard-CSS").innerHTML = `
#canvasBoard{
    display: grid;
    justify-items: center;
    align-items: center;
}

.canvas{
    background-color: var(--primary-color);
    border-radius: 10px;
}
`;


document.getElementById("navBar-HTML").innerText = `
<nav class="navBar" id="navBarTwo">
    <button type="button" id="navBarButton" class="menu">
        <span class="material-symbols-outlined">menu</span>
    </button>
    <span id="navBarTitle">Your title</span>
    <div class="navLinks">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
    </div>
</nav>
`;

document.getElementById("navBar-CSS").innerHTML = `
<code>
.menu {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:transparent;
    color:white;
    box-shadow: none;
    border: none;
}

#navBarTitle {
    white-space: nowrap;
    margin-right: 16px;
}

.navLinks{
    display:flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    gap: 1rem;
    font-size: small;
}

.navBar {
    position: sticky;
    top: -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 16px 32px;
    margin: auto;
    width: 100%;
    background: var(--linear-background-gradient);
    font-size: 24px; /* Adjust the font size */
    font-weight: bold; /* Make the font bold */
    font-stretch: expanded; /* Stretch the font horizontally */
}
</code>
`;

newDiv("navDrawer", "HTML");
document.getElementById("navDrawer-HTML").innerText = `
    <nav class="navBar" id="navBarThree">
    <button type="button" id="drawerMenu" class="menu">
        <span class="material-symbols-outlined">menu</span>
    </button>
    </nav>
    <nav id="drawerOptions" class = "drawer">
    <a href="#"><span class="material-symbols-outlined">Home</span>Home</a>
    <a href="#"><span class="material-symbols-outlined">analytics</span> Info</a>
    <a href="#"><span class="material-symbols-outlined">person</span> Profile</a>
    <a href="#"><span class="material-symbols-outlined">settings</span>Settings</a>
    </nav>
`;


newDiv("navDrawer", "JavaScript");
document.getElementById("navDrawer-JavaScript").innerHTML = `
// drawer 
let isNavOpen = false;
const drawer = document.querySelector("#drawerOptions");

document.getElementById("drawerMenu").addEventListener("click", () => {
    isNavOpen = !isNavOpen;
    drawer.dataset.open = \`\${isNavOpen}\`;
});
`;


newDiv("navDrawer", "CSS");
document.getElementById("navDrawer-CSS").innerHTML = `
.menu {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:transparent;
    color:white;
    box-shadow: none;
    border: none;
}

#navBarTitle {
    white-space: nowrap;
    margin-right: 16px;
}

/* Navigation Drawer Styling */
#navDrawer {
    background-color: #333;
    overflow: visible;
}

#navDrawerButton {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:var(--background-color);
    color:white;
    border-radius: 100%;
    box-shadow: none;
}

#navBarThree{
    background: transparent;
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    height: 64px;
    z-index: 500;
}

.drawer{
    position: absolute;
    display: flex;
    top: 64px;
    left: -210px;
    height: 360px;
    flex-direction: column;
    background-color: var(--accent-color);
    width: 200px; 
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: 0 19px 38px rgba(0,0,0,.30), 0 15px 12px rgba(0,0,0,.22);
}

.drawer[data-open="true"]{
    transition: left 0.5s ease-in-out;
    left: 0;
}

.drawer[data-open="false"]{
    transition: left 0.5s ease-in-out;
    left: -210px;
}

.drawer > a{
    display: flex;
    padding: 8px 16px;

}
`;


newDiv("button", "HTML");
document.getElementById("button-HTML").innerText = `
<button id="buttonButton" class="button">
    <span class="material-symbols-outlined">Add</span>
</button>
`;


newDiv("button", "JavaScript");
document.getElementById("button-JavaScript").innerHTML = `
No JavaScript needed for this component.
`;


newDiv("button", "CSS");
document.getElementById("button-CSS").innerHTML = `
#buttonButton{
    margin: 12px;
    border-radius: 35%;
    padding: 16px;
}

.button{
    color: white;
    background-color: var(--primary-color);
    cursor: finger;
    transition: background-color .4s ease-in-out, box-shadow .3s ease, color;
}

.button:hover{
    background-color: #333;
    color: blueviolet;
}

.button[data-pressed="true"]{
    box-shadow: none;
}	
`;


newDiv("action", "HTML");
document.getElementById("action-HTML").innerText = `
<button id="fabButton" class="button">
    <span class="material-symbols-outlined">language</span>
</button>
`;

newDiv("action", "JavaScript");
document.getElementById("action-JavaScript").innerHTML = `
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
    drawer.dataset.open = \`\${isNavOpen}\`;
});
`;

newDiv("action", "CSS");
document.getElementById("action-CSS").innerHTML = `
/* Floating Action Button */
#fabComponent{
    background-color: var(--accent-color);
}

#fabButton{
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 19px 38px rgba(0,0,0,.30), 0 15px 12px rgba(0,0,0,.22);
    margin: 16px;

}
`;

newDiv("carouselImg", "HTML");
document.getElementById("carouselImg-HTML").innerText = `
<div id="carousel"  class="activate">
    <div class="carousel-item">
        <img src="20231026.jpg" alt="placeholder" />
    </div>
    <div class="carousel-item">
        <img src="20231101.jpg" alt="placeholder" />
    </div>
    <div class="carousel-item">
        <img src="20231108.jpg" alt="placeholder" />
    </div>
    <div class="carousel-item">
        <img src="20231201.jpg" alt="placeholder" />
    </div>
    <div class="carousel-item">
        <img src="20231004.jpg" alt="placeholder" />
    </div>
</div>
`;

newDiv("carouselImg", "JavaScript");
document.getElementById("carouselImg-JavaScript").innerHTML = `
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
`;

newDiv("carouselImg", "CSS");
document.getElementById("carouselImg-CSS").innerHTML = `
/* Image Carousel Styling */
#carouselComponent{
    overflow:hidden;    
}

#carousel{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:  row;
    overflow:hidden; 
    transition: transform 0.5s;
}

.carousel-item{
    height: 250px;
    width: 300px; 

    
}

#carousel:nth-child(3){
    transform: scale(1.5);
}

.carousel-item img {
    object-fit: contain;
    height: 100%;
    width: 100%;
}

@keyframes grow {
    0% {
        transform: scale(1);
    }
    50%{
        transform: scale(1.5);
    }
    100%{
        transform: scale(1);
    }
}

@keyframes slide {
    0% {
        transform: translateX(0);
    }
    50%{
        transform: translateX(-302px);
    }
    100%{
        transform: translateX(-302px);
    }
}

#carousel.activate{
    animation: slide 4s infinite;
}
`;

newDiv("spinLoaders", "HTML");
document.getElementById("spinLoaders-HTML").innerText = `
<div id="loaderSpinner" class="loader"></div>
`;

newDiv("spinLoaders", "JavaScript");
document.getElementById("spinLoaders-JavaScript").innerHTML = `
JavaScript not needed for this component.
`;

newDiv("spinLoaders", "CSS");
document.getElementById("spinLoaders-CSS").innerHTML = `
/* Loading Component Styling */

#loaderComponent{
    height: 40vh;
    flex-direction: row;
    overflow:visible;
    gap: 48px;
    padding: 16px;
    
}

/* Loading Animation Styling #1 */
@keyframes loading-animation{
    0% {
    }
    10%{
        border-top-left-radius: 50%;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    20% {
        background-color: var(--primary-color);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    30% {
        border-top-left-radius: 0;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    40% {
        background-color: var(--white-color);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    
    }
    50% {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 50%;
        transform: rotateZ(0deg);
    }
    60%{
        background-color: hsl(33, 90%, 55%);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    70% {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius:0;
        transform: rotateZ(0deg);
    }
    80% {
        background-color: hsl(338, 90%, 60%);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        transform: rotateZ(180deg);
    }
    90% {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        transform: rotateZ(180deg);
    }
    95%{
        transform: rotateZ(90deg)
    }
    100% {
        background-color: var(--accent-color);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        transform: rotateZ(90deg);
    }
}

.loader{
    padding: 64px;
    background-color: var(--accent-color);
    box-shadow: 0 1px 3px rgba(0,0,0,.14), 0 1px 2px rgba(0,0,0,.28), 0 2px 1px -1px rgba(0,0,0,.05);
    animation: loading-animation 5s linear infinite;
}

@keyframes spinTwice {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(720deg);
    }
}
 

.loader[data-pressed="true"]{
    animation: spinTwice 2s ease-in-out infinite;
}
`;

let parentDiv = document.getElementById("spinLoaders");
parentDiv.appendChild(newDiv("spinLoader2", "HTML"));
document.getElementById("spinLoader2-HTML").innerText = `
<svg class="pl" viewBox="0 0 176 160" width="176px" height="160px"> 
    <defs>
        <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="hsl(38,90%,65%)" />
            <stop offset="30%" stop-color="hsl(33,90%,55%)" />
            <stop offset="100%" stop-color="hsl(338,90%,60%)" />
        </linearGradient>
    </defs>
    <g fill="none" stroke-width="16" stroke-linecap="round">
        <circle class="pl__ring" r="56" cx="88" cy="96" stroke="hsla(0,10%,10%,0.1)" />
        <path class="pl__worm1" d="M144,96A56,56,0,0,1,32,96" stroke="url(#pl-grad)" stroke-dasharray="43.98 307.87" />
        <path class="pl__worm2" d="M32,136V96s-.275-25.725,14-40" stroke="hsl(33,90%,55%)" stroke-dasharray="0 40 0 44" stroke-dashoffset="0.001" visibility="hidden" />
        <path class="pl__worm3" d="M144,136V96s.275-25.725-14-40" stroke="hsl(33,90%,55%)" stroke-dasharray="0 40 0 44" stroke-dashoffset="0.001" visibility="hidden" />
    </g>
</svg>
`;

parentDiv.appendChild(newDiv("spinLoader2", "JavaScript"));
document.getElementById("spinLoader2-JavaScript").innerHTML = `
No JavaScript needed for this component.
`;
parentDiv.appendChild(newDiv("spinLoader2", "CSS"));
document.getElementById("spinLoader2-CSS").innerHTML = `
/* Loading Animation Styling #2 */
.pl {
	width: 11em;
	height: 10em;
}
.pl__ring,
.pl__worm1,
.pl__worm2,
.pl__worm3 {
	animation-duration: 4s;
	animation-iteration-count: infinite;
}
.pl__ring {
	stroke: var(--accent-color);

}
.pl__worm1 {
	animation-name: worm1;
}
.pl__worm2 {
	animation-name: worm2;
	transform-origin: 32px 88px;
}
.pl__worm3 {
	animation-name: worm3;
	transform-origin: 144px 88px;
}
/* Animations for the second loader */
@keyframes worm1 {
	from {
		animation-timing-function: ease-out;
		stroke-dashoffset: 43.98;
	}
	12.5% {
		animation-timing-function: ease-in-out;
		stroke-dashoffset: -131.95;
	}
	25% {
		animation-timing-function: ease-in;
		stroke-dashoffset: 0;
	}
	37.5%,
	50% {
		animation-timing-function: ease-out;
		stroke-dashoffset: -175.93;
	}
	62.5% {
		animation-timing-function: ease-in-out;
		stroke-dashoffset: 0;
	}
	75% {
		animation-timing-function: ease-in;
		stroke-dashoffset: -131.95;
	}
	87.5%,
	to {
		stroke-dashoffset: 43.98;
	}
}
@keyframes worm2 {
	from,
	35.5% {
		animation-timing-function: linear;
		stroke-dasharray: 0 40 0 44;
		visibility: hidden;
		transform: translate(0,0) rotate(0);
	}
	37.5% {
		animation-timing-function: ease-out;
		stroke-dasharray: 0 40 44 0;
		visibility: visible;
		transform: translate(0,0) rotate(0);
	}
	47.5% {
		animation-timing-function: ease-in;
		stroke-dasharray: 0 4 40 40;
		visibility: visible;
		transform: translate(0,-80px) rotate(360deg);
	}
	50% {
		animation-timing-function: linear;
		stroke-dasharray: 0 4 40 40;
		visibility: visible;
		transform: translate(0,-36px) rotate(360deg);
	}
	52.5%,
	to {
		stroke-dasharray: 0 42 0 42;
		visibility: hidden;
		transform: translate(0,12px) rotate(360deg);
	}
}
@keyframes worm3 {
	from {
		animation-timing-function: linear;
		stroke-dasharray: 0 4 40 40;
		visibility: visible;
		transform: translate(0,-36px) rotate(0);
	}
	2.5% {
		animation-timing-function: linear;
		stroke-dasharray: 0 42 0 42;
		visibility: hidden;
		transform: translate(0,12px) rotate(0);
	}
	85.5% {
		animation-timing-function: linear;
		stroke-dasharray: 0 40 0 44;
		visibility: hidden;
		transform: translate(0,0) rotate(0);
	}
	87.5% {
		animation-timing-function: ease-out;
		stroke-dasharray: 0 40 44 0;
		visibility: visible;
		transform: translate(0,0) rotate(0);
	}
	97.5% {
		animation-timing-function: ease-in;
		stroke-dasharray: 0 4 40 40;
		visibility: visible;
		transform: translate(0,-80px) rotate(-360deg);
	}
	to {
		stroke-dasharray: 0 4 40 40;
		visibility: visible;
		transform: translate(0,-36px) rotate(-360deg);
	}
}
`;


parentDiv.appendChild(newDiv("spinLoader3", "HTML"));
document.getElementById("spinLoader3-HTML").innerText = `
<div>
    <div id="loaderText" data-text="Loading...">Loading</div>
</div>
`;

parentDiv.appendChild(newDiv("spinLoader3", "JavaScript"));
document.getElementById("spinLoader3-JavaScript").innerHTML = `
JavaScript not needed for this component.
`;

parentDiv.appendChild(newDiv("spinLoader3", "CSS"));
document.getElementById("spinLoader3-CSS").innerHTML = `
/* loader Text Styling */


#loaderText {
    position: relative;
    color:var(--secondary-color);
    font-size: 3rem;
    font-stretch: expanded; 
    letter-spacing: 0.2em;
    text-align: center;
    border-bottom: 16px solid var(--secondary-color);
}

#loaderText::before{
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: var(--primary-color);
    border-bottom: 16px solid var(--primary-color);
    animation: gradientRun 5s ease-in-out infinite;
    overflow: hidden;
}

@keyframes gradientRun {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
`;

document.getElementById("htmlInfo").innerHTML = `
<pre> 
html{
    font-size: 16px;
    font-family: Noto-Sans-JP, Helvetica, serif, sans-serif;
    scroll-behavior: smooth;
}
</pre>
`;

document.getElementById("rootInfo").innerHTML = `
<pre> 
:root{
    --primary-color:#eec98b;
    --secondary-color:#24242b;
    --tertiary-color:#26262e;
    --quaternary-color:#25252d;
    --quinary-color:#2c2b2f;
    --background-color: #2d2c31;
    --linear-background-gradient: linear-gradient(var(--quaternary-color), var(--accent-color));
    --white-color: #fff;
    --accent-color: #6c788d;
    --gradient: linear-gradient(to right, hsl(38, 90%, 65%), hsl(33, 90%, 55%), hsl(338, 90%, 60%));
}
</pre>
`;

document.getElementById("bodyInfo").innerHTML = `
<pre><code>
body{
    display:flex;
    flex-direction:column;
    width: 100%;
    background-color: var(--accent-color);
    color: var(--white-color);
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
}
</code></pre>
`;

document.getElementById("containerInfo").innerHTML = `
<pre> 
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    margin: 16px 0px 72px 0px;
    padding-top: 80px;
    gap: 16px;
}
</pre>
`;


