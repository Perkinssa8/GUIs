const darkMode = document.querySelector('#darkMode');
const whichPage = document.getElementById('whichPage');
const hamburgerButton = document.querySelector('#hamburgerButton');
const hamOptions = document.querySelector('#hamOptions');
const recipe = document.querySelector('#recipeForm');
const recipeName = document.getElementById('recipeName');
const submit = document.getElementById('submit');
let subpage = document.querySelector('#subpage');
let mainpage = document.querySelector('#main');
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
let saveToLibrary = document.getElementById('saveToLibrary')


class Recipe {
  constructor(){
    this.recipes = [];
  }

  addRecipe(recipe){
    this.recipes.push(recipe);
  }

  removeRecipe(index){
    this.recipes.splice(index, 1);
  }

  getRecipe(index){
    return this.recipes[index];
  }

  addToLibrary() {// has no parameter, because each time it is called, it reloads the whole library
    let library = document.getElementById('recipeLibrary');
    library.innerHTML = '';
    this.recipes.forEach((recipe, index) => {
      let card = document.createElement('button');
      card.classList.add('recipeCard');
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <button class="recipeFiles" id="recipe${index}" data-index="${index}">View</button>
        <button class="recipeFiles" id="edit${index}" data-index="${index}">Edit</button>
        <button class="recipeFiles" id="delete${index}" data-index="${index}">Delete</button>
      `;
      library.appendChild(card);
    });
    let recipeFiles = document.querySelectorAll('.recipeFiles');
    console.log('these are recipeFiles:', recipeFiles);
    [...recipeFiles].forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.id.includes('recipe')) {
          console.log('viewing');	
          let index = e.target.dataset.index;
          let recipe = this.recipes[index];
          writeRecipeToFile(recipe);
        }
        if (e.target.id.includes('edit')) { // makes the recipe.ingredients into a table of inputs that can be edited
          let index = e.target.dataset.index;
          let recipe = this.recipes[index];
          console.log('editing', recipe);
          recipeName.value = recipe.title;
          description.value = recipe.description;
          author.value = recipe.author;
          category.value = recipe.category;
          let table = document.getElementById('recipeTable');
          let rowSize = recipe.ingredients.length;
          let newTable = createTable('recipeTable', 'recipeTable', rowSize, recipe.ingredients);
          parentDiv.replaceChild(newTable, table);
          let oldButton = document.querySelector('#submit');
          oldButton.remove();
          let newButton = createButton('submit', 'Update Recipe');
          form.appendChild(newButton);
          newButton.addEventListener('click', () => {
            recipe.title = recipeName.value;
            recipe.description = description.value;
            recipe.author = author.value;
            recipe.category = category.value;
            recipe.ingredients = [];
            recipe.instructions = [];
            for (let i = 0; i < rowSize; i++) {
              recipe.ingredients.push(document.getElementById(`ingredient${i}`).value);
              recipe.instructions.push(document.getElementById(`instruction${i}`).value);
            }
            this.addToLibrary();
          });
        }
        if (e.target.id.includes('delete')) {
          let index = e.target.dataset.index;
          this.removeRecipe(index);
        }
      });
    });
  };
};
let myRecipes = new Recipe();


function checkButton(buttonID, checkboxID) {
  document.getElementById(`${buttonID}`).addEventListener('click', function(e) {
    e.preventDefault(); // prevent the default action
    let checkbox = document.getElementById(`${checkboxID}`);
    checkbox.checked = !checkbox.checked; // toggle the checkbox
    let event = new Event('change'); // create a change event
    checkbox.dispatchEvent(event); // dispatch the change event
});
}

checkButton('navigation', 'whichPage'	)
whichPage.addEventListener('change', (e) => {
    if (e.target.checked) {
        console.log('going to subpage');
        mainpage.style.display = 'none';
        subpage.style.display = 'block';
    }
    else{
        console.log('going to main page');
        mainpage.style.display = 'block';
        subpage.style.display = 'none';        
    }
});

checkButton('hamburgerButton', 'hamburger')
hamburger.addEventListener('change', (e) => {
  if (e.target.checked) {
      hamOptions.classList.add('show');
      console.log('checked', e.target);
  }
  else {
      hamOptions.classList.remove('show');
      console.log('unchecked', e.target);
  };
});
darkMode.addEventListener('change', (e) => {
    // if dark mode is enabled, add the class to the body
    if (e.target.checked) {
        document.body.classList.add('dark');
        document.querySelectorAll('header').forEach(el => el.classList.add('darkMode'))
    } else {
        document.body.classList.remove('dark');
    }
});


[...document.getElementsByClassName("text-size")].forEach((el) => {
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


saveToLibrary.addEventListener('click', () => {
  myRecipes.addRecipe(obj);
});

  

function writeRecipeToFile(recipe) {
    // taking from
    function download(text, filename){
      var blob = new Blob([text], {type: "text/html"});
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
    const output = `
      <html>
        <head>
          <style>
            :root {
              font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
            }
            h1 {
              background-color: rgb(15,35,57);
              color: white;
              padding: 16px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .b-main {
              width: 600px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
            }
            .b-content {
              padding: 16px;
              display: flex;
              gap: 16px;
            }
            .b-ingredients {
              flex: 1
            }
            .b-instructions {
              flex: 1'
            }
          </style>
        </head>
        <body>
          <main class="b-main">
            <h1>${recipe.title}</h1>
            <div class="b-content">
              <div class="b-ingredients">
                <strong>Ingredients</strong>
                <hr>
                ${
                  recipe.ingredients.map(i => (
                    `
                      <div>${i}</div>
                    `
                  )).join('')
                }
              </div>
              <div class="instructions">
                <strong>Instructions</strong>
                <hr>
                ${
                  recipe.instructions.map((i, index) => (
                    `
                      <div>${index+1}: ${i}</div>
                    `
                  )).join('')
                }
              </div>
            </div>
          </main>
        </body>
      </html>
    `;
    download(output, `recipe-card.html`);
}

let defaultRecipe ={
    title: "Grandma's Broccoli Cheese Soup", // the name of the recipe
    ingredients: [
      "2 cups of shredded cheddar cheese",
      "1 block of velveeta",
      "3 cups of chopped broccoli",
      "1/2 cup of butter",
      "1 can of cream of chicken soup"
    ],
    instructions: [
      "turn on crockpot to high",
      "mix in the ingredients except the brocolli",
      "cook for 60 minutes",
      "add the broccoli in and stir thoroughly",
      "cook for the remaining 40 minutes",
      "turn crockpot to low heat until served"
    ]
};

myRecipes.addRecipe(defaultRecipe);
console.log(myRecipes.getRecipe(0));
myRecipes.addToLibrary();