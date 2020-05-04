const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = []
let id = 0;

updateTodos(); 

function newTodo() {
  const todoName = prompt('Enter Todo Here')
  if(todoName !== '') {
    const todo = {
      id: id++,
      todo: todoName,
      checked: false,
      isDone: false
    }
    todos.push(todo)
  } else {
    alert('Todo Name cannot be blank')
  }

  updateTodos()
}

function updateTodos() {

  list.textContent = ''
  if(todos.length > 0) {
    todos.map(todo => {
      const listItem = document.createElement('li')
      listItem.setAttribute('class', 'todo-list')
  
      listItem.innerHTML = `
        <input type="checkbox" class='todo-checkbox' onchange=toggle(${todo.id}) ${todo.isDone ? 'checked' : '' } />
        <span>${todo.todo}</span>
        <button onclick=removeTodo(${todo.id}) class='todo-delete'>Delete Todo</button>
      `  
      
      const mainNode = list.appendChild(listItem)
      list.appendChild(mainNode)
    })
  } else {
    list.textContent = 'There are no todos to show'
  }
  

  itemCountSpan.textContent = countTodos();
  uncheckedCountSpan.textContent = uncheckedTodos()

}

function countTodos() {
  const count = todos.length
  return count
}

function uncheckedTodos() {
  let count = 0;
  todos.map(todo => {
    if(todo.isDone === false) {
      count += 1;
    }
  });
  return count;
}

function toggle(id) {
  todos.map(todo => {
    if(todo.id === id) {
      todo.isDone = !todo.isDone;
    }
  })
  updateTodos()
}

function removeTodo(id) {
  todos = todos.filter(
    todo => todo.id !== id
  )
  updateTodos();
}
