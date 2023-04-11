//Selecting the HTML elements

const listElement = document.querySelector("#listElement");
const textInput = document.querySelector("#inputText");
const addItemBtn = document.querySelector("#addItem");
const saveBtn = document.querySelector("#saveList");
const removeItemBtn = document.querySelector("#removeItem");

//Event Listener for the Add item button
addItemBtn.addEventListener("click", addItem);

//Function to add items to the list
function addItem() {
  //Get the input value
  const itemText = textInput.value;
  console.log(textInput.value);

  if (textInput.value === "") {
    return;
  }

  //Create new list item and add it to the list
  const newItem = document.createElement("li");
  newItem.innerText = textInput.innerHTML;
  listElement.appendChild(newItem);

  //Add the button to remove the item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("delete");
  listElement.appendChild(deleteButton);

  // Event listener for the delete button
  deleteButton.addEventListener("click", () => {
    listElement.remove();
  });
}
