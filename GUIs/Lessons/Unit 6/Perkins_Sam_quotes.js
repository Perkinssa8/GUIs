// Mobile Friendly Famous Quotes App -- Sam Perkins A02254025

// Function to inquire the API for a random quote
async function getQuote () {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const body = await result.json();
    return body;
};

//Event listener to change the quote when the page is clicked
document.getElementById('changeQuote').addEventListener("click", async () => {
    const quote = await getQuote();
    document.getElementById("quote-content").innerText = quote.content;
    document.getElementById("quote-author").innerText = `- ${quote.author}`;
    console.log(quote);

})

// Some constants
const searchBar = document.getElementById("searchBar");
const navBarTitle = document.getElementById("navBarTitle");
const searchResults = document.getElementById("searchResults");
const searchEngine = document.querySelector(".searchEngine");
const navBarTwo = document.querySelector("#navBarTwo");
const quoteBox = document.querySelector(".quotebox");
const pinned = document.querySelector("#pinned");

// Typical event listener to select input
const inputEvent = (openBar) => {
    if (openBar) {
        searchBar.dataset.open = "true";
        searchEngine.dataset.open = "true";
        navBarTwo.dataset.open = "true";
        console.log("open");
    } else {
        searchBar.dataset.open = "false";
        searchEngine.dataset.open = "false";
        navBarTwo.dataset.open = "false";
        console.log("closed");
    }
};

// Event listener to toggle the attributes for styling of the search bar    
let openBar = false;
searchBar.addEventListener("click", () => {
    inputEvent(true);
});

searchBar.addEventListener("blur", () => {
    inputEvent(false);
});



// Function to search for a quote
let emptySearch = false;
async function searchQuote() {
    // try and catch to handle if the search is not found or empty
    const search = await document.getElementById("searchBar").value;
    if (search === "") {
        throw new Error("No search query entered");
        emptySearch = true;
    }else {
        emptySearch = false;
        const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${search}`);
        console.log(result)
        const find = await result.json();
        return find;
    }
}

// Event listener to search for a quote with the enter key or the button
let openResults = false;
document.getElementById("searchBar").addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
        try {
            let resultObj = await searchQuote();
            console.log(resultObj);
            const result = resultObj.results;
            console.log(result);
            getSearchResults(result);
            if(!openResults) {
                toggleResults();
            }
        }catch (error) {
            console.log(error);
            if (emptySearch === true) {
                alert("Please enter a search query");
            }	
        }
    }
});

// Event listener to search for a quote with the button
document.getElementById("searchButton").addEventListener("click", async (event) => {

    await searchQuote();

});

// function to create a search result box for each item
function getSearchResults(result) {
    document.querySelector(".resultsbox").innerHTML = "";
    for (quote in result) {
        const box = document.createElement("div")
        box.classList.add("results");
        const div = document.createElement("div");
        div.classList.add("material-symbols-outlined");
        div.classList.add("keep");
        div.textContent = "keep";
        div.dataset.open = "false";
        div.addEventListener("click", () => keepQuote(box));
        box.appendChild(div);
        const text = document.createTextNode(`${result[quote].author} ~\n\n ${result[quote].content}`);
        box.appendChild(text);
        document.getElementById("searchBox").appendChild(box);
        inputEvent(false);
    }
}

// function to toggle the search results and random quote
function toggleResults() {
    openResults = !openResults;
    if (openResults) {
        console.log("results open");
        searchResults.dataset.open = "true";
        quoteBox.dataset.open = "false";
    } else {
        console.log("results closed");
        searchResults.dataset.open = "false";
        quoteBox.dataset.open = "true";
    }
}

//Event listener to toggle the search results
document.getElementById("navBarButton").addEventListener("click", () => {
    toggleResults();
    searchBar.value = "";
});

// Event listener for the keep button - written as a function to be called in the
const keepQuote = (box) => {
    
    console.log("keep/removed");
    box.dataset.open = !box.dataset.open;
    if (box.dataset.open === "true") {
        //move the element to the pinned dive
        pinned.appendChild(box);
    } else {
        //push the element back to the search results
        searchResults.appendChild(box);
    }   
}
