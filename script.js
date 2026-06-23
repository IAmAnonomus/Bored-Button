const tasks = {
  health: [
    "Do 15 squats",
    "Do 20 jumping jacks",
    "Hold a plank for 40 seconds",
    "Stretch shoulders for 1 minute",
    "Drink a full glass of water",
    "Do 10 pushups",
    "Walk for 3 minutes",
    "Do 10 lunges each leg"
  ],

  mind: [
    "Write 1 thing you're overthinking",
    "Take 10 slow breaths",
    "Sit in silence for 1 minute",
    "Write 1 sentence about your mood",
    "List 3 things you did well today",
    "Close your eyes for 30 seconds",
    "Do nothing for 1 minute"
  ],

  productivity: [
    "Close 5 unused tabs",
    "Clean one folder",
    "Rename a messy file",
    "Delete 10 screenshots",
    "Organize desktop",
    "Write tomorrow's first task",
    "Clear downloads folder"
  ]
};

const boredButton = document.getElementById("boredButton");
const taskBox = document.getElementById("taskBox");
const taskText = document.getElementById("taskText");
const doneButton = document.getElementById("doneButton");
const skipButton = document.getElementById("skipButton");

let lastTask = null;
let recentTasks = [];
const COOLDOWN_LIMIT = 5;

// ----------------------
// DAILY RESET SYSTEM
// ----------------------

function checkDailyReset() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("lastDate");

  if (savedDate !== today) {
    localStorage.setItem("lastDate", today);
    recentTasks = [];
    lastTask = null;
  }
}

checkDailyReset();

// ----------------------
// CORE LOGIC
// ----------------------

function getRandomCategory() {
  const categories = Object.keys(tasks);
  const index = Math.floor(Math.random() * categories.length);
  return categories[index];
}

function getRandomTask() {
  const category = getRandomCategory();
  const list = tasks[category];

  let available = list.filter(t => !recentTasks.includes(t));

  if (available.length === 0) {
    available = list;
  }

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function updateCooldown(task) {
  recentTasks.push(task);

  if (recentTasks.length > COOLDOWN_LIMIT) {
    recentTasks.shift();
  }
}

function showTask() {
  // small UI delay for smoother feel
  setTimeout(() => {
    let task = getRandomTask();

    if (task === lastTask && recentTasks.length > 1) {
      task = getRandomTask();
    }

    lastTask = task;
    updateCooldown(task);

    taskText.textContent = task;

    taskBox.classList.remove("hidden");
    boredButton.style.display = "none";
  }, 120);
}

function hideTask() {
  taskBox.classList.add("hidden");
  boredButton.style.display = "inline-block";
}

// ----------------------
// EVENTS
// ----------------------

boredButton.addEventListener("click", showTask);
doneButton.addEventListener("click", hideTask);
skipButton.addEventListener("click", showTask);
