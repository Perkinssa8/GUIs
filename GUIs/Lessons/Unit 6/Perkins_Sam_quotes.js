async function getQuote () {
    const result = await fetch("https://api.quotable.io/random")
    const body = await result.json();
    return body;
};

document.body.addEventListener("click", async () => {
    const quote = await getQuote();
    document.getElementById("quote-content").innerText = quote.content;
    document.getElementById("quote-author").innerText = `- ${quote.author}`;
    console.log(quote);

})

let openBar = false;
document.getElementById("search").addEventListener("click", () => {

    openBar = !openBar;
    if (openBar) {
        document.getElementById("search-input").style.display = "block";
        document.getElementById("navBarTitle").style.display = "none";
    } else {
        document.getElementById("search-input").style.display = "none";
        document.getElementById("navBarTitle").style.display = "block"
    }
});
async function searchQuote() {
    const search = await document.getElementById("search-input").value;
}


const wrap = (arg1)=> (arg2) => (arg3) => `${arg1} - ${arg2} - ${arg3}`;
console.log(wrap("Hello, world"));