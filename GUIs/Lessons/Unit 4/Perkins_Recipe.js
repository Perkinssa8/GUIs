const darkMode = document.querySelector('#darkMode');
const whichPage = document.getElementById('whichPage');
const hamburgerButton = document.querySelector('#hamburgerButton');
const hamOptions = document.querySelector('#hamOptions');
const recipe = document.querySelector('#recipeForm');
const recipeName = document.getElementById('recipeName');
const submit = document.getElementById('submit');
const newIngredient = document.getElementById('newIngredient');
const newInstruction = document.getElementById('newInstruction');
let subpage = document.querySelector('#subpage');
let mainpage = document.querySelector('#main');
let bulk = document.querySelector('#bulk');
const form = document.getElementById('recipeForm');
let information = document.querySelector('#information');
let author = document.querySelector('#recipeAuthor');
let description = document.querySelector('#recipeDescription');
let category = document.querySelector('#recipeCategory');
let inputs = form.querySelectorAll('input, textarea, select');
let singleInputs = document.getElementById('ingredient').querySelectorAll('input');
let singleInstruct = document.getElementById('instruction').querySelectorAll('input');
let parentDiv = document.querySelector('#ingredients');
let table = document.getElementById('recipeTable');
let obj= {};
let ingredientList = [];
let instructionList = [];
let saveToLibrary = document.getElementById('saveToLibrary');


class Recipe {
  constructor(){
    this.recipes = [];
  }

  addRecipe(recipe){
    this.recipes.push(recipe);
  }

  removeRecipe(index){
    this.recipes.splice(index, 1);
    document.getElementById('recipeLibrary').innerHTML = '';
    this.addToLibrary();
    
  }

  updateRecipe(index, newRecipe){
    this.recipes[index] = newRecipe;
    console.log('new Recipe might be: ', this.getRecipe(index));
    this.addToLibrary();
  }

  getRecipe(index){
    return this.recipes[index];
  }

