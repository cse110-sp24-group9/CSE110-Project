var simplemde = new SimpleMDE({
     element: document.getElementById("markdown-editor"),
     toolbar: ["bold", "italic", "strikethrough", "heading",
                "|","unordered-list", "ordered-list", "quote", "code",
                "|", "link", "image", "table",
                "|", "side-by-side", "fullscreen", "guide"]
});

simplemde.togglePreview();
const toggleModeButton = document.querySelector("#toggle-mode-button > button");
const editIcons = document.getElementsByClassName("edit-mode")
const viewIcons = document.getElementsByClassName("view-mode")
const modeDisplay = document.querySelector("#mode-info > p")

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

toggleModeButton.addEventListener('click', () => {
  if(simplemde.isPreviewActive()){
    hideElements(viewIcons)
    showElements(editIcons, 'inline')
    modeDisplay.innerHTML = "Edit Mode"
  }else{
    hideElements(editIcons)
    showElements(viewIcons, 'inline')
    modeDisplay.innerHTML = "View Mode"
  }
  simplemde.togglePreview();
});

document.getElementById('label-add').addEventListener('click', function() {
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

