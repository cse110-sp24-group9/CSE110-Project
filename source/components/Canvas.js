var simplemde = new SimpleMDE({ element: document.getElementById("markdown-editor") });

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