var simplemde = new EasyMDE({
     element: document.getElementById("markdown-editor"),
     toolbar: ["bold", "italic", "strikethrough", "heading",
                "|","unordered-list", "ordered-list", "quote", "code",
                "|", "link", "image", "table",
                "|", "side-by-side", "fullscreen", "guide"],
    shortcuts: {"togglePreview": null}
});
const color_map = {
  "Front End": "#ffb3ba",
  "Back End": "#ffdfba",
  "Meeting": "#ffffba",
  "Planning": "#bcffba",
  "Documentation": "#ffb3ba",
  "Design": "#ffdfba",
  "Testing": "#ffffba",
  "High Priority": "#bcffba",
  "Medium Priority": "#ffb3ba",
  "Low Priority": "#ffdfba"
}

let curr_entry = undefined;

simplemde.togglePreview();
const toggleModeButton = document.querySelector("#toggle-mode-button > button");
const discardButton = document.querySelector("#discard-button > button")
const editIcons = document.getElementsByClassName("edit-mode")
const viewIcons = document.getElementsByClassName("view-mode")
const modeDisplay = document.querySelector("#mode-info > p")
const editorToolbar = document.querySelector(".editor-toolbar")
const editorBox = document.querySelector("#editor")
editorToolbar.style.display = 'none'
// Added by Jesus
const emotion = document.getElementById("emotion-modal");


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
          let label = checkbox.value;
          // console.log('label + color: ' + label + " : " + color_map[label]);
          checkedTags.push([label,color_map[label]]);
      }
    });
    console.log(checkedTags);
    let calendar_date = new Date(document.querySelector('calendar-component').current_utc_time_stamp);
    let curDate = new Date();
    let curHours= curDate.getHours();
    let curMin = curDate.getMinutes();
    calendar_date.setHours(curHours);
    calendar_date.setMinutes(curMin);
    calendar_date.setSeconds(curDate.getSeconds());
    calendar_date.setMilliseconds(curDate.getMilliseconds());
    let time = calendar_date.valueOf();

    let favButton = document.querySelector("#favorite-button  input[type='checkbox']");
    let starred = false;
    if(favButton.checked) {
      starred = true;
    }
    
    let title = extractTitle(textContent);

    let preview_text = getPreviewText(textContent);

    /* let obj = {
      "title": title,
      "tags": checkedTags,
      "favorite": starred,
      "time": time,
      "preview-text": preview_text,
      "text": textContent,
      "emotion": emoji
    } */
    // keep obj we need that refernce 
    
    // console.log(obj);

    // emoji - Jesus Andrew Charlie
    emotion.querySelectorAll("button").forEach((entry)=>{
      entry.addEventListener('click', (e)=>{
        e.preventDefault();
        emotion.close(entry.value);
      })
    });
    let obj = {
      "title": title,
      "tags": checkedTags,
      "favorite": starred,
      "time": curr_entry != undefined ? curr_entry['time'] : time,
      "preview-text": preview_text,
      "content": textContent,
      "emotion": curr_entry != undefined ? curr_entry['emotion'] : ''
    }
    if(!curr_entry){
      emotion.addEventListener('close', (e) =>{
        console.log(emotion.returnValue);
        //in here we do the save operation because at this point the object is final
        obj['emotion'] = emotion.returnValue;
        console.log(JSON.stringify(obj));
        let old_entries = document.querySelector('journal-entries-component').save();
        let new_entries = [];
        let found = false;
        for(let old_obj of old_entries){
          if(old_obj['time'] === obj['time']){
            new_entries.push(obj);
            found = true;
          }else{
            new_entries.push(old_obj);
          }
        }
        if(!found){
          new_entries.push(obj);
        }
        document.querySelector('journal-entries-component').clearEntries();
        for(let new_obj of new_entries){
          document.querySelector('journal-entries-component').addEntry(new_obj);
        }
        window.dispatchEvent(new Event('data-updated',{
          bubbles: true,
          cancelable: false,
          composed: true
        }));
        curr_entry = undefined;
        // clear editor
        simplemde.value("");
        let checkboxes_unSelect = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
        checkboxes_unSelect.forEach(checkbox => {
          checkbox.checked = false;
        })
        activateViewMode();
      });
      emotion.showModal();
    }else
    {
      let old_entries = document.querySelector('journal-entries-component').save();
      let new_entries = [];
      let found = false;
      for(let old_obj of old_entries){
        if(old_obj['time'] === obj['time']){
          new_entries.push(obj);
          found = true;
        }else{
          new_entries.push(old_obj);
        }
      }
      if(!found){
        new_entries.push(obj);
      }
      document.querySelector('journal-entries-component').clearEntries();
      for(let new_obj of new_entries){
        document.querySelector('journal-entries-component').addEntry(new_obj);
      }
      window.dispatchEvent(new Event('data-updated',{
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      curr_entry = undefined;
      // clear editor
      console.log('before clearing');
      simplemde.value("");
      let checkboxes_unSelect = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
      checkboxes_unSelect.forEach(checkbox => {
        checkbox.checked = false;
      });
      activateViewMode();
    }
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
      if(curr_entry){
        // delete entry from component, by fetching all items and then removing the one with the same time stamp
        // then clear the component, then load them back into it and call the data-changed event
        /**
         * @type {Array<Object>}
         */
          let entry_list = document.querySelector('journal-entries-component').save();
          let good_list = [];
          for(let obj of entry_list){
            if(obj['time'] === curr_entry['time']){
                continue;
            }
            good_list.push(obj);
          }
          document.querySelector('journal-entries-component').clearEntries();
          for(let obj of good_list){
            document.querySelector('journal-entries-component').addEntry(obj);
          }
          window.dispatchEvent(new Event('data-updated',{
            bubbles: true,
            composed: true,
            cancelable: false
          }));
      }
      curr_entry = undefined
      console.log('before reseting the editor');
      // reset the editor
      simplemde.value("");
      let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      })

  }
  if(!simplemde.isPreviewActive() 
        && confirm("Are you sure you want to discard your Journal Entry?")
   ){
    if(curr_entry){
      // defualts the view back to curr_entry
      /**
       * @type {string}
       */
      let text = curr_entry['content'];
      /**
       * @type {Array<Object>}
       */
      let tag_list = curr_entry['tags']; // [title, color] 

      simplemde.value(text);

      let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
      console.log(checkboxes);
      checkboxes.forEach(checkbox => {
        let tag_flat = tag_list.map((value) => value[0]);
        if(tag_flat.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }else{
      // clears the screen back to default
      simplemde.value("");
      let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      })
    }
    activateViewMode();
  }
})

editorBox.addEventListener('dblclick', () => {
    if(simplemde.isPreviewActive()){
        activateEditMode();
    }
})

document.querySelector('journal-entries-component').addEventListener('journal-clicked', (event)=>{
    curr_entry = event.detail.entry;
    // charile clear the screen for the editor and load the curr entry
    let tag_list = curr_entry['tags'];
    let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
    console.log(checkboxes);
    checkboxes.forEach(checkbox => {
      let tag_flat = tag_list.map((value) => value[0]);
      console.log(tag_flat);
      if(tag_flat.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
    simplemde.value(curr_entry['content']);
})

document.querySelector('#new-entry-button').addEventListener('click', (event)=>{
    curr_entry = undefined;
    activateEditMode();
    simplemde.value("");
    let checkboxes = document.querySelectorAll("#label-bar .label-box input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    })
    activateViewMode();
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
