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

  // Store the updated ItemsArray in local storage
  updateLocalStorage();

  //Add the button to remove the item
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");
  newListItem.appendChild(deleteBtn);

  //Adapted from chatgpt lines 42->43
  //Remove item from the screen and local storage when the delete button is clicked
  deleteBtn.addEventListener("click", () => {
    let itemIndex = ItemsArray.findIndex((item) => item.text === textInput);
    ItemsArray.splice(itemIndex, 1);
    localStorage.setItem("ItemsArray", JSON.stringify(ItemsArray));
    newListItem.remove();
  });

  //Toggle completed state when an item is clicked
  newListItem.addEventListener("click", function () {
    if (objectItem.completed) {
      objectItem.completed = false;
      newListItem.classList.remove("completed");
      updateLocalStorage();
    } else {
      objectItem.completed = true;
      newListItem.classList.add("completed");
      updateLocalStorage();
    }
  });

  //Reset the input after adding a new item to the list
  inputBox.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("ItemsArray", JSON.stringify(ItemsArray));
}
