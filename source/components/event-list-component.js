     /*
     Outline of template made by Brendon He
     Documentation done by:
      - Henry Tiet
      - Jason Boenjamin
     */
     //TO DO: database, events should order themselves by time
      export default class EventListItem extends HTMLElement{
        /**
         * @type {ShadowRoot}
         * @private
         * @summary the shadow root of the task item Component
         */
        #shadow
        /**
         * @type {HTMLElement}
         * @private
         * @summary the Div that holds the task list
         */
        #event_list
        /**
         * @type {HTMLButtonElement}
         * @private
         * @summary the button to add a Task
         */
        #addEventButton
    
        /**
         * Documented by Henry Tiet
         * Constructs the shadow tree with fixed nodes of add task 
         * and the list
         */
        constructor(){
            super();
            console.log("custom component");
            let styleElement = document.createElement('style');
            this.#shadow = this.attachShadow({mode: "open"});
            /**
             * @type {HTMLTemplateElement}
             */
    
            const tmpl =  document.getElementById('event-list-template');
            /**
             * Documented by Henry
             * Appends the template to shadow
             */
            this.#shadow.appendChild(tmpl.content.cloneNode(true));
            this.#shadow.append(styleElement);
            /**
             * @type {HTMLButtonElement}
             */
            this.#addEventButton = this.#shadow.querySelector('#add-event');     
            /**
             * @type {HTMLDivElement}
             */
            this.#event_list = this.#shadow.querySelector("#displayEvents");

            let modal = document.createElement('div');
            modal.setAttribute('id', 'modal_add_event');
            this.#shadow.append(modal);
            console.log("creating modal");
            console.log(modal);
            this.#setUpModal();
            this.setUpaddEventButton();
            this.setUpCancelAndConfirm();

            //added by jason
            // when user clicks off modal, closes event
            this.addGlobalClickListener();
        }
      

         /*
         * Documented and created by Jason
         * close all modals when clicked
        */ 
         closeAllModals() {
          let modals = this.#shadow.querySelectorAll('.modal_check_current_event, #modal_add_event');
          modals.forEach(modal => {
              modal.style.display = 'none';
          });
        }
        
        /*
         * Documented and Created by Jason
         * Close modals when clicking off the screen
        */ 
        addGlobalClickListener() {
          document.addEventListener('click', (event) => {

              // important, i wish i knew this earlier
              // event.composedPath()[0]; is used to get the actual clicked element even if it is inside a shadow DOM.
              const clickedElement = event.composedPath()[0];
      
              // testing
              // Log the tag name, id, and class of the clicked element
              // console.log('Clicked element tag name:', clickedElement.tagName);
              // console.log('Clicked element id:', clickedElement.id || 'No ID');
              // console.log('Clicked element classes:', clickedElement.classList.value || 'No Classes');
      
              // Select elements inside the shadow DOM
              const modals = this.shadowRoot.querySelectorAll('.modal_check_current_event, #modal_add_event');
              const addEventButton = this.shadowRoot.querySelector('#add-event');
      
              let clickInside = false;
      
              // Check if the click is inside the shadow root
              if (this.shadowRoot.contains(clickedElement)) {
                  // console.log('Click inside shadow root detected.');
                  clickInside = true;
              }
      
              // Check if the click is inside any modal
              modals.forEach(modal => {
                  if (modal.contains(clickedElement)) {
                      // console.log('Click inside modal:', modal);
                      clickInside = true;
                  }
              });
      
              // Check if the click is on the add event button
              if (addEventButton && addEventButton.contains(clickedElement)) {
                  // console.log('Click on add event button:', addEventButton);
                  clickInside = true;
              }
      
              if (!clickInside) {
                  // console.log('Click outside detected. Closing modals.');
                  this.closeAllModals();
              }
          });
      }
      
      


        /*
         * Documented by Jason
         * Converted the old Javascript into a template
         * Pulled old code and incorporated shadow dom into a template
        */ 

        //currently the confirm button is just a regular button. 
        //This is so that we can just add an event
        //Once we get our storage running, switch it to the submit type, so it enters somehting into storage and reolads the page
        //then the event list will go and grab everything from the storage and load it
        #setUpModal(){
            console.log("setting up modal");
            let modal = this.#shadow.querySelector('#modal_add_event');
            console.log(modal);
            modal.innerHTML=`
            <h5>New Event</h5>
            <form>
              <article id="input-title">
                <label for="title">Title</label><input type="text" id="title">
              </article>
              <article id="input-date">
                <label for="date">Date</label><input type="date" id="date">
              </article>
              <article id="input-time">
                <label for="time">Time</label><input type="time" id="time">
              </article>
              <article id="input-tag">
                <label for="tag">Tag</label>
                <select id="tag">
                    <option value="" selected disabled hidden>Select tag</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Workshop">Workshop</option>
                   
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <input type="text" id="info">
              </article>
              <article id="input-accept" class="input-accept">
                <button type="button" class="event-cancel">Cancel</button>
                <button type="button" class="event-confirm">Save</button>
              </article>
          `;
          modal.style.display = "none";
        }


        /**
         * Documented by Henry Tiet
         * Sets up add button to add NEW events
         */
        setUpaddEventButton(){
            this.#addEventButton.addEventListener('click', () => {
                this.closeAllModals(); // Close all other modals (ADDED BY JASON)
                let modal = this.#shadow.querySelector('#modal_add_event');
                modal.style.display = "flex";
            });
        }
        //set up so that all the info of an event is loaded into editModal
        //set up so that pressing confirm will change the contents of event
        //can go into css and make it so that all buttons are on the same row

        /**
         * Documented by Henry
         * Sets up edit button for existing events. Based off of add button, however creates a new hidden 
         * modal that allows editing of existing elements
         * Called in setUpCancelAndConfirm as new elements are made
         * 
         * @param {*} newListElement existing element to pass
         */
        setUpEdit(newListElement){
          newListElement.addEventListener('dblclick', () => {
            
            // Remove any existing edit modals before creating a new one
            this.closeAllModals(); // Close all other modals (added by jason)
                  
            let editModal = document.createElement('div');
            editModal.setAttribute('class', 'modal_check_current_event');
            let entry = newListElement.querySelector("#event-entry");
            console.log(entry);
            let info = (entry.getAttribute('info'));
            let time = (entry.getAttribute('time'));
            let date =(entry.getAttribute('date'));
            let tag = (entry.getAttribute('tag'));
            let title=(entry.getAttribute('title'));
            editModal.innerHTML=`
            <h5>Edit Event</h5>
            <form>
              <article id="input-title">
                <label for="title">Title</label><input type="text" id="title" value= "${title}">
              </article>
              <article id="input-date">
                <label for="date">Date</label><input type="date" id="date" value= "${date}">
              </article>
              <article id="input-time">
                <label for="time">Time</label><input type="time" id="time" value= "${time}">
              </article>
              <article id="input-tag">
                <label for="tag">Tag</label>
                <select id="tag">
                    <option value="${tag}" selected disabled hidden>${tag}</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Workshop">Workshop</option>
                   
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <input type="text" id="info" value= "${info}">
              </article>
              <article id="input-accept" class="input-accept">
                <button type="button" class="edit-cancel">Cancel</button>
                <button type="button" class="edit-confirm">Save</button>
                <button type="button" class="edit-delete">Delete</button>
              </article>
            </form>
            `;
            //cancel & delete Button is working, set up confirm to change the event data;
            let cancelButton = editModal.querySelector(".edit-cancel");
            let confirmButton = editModal.querySelector(".edit-confirm");
            let deleteButton = editModal.querySelector(".edit-delete");
            cancelButton.addEventListener('click', () => {
              editModal.remove();
            });
            confirmButton.addEventListener('click', () => {
              let title = editModal.querySelector('#title');
              let date = editModal.querySelector('#date');
              let time = editModal.querySelector('#time');
              let tag = editModal.querySelector('#tag');
              let info = editModal.querySelector('#info');
              if(date.value=='') alert("Invalid Date");
              else if(title.value=='') alert("Missing Title");
              else if(time.value=='') alert("Missing Time");
              else if(tag.value=='') alert("Missing Tag");
              else if(date.value.length!=10) alert("Date must be in format of DD/MM/YYYY. There can only be 4 digits for the year");
              else{
                //please tell me theres a better way of doing this
                let curDate = new Date();
                let year=date.value.substring(0,4);
                let month=date.value.substring(5,7);
                let day=date.value.substring(8,10);
                let hour = time.value.substring(0,2);
                let min = time.value.substring(3,5);
                let eventTime = new Date(year, month, day, hour, min);
                if(eventTime>curDate)
                newListElement.innerHTML = `
                <div id="event-entry" class="event-ToBe" tag="${tag.value}" date= "${date.value}" time ="${time.value}" title = "${title.value}" info = "${info.value}">
                <div id="title">${title.value}</div>
                <div id="time">${time.value}</div>
                </div> 
                `;
                else newListElement.innerHTML = `
                <div id="event-entry" class="event-passed" tag="${tag.value}" date= "${date.value}" time ="${time.value}" title = "${title.value}" info = "${info.value}">
                <div id="title">${title.value}</div>
                <div id="time">${time.value}</div>
                </div> 
                `;
                editModal.remove();
              }
            });
            deleteButton.addEventListener('click', () => {
              editModal.remove();
              newListElement.remove();
            });
            this.#shadow.append(editModal);
            
            editModal.style.display="flex";

        });
        }

        /**
         * Documented by Henry
         * Sets up modal for new and existing events. Grabs modal and form elements to display and edit
         */
        setUpCancelAndConfirm(){
            let cancel = this.#shadow.querySelector('.event-cancel');
            let confirm = this.#shadow.querySelector('.event-confirm');
            let modal = this.#shadow.querySelector('#modal_add_event');
            let title = this.#shadow.querySelector('#title');
            let date = this.#shadow.querySelector('#date');
            let time = this.#shadow.querySelector('#time');
            let tag = this.#shadow.querySelector('#tag');
            let info = this.#shadow.querySelector('#info');
            cancel.addEventListener('click', () => {
                modal.style.display = "none";
                title.value ='';
                date.value='';
                time.value='';
                tag.value='';
                info.value='';
            }); 
            //confirm currently does not store all the data, make sure to store all the data
            //date and info not saved
            confirm.addEventListener('click', () => {
              if(date.value=='') alert("Invalid Date");
              else if(title.value=='') alert("Missing Title");
              else if(time.value=='') alert("Missing Time");
              else if(tag.value=='') alert("Missing Tag");
                else {
                  modal.style.display = "none";
                  let newListElement = document.createElement('article');
                  newListElement.className = 'element-entry';
                //please tell me theres a better way of doing this
                let curDate = new Date();
                let year=date.value.substring(0,4);
                let month=date.value.substring(5,7);
                let day=date.value.substring(8,10);
                let hour = time.value.substring(0,2);
                let min = time.value.substring(3,5);
                let eventTime = new Date(year, month, day, hour, min);
                if(eventTime>curDate)
                newListElement.innerHTML = `
                <div id="event-entry" class="event-ToBe" tag="${tag.value}" date= "${date.value}" time ="${time.value}" title = "${title.value}" info = "${info.value}">
                <div id="title">${title.value}</div>
                <div id="time">${time.value}</div>
                </div> 
                `;
                else newListElement.innerHTML = `
                <div id="event-entry" class="event-passed" tag="${tag.value}" date= "${date.value}" time ="${time.value}" title = "${title.value}" info = "${info.value}">
                <div id="title">${title.value}</div>
                <div id="time">${time.value}</div>
                </div> 
                `;
                  this.setUpEdit(newListElement);
                  this.#event_list.appendChild(newListElement);
                  title.value ='';
                  date.value='';
                  time.value='';
                  tag.value='';
                  info.value='';
               }
            });
        }
    }
    
    customElements.define('event-list-component',EventListItem);