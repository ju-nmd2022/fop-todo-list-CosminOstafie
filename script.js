//Selecting the HTML elements

const listElement = document.querySelector("#listElement");
const textInput = document.querySelector("#inputText");
const addItemBtn = document.querySelector("#addItem");
const saveBtn = document.querySelector("#saveList");
const removeItemBtn = document.querySelector("#removeItem");
const listName = document.querySelector("#list-name");
const clearBtn = document.querySelector("#clearList");

//Event Listener for the Add item button
addItemBtn.addEventListener("click", addItem);

//Function to add items to the list
function addItem() {
  //Get the input value
  const itemText = textInput.value;
  console.log(textInput.value);

  if (itemText === "") {
    return;
  }

  //Create new list item and add it to the list
  const newItem = document.createElement("li");
  newItem.innerText = itemText;
  listElement.appendChild(newItem);

  //Add event listener to mark completed items

  newItem.addEventListener("click", () => {
    newItem.classList.toggle("completed-item");
  });

  //Add the button to remove the item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  // deleteButton.classList.add("delete");
  newItem.appendChild(deleteButton);

  // Event listener for the delete button
  deleteButton.addEventListener("click", () => {
    newItem.remove();
  });

  //Clear the input field after adding item
  textInput.value = "";
}

//Add event listener to clear all the completed items from the list
clearBtn.addEventListener("click", () => {
  const completedItems = document.querySelectorAll(".completed-item");
  completedItems.forEach((item) => item.remove());
});

//Function to save the list to local storage
function saveList() {
  const listItems = listElement.querySelectorAll("li");

  //Convert the items of the list to array of objects
  const ObjectArray = Array.from(listItems).map((item) => {
    return {
      text: item.innerText,
      completedItem: item.classList.contains("completed-item"),
    };
  });

  //Save the name of the list and the list to the local storage as an object

  const listName = listName.value;
  const listObject = {
    listName: listName,
    listItems: ObjectArray,
  };

  localStorage.setItem("toDoList", JSON.stringify(listObject));
}

//Loading the list from local storage

function loadList() {
  const listString = localStorage.getItem("todoList");
  if (listString) {
    //Convert the list string to object
    const listObject = JSON.parse(listString);

    //Set the name of the list in the object
    listName.value = listObject.listName;

    //Add the to-do items to the list object
    listObject.items.forEach((item) => {});
  }
}
