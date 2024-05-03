let taskElement = '\
<article class="task-entry">\
  <div class="checkbox">\
    <input type="checkbox">\
    <div class="checkmark"></div>\
  </div><input type="text">\
</article>';
const listElement = document.getElementById("list");

addbtn.addEventListener('click', () => {
    listElement.innerHTML += taskElement;
});

minusbtn.addEventListener('click', () => {
    listElement.lastChild.remove();
})