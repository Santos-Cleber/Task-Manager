// Chave usada para identificar os dados no localStorage
const STORAGE_KEY = "tasks";

// Salva as tarefas no localStorage
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Carrega as tarefas do localStorage
function loadTasks() {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
}
