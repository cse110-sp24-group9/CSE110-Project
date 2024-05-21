/*
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
*/

const checkbox = document.querySelectorAll('input[type="checkbox"]');
const textEntry = document.getElementsByClassName('info');

for(let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener('input', function() {
    if(checkbox[i].checked) {
      textEntry[i].classList.add('strikethrough');
    } else {
      textEntry[i].classList.remove('strikethrough');
    }
  })
}