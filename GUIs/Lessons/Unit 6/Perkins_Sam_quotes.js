async function getQuote () {
    const res = await fetch("https://api.quotable.io/random")
    const body = await result.json();
    return body;
};

document.body.addEventListener("click", async () => {
    const quote = await getQuote();
    document.getElementById("quote-content").innerText = quote.content;
    document.getElementById("quote-author").innerText = `- ${quote.author}`;
    console.log(quote);

})