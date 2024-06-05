     /*
     Outline of template made by Brendon He
     Documentation done by:
      - Henry Tiet
      - Jason Boenjamin
     */
     
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
                    <option value="">Select tag</option>
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                   
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <textarea id="info"></textarea>
              </article>
              <article id="input-accept">
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
          newListElement.addEventListener('click', () => {
            let editModal = document.createElement('div');
            editModal.setAttribute('class', 'modal_check_current_event');
            editModal.innerHTML=`
            <h5>Edit Event</h5>
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
                    <option value="">Select tag</option>
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                   
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <textarea id="info"></textarea>
              </article>
              <article id="input-accept">
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
              editModal.remove();
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
                modal.style.display = "none";
                let newListElement = document.createElement('article');
                newListElement.className = 'element-entry';
                newListElement.innerHTML = `
                <div id="event-entry" class="${tag.value}">
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
            });
        }
    }
    
    customElements.define('event-list-component',EventListItem);