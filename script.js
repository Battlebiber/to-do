const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Speichert alle Aufgaben in den Local Storage
function saveTodos() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Lädt die Aufgaben aus dem Local Storage
function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (!saved) return;

  const todos = JSON.parse(saved);
  todos.forEach(todo => {
    addTodo(todo.text, todo.done);
  });
}

// Erstellt eine neue To-Do-Aufgabe und fügt sie zur Liste hinzu
function addTodo(text, done = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (done) {
    li.classList.add('done');
  }

  // Klick auf Aufgabe: Status wechseln (erledigt / nicht erledigt)
  li.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTodos();
  });

  // Löschen-Button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // verhindert das Abhaken beim Löschen
    list.removeChild(li);
    saveTodos();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Neues To-Do hinzufügen, wenn Formular abgesendet wird
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === '') return;

  addTodo(text);
  saveTodos();
  input.value = '';
});

// Lade vorhandene To-Dos beim Start
loadTodos();
