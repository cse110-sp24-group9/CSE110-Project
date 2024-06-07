var simplemde = new SimpleMDE({
     element: document.getElementById("markdown-editor"),
     toolbar: ["bold", "italic", "strikethrough", "heading",
                "|","unordered-list", "ordered-list", "quote", "code",
                "|", "link", "image", "table",
                "|", "side-by-side", "fullscreen", "guide"],
    shortcuts: {"togglePreview": null}
});

simplemde.togglePreview();
const toggleModeButton = document.querySelector("#toggle-mode-button > button");
const discardButton = document.querySelector("#discard-button > button")
const editIcons = document.getElementsByClassName("edit-mode")
const viewIcons = document.getElementsByClassName("view-mode")
const modeDisplay = document.querySelector("#mode-info > p")
const editorToolbar = document.querySelector(".editor-toolbar")
const editorBox = document.querySelector("#editor")
editorToolbar.style.display = 'none'


function hideElements(elementContainer){
  for(let i = 0; i < elementContainer.length; i++){
    elementContainer[i].style.display = 'none'
  }
}

function showElements(elementContainer, display){
  for(let i = 0; i < elementContainer.length; i++){
        elementContainer[i].style.display = display
    }
}

function activateViewMode(){
    //Change to View Mode
    hideElements(editIcons)
    showElements(viewIcons, 'inline')
    modeDisplay.innerHTML = "View Mode"
    editorToolbar.style.display = 'none'
    simplemde.togglePreview();
}

function activateEditMode(){
    //Change to Edit Mode
    hideElements(viewIcons)
    showElements(editIcons, 'inline')
    modeDisplay.innerHTML = "Edit Mode"
    editorToolbar.style.display = 'block'
    simplemde.togglePreview();
}

function extractTitle(journalEntry) {
  const titlePattern = /^# [\w\W]*\n/;

  const match = journalEntry.match(titlePattern);

  return match ? match[0].trim().substring(2).trim() : "title";
}

function getPreviewText(text) {
  const titlePattern = /^# [\w\W]*\n/;
  const wordPattern = /\b\w+\b/g;

  const match = text.match(titlePattern);

  if (match) {
      const textAfterTitle = text.substring(match[0].length);
      const words = textAfterTitle.match(wordPattern);
      if (words && words.length > 10) {
          return words.slice(0, 10).join(' ');
      } else if (words) {
          return words.join(' ');
      }
  }

  const words = text.match(wordPattern);
  if (words && words.length > 10) {
      return words.slice(0, 10).join(' ');
  } else if (words) {
      return words.join(' ');
  }

  return '';
}

toggleModeButton.addEventListener('click', () => {
  if(simplemde.isPreviewActive()){
    activateEditMode();
  }else if(confirm("Save Changes?")){

    let textContent = simplemde.value();
    
    let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
    let checkedTags = [];
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
          let label = checkbox.nextElementSibling;
          if (label && label.classList.contains("label")) {
              checkedTags.push(label.title);
          }
      }
    });

    let time = new Date().valueOf();

    let favButton = document.querySelector("#favorite-button  input[type='checkbox']");
    let starred = false;
    if(favButton.checked) {
      starred = true;
    }
    
    let title = extractTitle(textContent);

    let preview_text = getPreviewText(textContent);

    let emoji = "\u{1F60A}";
    
    let obj = {
      "title": title,
      "tags": checkedTags,
      "favorite": starred,
      "time": time,
      "preview-text": preview_text,
      "text": textContent,
      "emotion": emoji
    }
  
    activateViewMode();
    // console.log(obj);
    return obj;
  } 
});

/* favButton.addEventListener('change', () => {
  checkbox = favoriteButton.querySelector("input[type='checkbox']");
  if(checkbox.checked) {

  }
}) */

discardButton.addEventListener('click', () => {
  if(simplemde.isPreviewActive() 
        && confirm("Are you sure you want to delete your Journal Entry?")
   ){
  }
  if(!simplemde.isPreviewActive() 
        && confirm("Are you sure you want to discard your Journal Entry?")
   ){
    activateViewMode()
  }
})

editorBox.addEventListener('dblclick', () => {
    if(simplemde.isPreviewActive()){
        activateEditMode()
    }
})

/* document.getElementById('label-add').addEventListener('click', function() {
    let labelBox = document.createElement('div');
    labelBox.className = 'label-box';
    labelBox.innerHTML = `
      <input type="checkbox">
      <div class="label" contenteditable="true">New Label</div>
    `;
    labelBox.querySelector('input').addEventListener('change', function() {
      let label = this.nextElementSibling;
      if (this.checked) {
        label.style.backgroundColor = '#d3d3d3';
      } else {
        label.style.backgroundColor = '';
      }
    });
    document.getElementById('label-bar').insertBefore(labelBox, document.getElementById('label-box-add'));
  });

document.getElementById('label-add').addEventListener('click', function() {


}); */



/* // Tag pop up test code
var btn = document.getElementById("label-add");
var modal = document.getElementById("tag-modal");

btn.onclick = function() {
  modal.style.display = "flex";
} */
