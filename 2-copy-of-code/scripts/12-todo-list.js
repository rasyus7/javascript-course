const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22' // we added a new attribute due date
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  /* todoobject is dynamaically declared. so basically we hover over
  to do list and use todobject as the index */
  /* we recommemnd using arrow function on foreach */
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button') // declared in line 22
  // all elements with class js-delete-todo-button
    .forEach((deleteButton, index) => {
      // for each delete button, we check if we clicked it
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList(); /* we also call render so that we can see updatedd version  */
        /* The code above removes the value! We splice the value(remove it) */
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}