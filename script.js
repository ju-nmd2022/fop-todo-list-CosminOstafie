//Variables to access the HTML Elements
const listElement = document.getElementById("list-element");
const listName = document.getElementById("list-name");
const saveNameBtn = document.getElementById("saveNameBtn");
const inputBox = document.getElementById("input-box");
const addItemBtn = document.getElementById("addItemBtn");

let ItemsArray = [];

//Adding event listener to the add task button + function

addItemBtn.addEventListener("click", addTask);

function addTask() {
  const textInput = inputBox.value;
  if (textInput === "") {
    return;
  }

  //Create a new item and append it to the list
  let newListItem = document.createElement("li");
  newListItem.innerText = textInput;
  let objectItem = {
    text: textInput,
    completed: false,
  };
  listElement.appendChild(newListItem);
  ItemsArray.push(objectItem);

  //Add the button to remove the item
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");
  newListItem.appendChild(deleteBtn);

  inputBox.value = "";
}
