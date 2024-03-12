const input = document.getElementById("task-input");
const saveButton = document.getElementById("save-button");
const taskList = document.getElementById("tasks");

function elementFromHTML(htmlString) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = htmlString;
  return wrapper.firstElementChild;
}

saveButton.addEventListener("click", () => {
  const task = input.value;
  const newDiv = elementFromHTML(`
      <div>
        <label>
          <input id="item" type="checkbox">${task}
        </label>
      </div>
      <div>Hello, world</div>
  `);

  const checkbox = newDiv.querySelector("#task");
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      console.log(`Task ${task} is complete.`);
    } else {
      console.log(`Task ${task} was marked as incomplete.`);
    }
  });
  taskList.appendChild(newDiv);// adds a new task without overwriting the previous ones, that's why we can't use innerHTML
});
