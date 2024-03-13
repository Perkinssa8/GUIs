const darkMode = document.querySelector('#darkMode');
const recipe = document.querySelector('#recipeForm');
const recipeName = document.getElementById('recipeName');
const submit = document.getElementById('submit');
let bulk = document.querySelector('#bulk');
let form = document.getElementById('recipeForm');
let information = document.querySelector('#information');
let author = document.querySelector('#recipeAuthor');
let description = document.querySelector('#recipeDescription');
let category = document.querySelector('#recipeCategory');
let inputs = form.querySelectorAll('input, textarea, select');
let parentDiv = document.querySelector('#ingredients');
let obj= {};
let tableRow = [];


darkMode.addEventListener('change', (e) => {
    // if dark mode is enabled, add the class to the body
    if (e.target.checked) {
        document.body.classList.add('dark');
        document.querySelectorAll('header').forEach(el => el.classList.add('darkMode'))
    } else {
        document.body.classList.remove('dark');
    }
});

[... document.getElementsByClassName("text-size")].forEach((el) => {
    el.addEventListener('change', (e) => {
        console.log(e.target.value);
        document.body.dataset.theme = e.target.value;
    });
});

[...inputs].forEach((el) => {
    el.addEventListener('blur', (e) => {
        obj[e.target.id] = e.target.value;
        console.log('saved:', e.target.value);
    });
});


submit.addEventListener('click', () => {
    console.log('inputs are', inputs)
    inputs.forEach(input => {
        append(input.id);
    });
});

function createDivWithTextarea(divClass, textareaId, textareaName) {
    let div = document.createElement('div');
    div.classList.add(divClass);
    let textarea = document.createElement('textarea');
    textarea.id = textareaId;
    textarea.name = textareaName;
    div.appendChild(textarea);
    return div;
}

function createTable(tableId, tableClass, rowSize, obj) { //'recipeTable', 'recipeTable', rowSize, obj
    let table = document.createElement('table');
    table.id = tableId;
    table.classList.add(tableClass);
    let header = table.createTHead();
    let knot = header.insertRow(0);
    let plus = createButton('add', 'Add Ingredient +');
    parentDiv.appendChild(plus);
    knot.innerHTML = "<th>Ingredient</th><th>Amount</th><th>Unit</th>";
    for (let i = 0; i < rowSize; i++) {
        let row= table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let directory = Object.values(obj);
        let amount = Object.values(obj);
        let unit = Object.values(obj);  
        cell1.innerHTML = `<input id="ingredient${i}" value="${directory[i]}"></input>`
        cell2.innerHTML = `<input id="amount${i}" value="${amount[i]}"></input>`
        cell3.innerHTML = `<input id="unit${i}" value = "${unit[i]}"></input>`
    }
    return table;
}

function createButton(buttonClass, buttonText) {
    let button = document.createElement('button');
    button.classList.add(buttonClass);
    button.innerHTML = buttonText;
    return button;
}

let ingredientHTML;
let cardData
bulk.addEventListener('change', (e) => {
    if (e.target.checked) {
        console.log('checked');
        let ingredient = document.querySelector('.ingredient');
        ingredientHTML = ingredient;
        let tableDiv = createDivWithTextarea('recipeTable', 'recipeArea', 'ingredientArea');
        parentDiv.replaceChild(tableDiv, ingredient);
        // generate a table based on the amount of ingredients
        let table = document.getElementById('recipeArea');
        table.addEventListener('blur', (e) => {
            console.log('blur event', e.target);
            let lines = e.target.value.split('\n');
            console.log(lines);
            for (let i = 0; i < lines.length; i++) {
                obj['Ingredient'+ (i+1)] = lines[i];
            };
            console.log(obj);
            let rowSize = Object.keys(obj).length;
            console.log('rowSize', rowSize)
            let newTable = createTable('recipeTable', 'recipeTable', rowSize, obj);
            parentDiv.replaceChild(newTable, tableDiv);
            let add = document.querySelector('.add');
            add.addEventListener('click', () => {
                let table = document.getElementById('recipeTable');
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let rowSize = table.rows.length;
                cell1.innerHTML = `<input id="ingredient${rowSize}" value=""></input>`;
                cell2.innerHTML = `<input id="amount${rowSize}" value=""></input>`;
                cell3.innerHTML = `<input id="unit${rowSize}" value=""></input>`;
            });
            let oldButton = document.querySelector('#submit');
            oldButton.remove();
        });
    } else {
        console.log('unchecked')
        let tableDiv = document.querySelector('.recipeTable');
        parentDiv.replaceChild(ingredientHTML, tableDiv);
        // let oldButton = document.querySelector('.add');
        // oldButton.remove();
    }
});

//submit.addEventListener('click', () => {//when the 'Add ingredient' button is clicked

    

class writeRecipeToFile {
    constructor (table) {
        this.input = document.getElementsByTagName("input")
        this.table = table
    }
};

