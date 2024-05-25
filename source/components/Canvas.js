var simplemde = new SimpleMDE({
     element: document.getElementById("markdown-editor"),
     toolbar: ["bold", "italic", "strikethrough", "heading",
                "|","unordered-list", "ordered-list", "quote", "code",
                "|", "link", "image", "table",
                "|", "side-by-side", "fullscreen", "guide"] });
simplemde.togglePreview();
const toggleModeButton = document.querySelector("#toggle-mode-button > button");


toggleModeButton.addEventListener('click', () => {simplemde.togglePreview();});

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

