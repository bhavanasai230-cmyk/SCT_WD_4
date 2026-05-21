let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

const taskCount =
document.getElementById(
"taskCount"
);

if(taskCount){

taskCount.innerText=
`You have ${tasks.length} tasks today`;

}

const params=
new URLSearchParams(
window.location.search
);

const currentCategory=
params.get("category");

const categoryTitle=
document.getElementById(
"categoryTitle"
);

const categoryCount=
document.getElementById(
"categoryCount"
);

const taskContainer=
document.getElementById(
"taskContainer"
);

const modal=
document.getElementById(
"taskModal"
);

const openModalBtn=
document.getElementById(
"openModalBtn"
);

const saveTask=
document.getElementById(
"saveTask"
);

const taskInput=
document.getElementById(
"taskInput"
);

const taskDate=
document.getElementById(
"taskDate"
);

const taskTime=
document.getElementById(
"taskTime"
);

const taskCategory=
document.getElementById(
"taskCategory"
);

/* CATEGORY TITLE */

if(categoryTitle){

categoryTitle.innerText=
`${currentCategory} Tasks`;

}

/* OPEN MODAL */

if(openModalBtn){

openModalBtn.onclick=()=>{

modal.style.display="flex";

taskCategory.value=
currentCategory;

};

}

/* CLOSE MODAL */

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

};

/* SAVE TASK */

if(saveTask){

saveTask.onclick=()=>{

if(
taskInput.value.trim()===""
){

alert(
"Please enter task."
);

return;

}

const task={

id:Date.now(),

title:
taskInput.value,

category:
taskCategory.value,

date:
taskDate.value,

time:
taskTime.value,

completed:false

};

tasks.push(task);

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

taskInput.value="";
taskDate.value="";
taskTime.value="";

modal.style.display="none";

renderTasks();

updateCounter();

};

}

/* RENDER */

function renderTasks(){

if(!taskContainer)
return;

taskContainer.innerHTML="";

let filteredTasks=

tasks.filter(task=>

task.category===
currentCategory

);

if(
filteredTasks.length===0
){

taskContainer.innerHTML=`

<div class="empty">

<h2>

No assignments yet 🚀

</h2>

<p>

Create your first task.

</p>

</div>

`;

if(categoryCount){

categoryCount.innerText=
"0 Tasks";

}

return;

}

filteredTasks.forEach(task=>{

const card=
document.createElement(
"div"
);

card.className=
"task-card";

if(task.completed){

card.classList.add(
"completed"
);

}

card.innerHTML=`

<div class="left">

<input
type="checkbox"
${task.completed
?"checked":""}>

<div>

<div class="taskTitle">

${task.title}

</div>

<div class="categoryText">

${task.category}

</div>

<div class="taskMeta">

📅 ${task.date || "No Date"}

&nbsp;&nbsp;

🕒 ${task.time || "No Time"}

</div>

</div>

</div>

<div class="actions">

<button
class="editBtn">

<i class="fa-solid fa-pen">

</i>

</button>

<button
class="deleteBtn">

<i class="fa-solid fa-trash">

</i>

</button>

</div>

`;

/* COMPLETE */

card.querySelector(
"input"
).onclick=()=>{

task.completed=
!task.completed;

saveStorage();

};

/* EDIT */

card.querySelector(
".editBtn"
).onclick=()=>{

let newTask=
prompt(
"Edit task",
task.title
);

if(

newTask!==null &&
newTask.trim()!==""

){

task.title=
newTask;

saveStorage();

}

};

/* DELETE */

card.querySelector(
".deleteBtn"
).onclick=()=>{

if(
confirm(
"Delete task?"
)
){

tasks=
tasks.filter(
t=>t.id!==task.id
);

saveStorage();

}

};

taskContainer.appendChild(
card);

});

if(categoryCount){

categoryCount.innerText=

`${filteredTasks.length} Tasks`;

}

}

/* SAVE */

function saveStorage(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

renderTasks();

updateCounter();

}

/* HOME COUNTER */

function updateCounter(){

const count=
document.getElementById(
"taskCount"
);

if(count){

count.innerText=

`You have ${tasks.length}
tasks today`;

}

}

renderTasks();

updateCounter();