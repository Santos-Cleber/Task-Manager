// Elementos do HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Filtro atual
let currentFilter = "all";
// Renderiza as tarefas na tela
function renderTasks() {
  const filteredTasks = getFilteredTasks(currentFilter);

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";

    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "task-item--completed" : ""}`;
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="task-item__checkbox" 
          ${task.completed ? "checked" : ""}
          data-id="${task.id}"
        />
        <span class="task-item__text">${task.text}</span>
        <button class="task-item__delete" data-id="${task.id}">🗑️</button>
      `;
      taskList.appendChild(li);
    });
  }

  // Atualiza o contador
  const activeTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = activeTasks;
}
// Adiciona uma tarefa
function handleAddTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  createTask(text);
  taskInput.value = "";
  renderTasks();
}

// Eventos do botão adicionar e tecla Enter
addTaskBtn.addEventListener("click", handleAddTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") handleAddTask();
});

// Eventos da lista (deletar e concluir)
taskList.addEventListener("click", function (event) {
  const id = Number(event.target.dataset.id);

  if (event.target.classList.contains("task-item__delete")) {
    deleteTask(id);
    renderTasks();
  }

  if (event.target.classList.contains("task-item__checkbox")) {
    toggleTask(id);
    renderTasks();
  }
});

// Eventos dos filtros
document.querySelectorAll(".task-filters__btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelector(".task-filters__btn--active")
      .classList.remove("task-filters__btn--active");
    this.classList.add("task-filters__btn--active");
    currentFilter = this.dataset.filter;
    renderTasks();
  });
});

// Evento de limpar concluídas
clearCompletedBtn.addEventListener("click", function () {
  clearCompleted();
  renderTasks();
});

// Inicia o app
renderTasks();
