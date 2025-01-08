const input = document.querySelector("[data-input]");
const form = document.querySelector("[data-to-do-form]");
const clearList = document.querySelector("[data-clear-list]");
const ol = document.querySelector("[data-list]");
const listTemplate = document.querySelector("[data-list-template]");
const errMsg = document.querySelector("[data-err-msg]");



form.addEventListener("submit", e => {
  e.preventDefault();
  const value = input.value.replace(/[ \t]{2,}/g, ' ').trim();
  if(!value) {
    errMsg.classList.toggle("none");
    return;
  }
  if(!errMsg.classList.contains("none")) {
    errMsg.classList.toggle("none");
  }
  addListItem(value);
  input.value = "";
});

ol.addEventListener("click", e => {
  const target = e.target;
  if(target.matches("#doneCheckBox:checked")){
    target.previousElementSibling.classList.add("completed");
  }

  if(target.matches("#doneCheckBox:not(:checked)")){
    target.previousElementSibling.classList.remove("completed");
    saveToDos();
  }

  if(target.matches("[data-remove-btn]")){
    target.closest("li").remove();
    saveToDos();
  }
})

clearList.addEventListener("click", () => {
  ol.replaceChildren();
  localStorage.removeItem("toDos");
})


const addListItem = (value) => {
  /* const listItem = document.createElement("li");
  listItem.innerHTML = `
  <span data-list-text>${value}</span>
  <input type="checkbox" id="doneCheckBox" class="listBtn margin-left">
  <button data-remove-btn class="listBtn margin-left-sm">X</button>
  ` */
  const template = listTemplate.content.cloneNode(true);
  template.querySelector("span").textContent = value;
  ol.append(template);
  saveToDos();
}

const saveToDos = () => {
  const toDoList = Array.from(ol.children).map((list) => {
    const textContent = list.querySelector('[data-list-text]').textContent;
    return {text: textContent}
  })
  localStorage.setItem("toDos", JSON.stringify(toDoList));
}

const loadToDos = () => {
  const retrievedList = JSON.parse(localStorage.getItem("toDos")) || [];
  retrievedList.forEach((todo) => {
    addListItem(todo.text);
  })
}

loadToDos();















