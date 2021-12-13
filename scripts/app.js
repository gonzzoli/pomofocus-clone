const progressBar = document.querySelector('.inside-progress-bar')
let progressWidth = 0
const sessionModes = Array.from(document.querySelector('.session-type').children)
let currentMode = 'pomodoro'
const time = document.querySelector('#time')
const startStopButton = document.querySelector('#start-stop')
const currentTask = document.querySelector('.current-task')
const addTask = document.querySelector('.add-task')
const addTaskForm = document.querySelector('.add-task-form')
const newTaskInput = document.querySelector('.task-inp')
const sessionsInput = document.querySelector('.sessions-inp')
const incSession = document.querySelector('#increase-pom')
const decSession = document.querySelector('#decrease-pom')
const cancelAddTask = document.querySelector('.cancel-task')
const saveTask = document.querySelector('.save-task')
const tasksList = document.querySelector('.tasks')

let minutes = 25
let seconds = 0
function pomodoroMode() {
  sessionModes[0].style.background = '#df7977'
  sessionModes[1].style.background = 'none'
  sessionModes[2].style.background = 'none'
  minutes = 25
  seconds = 0
  startStopButton.dataset.on = 'false'
  startStopButton.textContent = 'START'
  startStopButton.style.background = 'white'
  startStopButton.style.color = 'black'
  progressWidth = 0
  progressBar.style.width = '0px'
  currentMode = 'pomodoro'
  updateTimer()
}
function shortBreakMode() {
  sessionModes[0].style.background = 'none'
  sessionModes[1].style.background = '#df7977'
  sessionModes[2].style.background = 'none'
  minutes = 5
  seconds = 0
  startStopButton.dataset.on = 'false'
  startStopButton.textContent = 'START'
  startStopButton.style.background = 'white'
  startStopButton.style.color = 'black'
  progressWidth = 0
  progressBar.style.width = '0px'
  currentMode = 'short-break'
  updateTimer()
}
function longBreakMode() {
  sessionModes[0].style.background = 'none'
  sessionModes[1].style.background = 'none'
  sessionModes[2].style.background = '#df7977'
  minutes = 10
  seconds = 0
  startStopButton.dataset.on = 'false'
  startStopButton.textContent = 'START'
  startStopButton.style.background = 'white'
  startStopButton.style.color = 'black'
  progressWidth = 0
  progressBar.style.width = '0px'
  currentMode = 'long-break'
  updateTimer()
}
function updateTimer() {
  time.textContent = `${minutes}:${seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}`
}
function toggleTimer() {
  startStopButton.style.transition = '.1s ease-in-out'
  if(startStopButton.dataset.on == 'false') {
    startStopButton.dataset.on = 'true'
    startStopButton.textContent = 'STOP'
    startStopButton.style.background = '#df5550'
    startStopButton.style.color = 'white'
  } else {
    startStopButton.dataset.on = 'false'
    startStopButton.textContent = 'START'
    startStopButton.style.background = 'white'
    startStopButton.style.color = 'black'
  }
}
setInterval(() => {
  if(startStopButton.dataset.on == 'false' || minutes == 0 && seconds == -1) {
    return
  }
  if(seconds == -1) {
    minutes--
    updateTimer()
    seconds = 59
    if(minutes == 0) {
      console.log('you made it')
    }
  }
  updateTimer()
  if(currentMode == 'pomodoro') progressWidth += 100/1500
  if(currentMode == 'short-break') progressWidth += 100/300
  if(currentMode == 'long-break') progressWidth += 100/600
  progressBar.style.width = `${progressWidth}%`
  seconds--
  
}, 100)

{
sessionModes[0].addEventListener('click', pomodoroMode)
sessionModes[1].addEventListener('click', shortBreakMode)
sessionModes[2].addEventListener('click', longBreakMode)
startStopButton.addEventListener('click', toggleTimer)
addTask.addEventListener('click', openTaskForm)
incSession.addEventListener('click', () => {
  sessionsInput.value++
})
decSession.addEventListener('click', () => {
  if(sessionsInput.value > 0) sessionsInput.value--
})
}
cancelAddTask.addEventListener('click', cancelTaskForm)
newTaskInput.addEventListener('keydown', checkInput)

function checkInput() {
  // brief timeout to allow the input value to update
  setTimeout(() => {
    if(newTaskInput.value.trim() != '') {
      saveTask.addEventListener('click', submitTaskForm)
      saveTask.style.background = 'black'
      return
    } else {
      saveTask.style.background = '#b2b2b2'
      saveTask.removeEventListener('click', submitTaskForm)
    }
  }, 5)
}

function cancelTaskForm() {
  addTaskForm.style.height = '70px'
  addTaskForm.style.opacity = '0'
  saveTask.style.background = '#b2b2b2'
  saveTask.removeEventListener('click', submitTaskForm)
  setTimeout(() => {
    sessionsInput.value = 0
    newTaskInput.value = ''
    addTaskForm.style.display = 'none'
    addTask.style.display = 'flex'
  }, 190)

}

function submitTaskForm() {
  createNewTask()
  //clears the input and closes the window
  cancelTaskForm()
}
function createNewTask() {
  const createdTask = document.createElement('div')
  createdTask.classList.add('task')
  const left = document.createElement('div')
  left.classList.add('left')
  const checkCircle = document.createElement('i')
  checkCircle.classList.add('fas', 'fa-check-circle')
  const description = document.createElement('p')
  const right = document.createElement('div')
  right.classList.add('right')
  const numPom = document.createElement('p')
  numPom.classList.add('num-pom')
  const options = document.createElement('i')
  options.classList.add('fas', 'fa-ellipsis-v')

  description.textContent = newTaskInput.value
  numPom.textContent = `0/${sessionsInput.value}`
  left.append(checkCircle, description)
  right.append(numPom, options)
  createdTask.append(left, right)
  tasksList.append(createdTask)
}
function openTaskForm() {
  addTask.style.display = 'none'
  addTaskForm.style.display = 'block'
  setTimeout(() => {
    addTaskForm.style.height = '255px'
    addTaskForm.style.opacity = '1'
  }, 10)
}
