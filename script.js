const tasks = [
  "Drink a full glass of water",
  "Do 10 pushups",
  "Do 20 squats",
  "Stand up and stretch for 30 seconds",
  "Fix your posture for 1 minute",
  "Take 10 deep breaths",
  "Read 1 page of a book",
  "Write down 1 goal for today",
  "Clean one small area of your room",
  "Delete 10 useless files",
  "Walk around your room for 2 minutes",
  "Do 30 seconds of plank",
  "Do 15 jumping jacks",
  "Text someone something positive",
  "Organize your desk for 2 minutes",
  "Drink water again",
  "Close unnecessary tabs",
  "Write 3 things you're grateful for",
  "Do 10 slow lunges",
  "Look away from the screen for 20 seconds"
];

const boredButton = document.getElementById("boredButton");
const taskBox = document.getElementById("taskBox");
const taskText = document.getElementById("taskText");
const doneButton = document.getElementById("doneButton");
const skipButton = document.getElementById("skipButton");

// prevents immediate repetition
let lastTask = null;

// simple cooldown list (last few tasks used)
let recentTasks = [];
const COOLDOWN_LIMIT = 5;

function getRandomTask() {
  let availableTasks = tasks.filter(t => !recentTasks.includes(t));

  // fallback if everything is on cooldown
  if (availableTasks.length === 0) {
    availableTasks = tasks;
  }

  const index = Math.floor(Math.random() * availableTasks.length);
  return availableTasks[index];
}

function updateCooldown(task) {
  recentTasks.push(task);

  if (recentTasks.length > COOLDOWN_LIMIT) {
    recentTasks.shift();
  }
}

function showTask() {
  let task = getRandomTask();

  // avoid immediate repeat if possible
  if (task === lastTask && tasks.length > 1) {
    task = getRandomTask();
  }

  lastTask = task;
  updateCooldown(task);

  taskText.textContent = task;

  taskBox.classList.remove("hidden");
  boredButton.style.display = "none";
}

function hideTask() {
  taskBox.classList.add("hidden");
  boredButton.style.display = "inline-block";
}

boredButton.addEventListener("click", showTask);
doneButton.addEventListener("click", hideTask);
skipButton.addEventListener("click", showTask);
