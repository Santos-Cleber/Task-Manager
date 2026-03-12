let tasks = loadTasks();

function createTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  saveTasks(tasks);
}

function getFilteredTasks(filter) {
  if (filter === "active") return tasks.filter((task) => !task.completed);
  if (filter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks(tasks);
}