  addToLibrary() {// has no parameter, because each time it is called, it reloads the whole library
    let library = document.getElementById('recipeLibrary');
    library.innerHTML = '';
    this.recipes.forEach((recipe, index) => {
      console.log('this is index', index);
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
          console.log('editing', this.recipes[index]);
          whichPage.checked = true;
          whichPage.dispatchEvent(new Event('change'));
          console.log(whichPage.checked);
          bulk.checked = true;
          bulk.dispatchEvent(new Event('change'));
          multipleInstructions.checked = true;
          multipleInstructions.dispatchEvent(new Event('change'));
          //corresponds to the recipe object - VARIABLES
          let title = this.recipes[index].title;
          let ingredients = this.recipes[index].ingredients;
          let instructions = this.recipes[index].instructions;
          let author = this.recipes[index].author;
          let category = this.recipes[index].category;
        

          let recipeArea = document.getElementById('recipeArea');
          let instructionArea = document.getElementById('instructionArea');

          // corresponds to the form
          recipeName.value = title;// sets the value of the input to the recipe title  
          recipeAuthor.value = author === undefined ? 'no author given': author; // sets the value of the input to the recipe author
          recipeCategory.value = category === undefined ? "Lunch" : category; // sets the value of the input to the recipe category  
          console.log('category setting', recipeCategory.value);
          recipeArea.value = ingredients.join(',');
          instructionArea.value = instructions.join(',');
          [document.getElementById('instructionArea'), document.getElementById("recipeArea")].forEach((el) => {el.dispatchEvent(new Event('blur'))});
          let newButton = createButton('submit', 'UpdateRecipe', 'Update Recipe');
          form.appendChild(newButton);


          // update transfers forms to the recipe object
          newButton.addEventListener('click', (e) => {
            let newRecipe = {};
            console.log('this might be the index', index);
            console.log('old recipe', myRecipes.getRecipe(index));
            newRecipe = saveObj();
            console.log('new recipe', newRecipe); // correct to here
            myRecipes.updateRecipe(index, newRecipe);
            whichPage.checked = false;
            whichPage.dispatchEvent(new Event('change'));
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
        subpage.style.display = 'flex';
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


// Eventlistener for Add ingredient button
newIngredient.addEventListener('click', () => {
  let parentNode = document.getElementById('ingredient')
  let counter = parentNode.childElementCount
  console.log('counter', counter);
  let newIngredientDiv = createIngredientDiv(counter);
  parentNode.appendChild(newIngredientDiv);
});

function createIngredientDiv(counter) { 
  let htmlWrapper = `
    <div>
      <label for="ingredientName${counter}">Name:</label>
      <input type="text" id="ingredientName${counter}" name="ingredientName${counter}" required />
    </div>
    <div>
      <label for="ingredientAmount${counter}">Amount:</label>
      <input type="text" id="ingredientAmount${counter}" name="ingredientAmount${counter}" required />
    </div>
    <div>
      <label for="ingredientUnit${counter}">Unit:</label>
      <input type="text" id="ingredientUnit${counter}" name="ingredientUnit${counter}" required />
    </div>`
  let div = document.createElement('div');
  div.innerHTML = htmlWrapper;
  div.classList.add('insertable');
  div.id = `insertable${counter}`;
  return div;
}

let parentNode = document.getElementById('ingredient');
parentNode.querySelectorAll("input").forEach((el) => {el.addEventListener('focus', () => {
  ingredientList= [];
  let counter = parentNode.childElementCount;
  console.log('counter', counter);
  for (let i = 0; i < counter; i++) { // Changed counter+1 to counter
    let element = document.querySelector(`#insertable${i}`);
    if (element) {
      let inputRows = element.querySelectorAll("input");
      let group = []; // Create a new array for this group of inputs
      inputRows.forEach((el) => {group.push(el.value)}); // Push the input values into the group array
      ingredientList.push(group.join('')); // Join the group array into a string and push it into the ingredientList array
      console.log(ingredientList);
    } else {
      console.log(`Element with id insertable${i} not found`);
    }
  }
});
});



    


function getTableData(tableId) {
  let table = document.getElementById(tableId);
  let data = [];

  for (let i = 1, row; row = table.rows[i]; i++) {
    let rowData = '';
    for (let j = 0; j < 3; j++) {
      let cell = row.cells[j];
      let inputElement = cell.querySelector('input');
        if (inputElement) {
            let words = inputElement.value;
            rowData += words + ' ';
        }
    }
    data.push(rowData.trim());
  }

  return data;
}

// function getRowData(tableId) {
//   let table = document.getElementById(tableId);
//   let parent = table.parentNode;
//   let data = [];

//   for (let i = 0, row; row = table.rows[i]; i++) {
//     let rowData = '';
//     data.push(rowData.trim());
//   }

//   return data;
// }

function saveObj() { // triggers the blur event listener to save the data to obj
  let information = document.getElementById('information');
  let infoFields = information.querySelectorAll('input, select');
  [...infoFields].forEach((el) => {
    obj[el.id] = el.value;
  });
  
  //if bulk is checked, then get ingredients this way
  if (bulk.checked) {
    obj.ingredients = getTableData('recipeTable');
  }if (multipleInstructions.checked) {
    obj.instructions = getTableData('instructionTable');
  } else {
    document.querySelector('#selectable0').dispatchEvent(new Event('focus'));
    obj.ingredients = ingredientList;
    obj.instructions = instructionList;
  }
  //if single inputs were used, combine them to make obj.ingredients and obj.instructions
  let refinedObj = {title: obj.recipeName, author: obj.recipeAuthor, category: obj.recipeCategory , ingredients: obj.ingredients, instructions: obj.instructions};
  console.log('obj from save function', refinedObj);
  return refinedObj;
}

function createDivWithTextarea(divClass, textareaId, textareaName) {
    let div = document.createElement('div');
    div.classList.add(divClass);
    let format = document.createElement('p');
    format.innerHTML = 'Format: 1 cup of flour     New ingredients go on a new line';
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
    if (tableId === 'recipeTable') {
      // let plus = createButton('finalAdd','add', 'Add Ingredient +');
      // parentDiv.appendChild(plus);
      knot.innerHTML = "<th>Amount</th><th>Unit</th><th>Ingredient</th>";
    } else {
        knot.innerHTML = "<th>Instruction</th>";
    }
    for (let i = 0; i < rowSize; i++) {
        let row= table.insertRow(-1);

        if (tableId === 'recipeTable') {
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          let directory = obj.ingredients[i]
          let ingredient = directory['ingredient' + (i+1)];
          let amount = directory.amount;
          let unit = directory.unit;  
          cell1.innerHTML = `<input class="referenceCell" id="amountT${i}" value="${amount}"></input>`
          cell2.innerHTML = `<input id="unitT${i}" value = "${unit}"></input>`
          cell3.innerHTML = `<input id="ingredientT${i}" value="${ingredient}"></input>`
          cell4.innerHTML = `<button type="button" class="deleteB" id="delete${i}">&#45;</button>`;
          cell5.innerHTML = `<button type="button" class="add" id="add${i}">&#43;</button>`;
        } else {
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let dict = obj[i] ;
          cell1.innerHTML = `<input class="referenceCell" id="instruction${i}" value="${dict}"></input>`           
          cell2.innerHTML = `<button type="button" class="deleteB" id="delete${i}">&#45;</button>`;
          cell3.innerHTML = `<button type="button" class="add" id="add${i}">&#43;</button>`;
          
          
          
          }
        }
    return table;
}

function createButton(buttonID, buttonClass, buttonText) {
    let button = document.createElement('button');
    button.id = buttonID;
    button.type = 'button';
    button.classList.add(buttonClass);
    button.innerHTML = buttonText;
    return button;
}

function parseIngredients(input) {
  let flag = false;
  let ingredients = input.split('\n').map((line, index) => {
    let parts = line.split(' ');
    let amount = parts.shift();
    let unit = parts.shift();
    let ingredient = parts.join(' ');
    
    //if any value is Nan, then the parser will be turned off, and all values will be pushed to ingredient column
    if (ingredient === "" || ingredient ===NaN || amount === NaN || unit === "") {
      flag = true;
    }
    return {['ingredient' + (index + 1)]: ingredient, amount: amount, unit: unit};

  });
  return {ingredients, flag};
}

let ingredientHTML;
let cardData
bulk.addEventListener('change', (e) => {// to add multiple ingredients

  if (e.target.checked) {
      console.log('checked');
      let ingredient = document.querySelector('#ingredient');
      ingredientHTML = ingredient;
      let tableDiv = createDivWithTextarea('recipeTable', 'recipeArea', 'ingredientArea'); //class must remain recipeTable here
      cardData = tableDiv;
      parentDiv.replaceChild(tableDiv, ingredient); //replaces the input with a textarea
      // generate a table based on the amount of ingredients
      let table = document.getElementById('recipeArea');
      
      

      // To convert the input into a table
      table.addEventListener('blur', (e) => {
          console.log('blur event', e.target);
          let lines = parseIngredients(e.target.value);
          console.log(lines);
          let rowSize = Object.keys(lines.ingredients).length;
          console.log('rowSize', rowSize)
          let newTable = createTable('recipeTable', 'recipeTable', rowSize, lines);
          parentDiv.replaceChild(newTable, tableDiv);
          
          // add event listeners to the buttons, including new ones
          let addButtons = document.querySelectorAll('.add');
          let deleteButtons = document.querySelectorAll('.deleteB');

          addButtons.forEach((el) => {
            el.removeEventListener('click', addListener);
            el.addEventListener('click', addListener);
          });
          
          deleteButtons.forEach((el) => {
            el.removeEventListener('click', deleteListener);
            el.addEventListener('click', deleteListener);
          });
          // also save the table data as one {ingredients: [array of ingredients], instructions: [array of instructions]}
          let rawData = getTableData('recipeTable');
          obj.ingredients = rawData;
    
          });            
  
      // Variables declared to remove and add event listeners -  only took me 4 hours to figure out this part alone
      let addListener = (e) => {
        let table = document.getElementById('recipeTable');
        let rowIndex = e.target.parentNode.parentNode.rowIndex;
        console.log('rowIndex', rowIndex);
        let row = table.insertRow(rowIndex + 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let rowSize = rowIndex;
        cell1.innerHTML = `<input id="ingredient${rowSize}" value=""></input>`;
        cell2.innerHTML = `<input id="amount${rowSize}" value=""></input>`;
        cell3.innerHTML = `<input id="unit${rowSize}" value=""></input>`;
        cell4.innerHTML = `<button type="button" class="deleteB" id="delete${rowSize}">&#45;</button>`;
        cell5.innerHTML = `<button type="button" class="add" id="add${rowSize}">&#43;</button>`;
        cell4.addEventListener('click', deleteListener);
        cell5.addEventListener('click', addListener);
      }

      let deleteListener = (e) => {
        let table = document.getElementById('recipeTable');
        let rowIndex = e.target.parentNode.parentNode.rowIndex;
        console.log('rowIndex', rowIndex);
        table.deleteRow(rowIndex);
      }


      // If the user wants to go back to adding ingredients one at a time
  } else {
      console.log('unchecked')
      let tableDiv = document.querySelector('.recipeTable');
      parentDiv.replaceChild(ingredientHTML, tableDiv);
      let oldButton = document.querySelector('.add');
      oldButton.remove();
  }
});

// switch between single and multiple entry
// declare variables to store the original input
let instructionHTML;
let multipleInstructions = document.querySelector('#multipleInstructions');

// when the checkbox is checked for multiple instructions
multipleInstructions.addEventListener('change', (e) => {
  if (e.target.checked) {
    console.log('multiple instructions checked');
    let instruction = document.querySelector('.instruction'); 
    let createTextArea = createDivWithTextarea('instructionTable', 'instructionArea', 'instructionArea');
    instructionHTML = instruction;
    let parentDiv = instruction.parentNode; 
    parentDiv.replaceChild(createTextArea, instruction);
    let table = document.getElementById('instructionArea');

    // convert to a table with buttons
    table.addEventListener('blur', (e) => {
      console.log('converting to editable rows...', e.target);
      let lines = e.target.value.split('\n');
      let rowSize = lines.length;
      let newTable = createTable('instructionTable', 'instructionTable', rowSize, lines);
      parentDiv.replaceChild(newTable, createTextArea);

      let addButtons = document.querySelectorAll('.add');
      let deleteButtons = document.querySelectorAll('.deleteB');

      addButtons.forEach((el) => {
        el.removeEventListener('click', addListener);
        el.addEventListener('click', addListener);
      });

      deleteButtons.forEach((el) => {
        el.removeEventListener('click', deleteListener);
        el.addEventListener('click', deleteListener);
      });

      let rawDatatwo = getTableData('instructionTable');
          obj.instructions = rawDatatwo;
        
    })

    // Variables declared for removal and addition of event listeners
    let addListener = (e) => {
      let table = document.getElementById('instructionTable');
      let rowIndex = e.target.parentNode.parentNode.rowIndex;
      console.log('rowIndex', rowIndex);
      let row = table.insertRow(rowIndex + 1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let rowSize = rowIndex;
      cell1.innerHTML = `<input id="instruction${rowSize}" value=""></input>`;
      cell2.innerHTML = `<button type="button" class="deleteB" id="delete${rowSize}">&#45;</button>`;
      cell3.innerHTML = `<button type="button" class="add" id="add${rowSize}">&#43;</button>`;
      cell2.addEventListener('click', deleteListener);
      cell3.addEventListener('click', addListener);
    }

    let deleteListener = (e) => {
      let table = document.getElementById('instructionTable');
      let rowIndex = e.target.parentNode.parentNode.rowIndex;
      console.log('rowIndex', rowIndex);
      table.deleteRow(rowIndex);
    }


  }else{
    console.log('unchecked')
    let tableDiv = document.querySelector('.instructionTable'); // class specifies the textarea
    let parentDiv = tableDiv.parentNode;
    parentDiv.replaceChild(instructionHTML, tableDiv);
    let oldButton = document.querySelector('.add');
    oldButton.remove();
  }
});

let instruction = document.querySelector('#instruction');
instruction.addEventListener('blur', (e) => {
  let lines = e.target.value.split('\n');
});

saveToLibrary.addEventListener('click', () => {
  let refinedObj = saveObj();
  myRecipes.addRecipe(refinedObj);
  myRecipes.addToLibrary();
  console.log('added to library');
  document.querySelectorAll('input').forEach((el) => {el.value = ''});	
  document.querySelectorAll('textarea').forEach((el) => {el.value = ''});
  bulk.checked = false;
  bulk.dispatchEvent(new Event('change'));
  multipleInstructions.checked = false;
  multipleInstructions.dispatchEvent(new Event('change'));
});

let importRecipe = document.getElementById('import');
importRecipe.addEventListener('click', () => {
  let box = document.createElement('input');
  box.type = 'text';
  box.id = 'importBox';
  let button = createButton('importButton', 'importButton', 'Import');
  let parent = document.getElementById('import').parentElement;
  parent.appendChild(box);
  parent.appendChild(button);
  button.addEventListener('click', () => {
    let input = document.getElementById('importBox').value;
    console.log('input', input);
    myRecipes.addRecipe(input);
    myRecipes.addToLibrary();
  });
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