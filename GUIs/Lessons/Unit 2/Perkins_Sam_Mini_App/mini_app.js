// Sam Perkins   |   Mini-App   |  2024-02-11   |    GUIs
// Mad Lib Generator


//Global Variables I'll call throughout the program
const storyButton = document.getElementById('generate story');
const story = document.getElementById('story');
const submitButton = document.getElementById('submit');


// Mad Lib Generator (The main class that calls another class from another document where the Mad Lib stories are stored and sorted)
class PartsOfSpeech {
    constructor() { // will create a new instance of GenerateMadLib (find a story) and get the parts of speech
        this.madLib = new GenerateMadLib();
        this.partsOfSpeech = this.madLib.getPartOfSpeech();
        this.container = document.getElementById('inputContainer');
        this.outPut = outPut[this.madLib.rando];
    }

    generate() { // will generate the input fields for the user to fill in based off selected story
        for (let number in this.partsOfSpeech) {
            const createInput = document.createElement('input');
            createInput.type = 'text';
            createInput.id = 'partOfSpeech' + number;
            //createInput.name = 'partOfSpeech' + number;
            createInput.name = 'inputChildren';
            createInput.placeholder = this.partsOfSpeech[number];  // calling the object's key
            this.container.appendChild(createInput);
        }
    }

    generateStory() { // will generate the story based off the user's input
        let genStory = this.outPut;
        for (let num in this.partsOfSpeech) {
            let input = document.getElementById('partOfSpeech' + num);
            const regex = new RegExp('\\[' + num + '\\]', 'g');
            genStory = genStory.replace(regex, input.value);
        } 
        document.getElementById('result').innerHTML = genStory;
    }
}

let begin = new PartsOfSpeech(); // initializes the program with no input from user
begin.generate();

storyButton.addEventListener("click", () => { // this will clear the current input fields and generate new ones from a new story
    let container = document.getElementById('inputContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let begin = new PartsOfSpeech();
    document.getElementById('result').innerHTML = '';
    document.getElementById('story-error').innerHTML = '';
    begin.generate()
});

submitButton.addEventListener("click", () => { // this will generate the story based off the user's input, but also check for empty fields
    let container = document.getElementById('inputContainer');
    let containerChildren = container.getElementsByTagName('input');
    console.log(containerChildren[1].value);
    for (let i = 0; i <containerChildren.length; i++) {
        if (containerChildren[i].value=== '') {
            document.getElementById('story-error').innerHTML = 'Please fill in all fields';
            return;
        } else {document.getElementById('story-error').innerHTML = '';}
    }
    
    begin.generateStory();
});


// Mortgage Calculator
// Global variables I use throughout the program
const divMC = document.getElementById('MC') // access the div tag from html
const input = divMC.getElementsByTagName('input'); // access the input tags from the div tag
const principalField = document.getElementById('principal');
const downPayment = document.getElementById('downpmt');
const interest = document.getElementById('rate');
const termTime = document.getElementById('term');
const compound = document.getElementById('compound');

// main function that is called to calculate the loan by importing user input from the input fields
function calculateLoan() { // will be called anytime a blur event from any input field is triggered
    const principal = parseFloat(principalField.value.replace(/,/g, ''));
    const down = parseFloat(downPayment.value.replace(/,/g, ''));
    let rate = parseFloat(interest.value)/100;
    let term = parseFloat(termTime.value);
    if (document.getElementById('year-or-month').value === 'Years') {
        term = term * 12;
    }
    if (compound.value === 'Monthly') {
        rate = rate/12;
    } else if (compound.value === 'Quarterly') {
        rate = rate/4;
    } 
    
    // Calculate the monthly payment
    const pmt =(principal-down) * ((rate * (1 + rate)**term) / ((1 + rate)**term - 1))
    const result = document.getElementById('loan result');
    result.innerHTML = `Your monthly loan payment will be $${pmt.toFixed(2)}`; 
    return pmt.toFixed(2);
};


// Event listener for the input fields in the mortgage calculator
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("blur", () => { // when the input field loses focus, the function will be called
        if (calculateLoan() === 'NaN') { // if the result of the function is NaN, then the input is invalid and fields reset
            const errorDiv = document.getElementById('error');
            errorDiv.innerHTML = "Invalid input \n You might have entered a non-numeric value or left a field blank. Please try again.";
            principalField.value = '425,000';
            downPayment.value = '85,000';
            interest.value = '7.2'
            termTime.value = '360';
        }
        calculateLoan();
        
    });
}

