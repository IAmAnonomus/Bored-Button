const tasks = {
  health: [
    "Do 15 squats",
    "Do 20 jumping jacks",
    "Hold a plank for 40 seconds",
    "Stretch shoulders for 1 minute",
    "Drink a full glass of water",
    "Do 10 pushups",
    "Walk for 3 minutes",
    "Do 10 lunges each leg",
    "Do 25 calf raises",
    "Hold a 30-second wall sit",
    "Do 20 mountain climbers",
    "Do 10 burpees",
    "Do 1 minute jumping rope motion",
    "Stretch hamstrings for 1 minute",
    "Do 15 sit-ups",
    "Do 20 high knees",
    "Hold a 30-second squat position",
    "Do 10 incline pushups (hands on desk)",
    "Do shoulder rolls for 1 minute",
    "Take a 2-minute walk around your room",
    "Do 15 glute bridges",
    "Do 20 arm circles",
    "Stretch neck gently for 30 seconds",
    "Do 10 slow controlled squats",
    "Do 30 seconds fast feet",
    "Hold a 15-second perfect plank"
  ],

  mind: [
    "Write 1 thing you're overthinking",
    "Take 10 slow breaths",
    "Sit in silence for 1 minute",
    "Write 1 sentence about your current mood",
    "List 3 things you did well today",
    "Close your eyes for 30 seconds",
    "Do nothing for 1 minute",
    "Write 1 goal for tomorrow",
    "Write 1 thing you're grateful for",
    "Look around and name 5 things you see",
    "Name 4 things you can physically feel right now",
    "Name 3 sounds you can hear",
    "Write one fear you're currently having",
    "Visualize your day going smoothly for 30 seconds",
    "Let thoughts pass for 1 minute without reacting",
    "Write 1 thing you want to improve",
    "Recall 1 win from yesterday",
    "Relax jaw and shoulders for 30 seconds",
    "Slow breathing for 1 minute",
    "Imagine your ideal day in detail for 30 seconds",
    "Write 1 thing you're avoiding right now",
    "Accept one uncomfortable thought for 30 seconds",
    "Reset posture and take 5 deep breaths",
    "Observe thoughts for 1 minute without judgment"
  ],

  productivity: [
    "Close 5 unused tabs",
    "Clean one folder (move or delete 5 files)",
    "Rename 1 messy file",
    "Delete 10 screenshots",
    "Organize desktop (move 5 items)",
    "Write tomorrow's first task",
    "Clear downloads folder (delete or sort 5 files)",
    "Empty recycle bin",
    "Sort one messy folder (at least 5 items)",
    "Remove 5 unused files",
    "Write a 3-task to-do list",
    "Delete 10 old downloads",
    "Organize one school folder",
    "Clear 5 unused bookmarks",
    "Fix 1 messy note or document",
    "Rename 2 confusing files",
    "Clean desktop (remove 5 items)",
    "Backup 1 important file",
    "Delete duplicate files (at least 3)",
    "Close all unused apps",
    "Organize one project folder (5 items)",
    "Write today’s top 3 priorities",
    "Delete 10 junk files",
    "Summarize 1 task you’re avoiding in 1 sentence",
    "Open and prepare your main working file"
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

function getRandomCategory() {
  const categories = Object.keys(tasks);
  const useRandomMode = Math.random() < 0.2;

  if (useRandomMode) return "random";

  const index = Math.floor(Math.random() * categories.length);
  return categories[index];
}

function getRandomTask() {
  const category = getRandomCategory();

  let pool = [];

  if (category === "random") {
    pool = Object.values(tasks).flat();
  } else {
    pool = tasks[category];
  }

  let available = pool.filter(t => !recentTasks.includes(t));

  if (available.length === 0) {
    available = pool;
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

boredButton.addEventListener("click", showTask);
doneButton.addEventListener("click", hideTask);
skipButton.addEventListener("click", showTask);
