

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
        if (e.target.id.includes('edit')) { // makes the recipe.ingredients into a an editable div
          let index = e.target.dataset.index;
          let title = this.recipes[index].title;
          let ingredients = this.recipes[index].ingredients;
          let instructions = this.recipes[index].instructions;
          document.getElementById('recipeTitle').value = title;
          document.getElementById('recipeBin').innerHTML = '';
          document.getElementById('instructionBin').innerHTML = '';
          ingredients.forEach((ingredient) => {
            createIngredient(ingredient);
          });
          instructions.forEach((instruction) => {
            createInstruction(instruction);
          });
          this.removeRecipe(index);
          whichPage.checked = false;
          document.getElementById('whichPage').dispatchEvent(new Event('change'));
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
// putting the togglePage function here so maybe I can use it for more than one event listener
function togglePage() {
  const mainpage = document.getElementById('main');
  const subpage = document.getElementById('subPage');
  if (whichPage.checked) {
    console.log('going to subpage');
    mainpage.style.display = 'flex';
    subpage.style.display = 'none';
  } else {
    console.log('going to main page');
    mainpage.style.display = 'none';
    subpage.style.display = 'block';
  }
}

// Add the event listener to the checkbox
whichPage.addEventListener('change', togglePage);

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


// Eventlistener for Add ingredient button
document.querySelector('#addIngredient').addEventListener('click', () => {
  let ingredient = document.querySelector('#ingredients').value
  createIngredient(ingredient);
  document.getElementById('ingredients').value = '';
});

//function for creating an ingredient
function createIngredient(ingredient) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('ingredient');
  newDiv.innerHTML = ingredient;
  document.querySelector('#recipeBin').appendChild(newDiv);

  newDiv.addEventListener('click', () => {
    newDiv.remove();
  });
}

// Eventlistener for Add instruction button
document.querySelector('#addInstruction').addEventListener('click', () => {
  let instruction = document.querySelector('#instructions').value
  createInstruction(instruction);
  document.getElementById('instructions').value = '';

});

//function for creating an instruction
function createInstruction(instruction) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('instruction');
  newDiv.innerHTML = instruction;
  document.querySelector('#instructionBin').appendChild(newDiv);

  newDiv.addEventListener('click', () => {
    newDiv.remove();
  });
}

//using the enter key to add ingredients
document.getElementById('ingredients').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let ingredient = document.querySelector('#ingredients').value;
    createIngredient(ingredient);
    document.getElementById('ingredients').value = '';
  }
});

//using the enter key to add instructions
document.getElementById('instructions').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let instruction = document.querySelector('#instructions').value;
    createInstruction(instruction);
    document.getElementById('instructions').value = '';
  }
});

// Making a more readable recipe if needed (for display without creating a card)
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


// Eventlistener for Save button
const save = document.getElementById('save');
save.addEventListener('click', () => {
  let title = document.getElementById('recipeTitle').value;
  let ingredients = document.querySelectorAll('.ingredient');
  ingredients = [...ingredients].map((el) => el.innerHTML);
  console.log('ingredients', ingredients);
  let instructions = document.querySelectorAll('.instruction');
  instructions = [...instructions].map((el) => el.innerHTML);
  console.log('instructions', instructions);
  let recipe = {"title":title,"ingredients": ingredients, "instructions": instructions};
  console.log('recipe', recipe);
  myRecipes.addRecipe(recipe);
  myRecipes.addToLibrary();
  resetRecipe();
});

// Eventlistener for Reset button
const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
  resetRecipe();
});

function resetRecipe() {
  document.getElementById('recipeTitle').value = '';
  document.getElementById('recipeBin').innerHTML = '';
  document.getElementById('instructionBin').innerHTML = '';
};


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