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

//Add event listener to save the list name to local storage
saveNameBtn.addEventListener("click", () => {
  listNameValue = listName.value;
  localStorage.setItem("listName", listNameValue);
});

//Adapted from Chat Gpt lines 73->88
//Load list name and items from local storage when the page is loaded and display them
window.addEventListener("load", () => {
  listNameValue = localStorage.getItem("listName");
  if (listNameValue) {
    listName.value = listNameValue;
  }
  let storedItems = localStorage.getItem("ItemsArray");
  if (storedItems) {
    ItemsArray = JSON.parse(storedItems);
    for (let i = 0; i < ItemsArray.length; i++) {
      let newListItem = document.createElement("li");
      newListItem.innerText = ItemsArray[i].text;
      listElement.appendChild(newListItem);
      // Add the completed class to the list item if the item is completed
      if (ItemsArray[i].completed) {
        newListItem.classList.add("completed");
      }

      //Toggle completed state when an item is clicked
      newListItem.addEventListener("click", function () {
        if (ItemsArray[i].completed) {
          ItemsArray[i].completed = false;
          newListItem.classList.remove("completed");
          updateLocalStorage();
        } else {
          ItemsArray[i].completed = true;
          newListItem.classList.add("completed");
          updateLocalStorage();
        }
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.classList.add("deleteBtn");
      newListItem.appendChild(deleteBtn);

      //Remove item from local storage when the delete button is clicked
      //Same method as before but for the items loaded from localStorage
      deleteBtn.addEventListener("click", () => {
        ItemsArray.splice(i, 1);
        localStorage.setItem("ItemsArray", JSON.stringify(ItemsArray));
        newListItem.remove();
      });
    }
  }
});

function updateLocalStorage() {
  localStorage.setItem("ItemsArray", JSON.stringify(ItemsArray));
}
