// let taskElement = '\
// <article class="task-entry">\
//   <div class="checkbox">\
//     <input type="checkbox">\
//     <div class="checkmark"></div>\
//   </div><input type="text" class="task-text">\
// </article>';
// const listElement = document.getElementById("list");

// addbtn.addEventListener('click', () => {
//     listElement.innerHTML += taskElement;
// });

// minusbtn.addEventListener('click', () => {
//     listElement.lastChild.remove();
// })

const addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function() {
  var newListElement = document.createElement('article');
  newListElement.className = 'task-entry';
  newListElement.innerHTML = `
      <div class="checkbox">
          <input type="checkbox">
          <div class="checkmark"></div>
      </div>
      <input type="text" class="task-text">
      <button class="minusbtn">-</button>
  `;
  document.getElementById('list').appendChild(newListElement);

  const minusbtn = newListElement.querySelector('.minusbtn')
  minusbtn.addEventListener('click', function() {
    newListElement.remove();
  });

  const checkbox = document.querySelectorAll('input[type="checkbox"]');
  const textEntry = document.getElementsByClassName('task-text');

  for(let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('input', function() {
      if(checkbox[i].checked) {
        textEntry[i].classList.add('strikethrough');
      } else {
        textEntry[i].classList.remove('strikethrough');
      }
    })
  }
});

document.addEventListener('DOMContentLoaded', function() {
  let addButton = document.getElementById('addbtn');
  for (let i = 0; i < 3; i++) {
      addButton.click();
  }
});
