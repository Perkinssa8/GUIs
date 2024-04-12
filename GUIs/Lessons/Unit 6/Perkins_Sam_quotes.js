async function getQuote () {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const body = await result.json();
    return body;
};

document.getElementById('changeQuote').addEventListener("click", async () => {
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
    const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${search}`);
    console.log(await result.json())
}

document.getElementById("searchButton").addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
        await searchQuote();
    }
});

document.getElementById("searchButton").addEventListener("click", async (event) => {
    await searchQuote();
});