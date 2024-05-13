let taskElement;
leti=0;
const listElement = document.getElementById("list");
let i=0;

AddTask.addEventListener('click', () => {
    createNewTask();
    listElement.insertAdjacentHTML('beforeend', taskElement);
    i++;
});

function deleteTask(id){
  let taskNumber= `Task ${id}`;
  let toBeDeleted = document.getElementById(taskNumber);
  toBeDeleted.remove();
}

function createNewTask(){
  taskElement ="";
  taskElement += `<article class="task-entry" id="Task ${i}">
  <div class="checkbox">
    <input type="checkbox">
    <div class="checkmark"></div>
  </div><input type="text">
  <button id="${i}" onclick="deleteTask(this.id)">-</button>
  </article>`;
  onclick
}
function changeValue(val){
  this.value =val;
}