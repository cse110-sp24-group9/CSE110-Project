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
         * @type {Array} (added by Jason)
         * @private
         * @summary the array of tuples that holds [eventObj, eventElement]
         */
        listOfEvents = [];

        /**
         * Documented by Henry Tiet
         * Created by Henry and Brendon
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
    
            const tmpl = document.getElementById('event-list-template');
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
            this.addNewEvent();

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
         * Created by Brendon
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
              <article id="input-start">
                <label for="time_start">Start Time</label><input type="time" id="time_start">
              </article>
              <article id="input-end">
                <label for="time_end">End Time</label><input type="time" id="time_end">
              </article>
              <article id="input-tag">
                <label for="tag">Tag</label>
                <select id="tag">
                    <option value="" selected disabled hidden>Select tag</option>
                    <option value="Front_End">Front_End</option>
                    <option value="Back_End">Back_End</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Planning">Planning</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Design">Design</option>
                    <option value="Testing">Testing</option>
                    <option value="Low_Priority">Low_Priority</option>
                    <option value="Medium_Priority">Medium_Priority</option>
                    <option value="High_Priority">High_Priority</option>
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
         * Created by Brendon
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
         * Created by Brendon
         * Sets up edit button for existing events. Based off of add button, however creates a new hidden 
         * modal that allows editing of existing elements
         * Called in addNewEvent as new elements are made
         * 
         * @param {*} newListElement existing element to pass
         */
        editEvent(newListElement){
          newListElement.addEventListener('dblclick', () => {            
            // Remove any existing edit modals before creating a new one
            this.closeAllModals(); // Close all other modals (added by jason)
                  
            let editModal = document.createElement('div');
            editModal.setAttribute('class', 'modal_check_current_event');
            let entry = newListElement.querySelector("#event-entry");
            console.log(entry);
            let info = (entry.getAttribute('info'));
            let time_start = (entry.getAttribute('time_start'));
            let time_end =(entry.getAttribute('time_end'));
            let tag = (entry.getAttribute('tag'));
            let title=(entry.getAttribute('title'));
            editModal.innerHTML=`
            <h5>Edit Event</h5>
            <form>
              <article id="input-title">
                <label for="title">Title</label><input type="text" id="title" value= "${title}">
              </article>
              <article id="input-start">
                <label for="time_start">Start Time</label><input type="time" id="time_start" value="${time_start}">
              </article>
              <article id="input-end">
                <label for="time_end">End Time</label><input type="time" id = "time_end" value="${time_end}">
              </article>
              <article id="input-tag">
                <label for="tag">Tag</label>
                <select id="tag">
                    <option value="${tag}" selected disabled hidden>${tag}</option>
                    <option value="Front_End">Front_End</option>
                    <option value="Back_End">Back_End</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Planning">Planning</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Design">Design</option>
                    <option value="Testing">Testing</option>
                    <option value="Low_Priority">Low_Priority</option>
                    <option value="Medium_Priority">Medium_Priority</option>
                    <option value="High_Priority">High_Priority</option>
                   
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <input type="text" id="info" value= "${info}">
              </article>
              <article id="edit-accept" class="edit-accept">
                <button type="button" class="edit-delete">Delete</button>
                <button type="button" class="edit-cancel">Cancel</button>
                <button type="button" class="edit-confirm">Save</button>
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
              let time_start = editModal.querySelector('#time_start');
              let time_end = editModal.querySelector('#time_end');
              let tag = editModal.querySelector('#tag');
              let info = editModal.querySelector('#info');
              if(title.value=='') alert("Missing Title");
              else if(time_start.value=='') alert("Invalid Start Time");
              else if(time_end.value=='') alert("Invalid End Time");
              else if(time_start.value>time_end.value) alert("End Time cannot be before Start Time");
              else if(tag.value=='') alert("Missing Tag");
              else{
                //please tell me theres a better way of doing this
                
                let curDate = new Date();
                let eventTime = new Date(document.querySelector('calendar-component').current_utc_time_stamp);
                console.log(time_end.value);
                eventTime.setHours(time_end.value.substring(0,2));
                eventTime.setMinutes(time_end.value.substring(3,5));

                for (let pair of this.listOfEvents) {
                  if(pair[1] === newListElement) {
                    let event = {
                      "title": title.value,
                      "time_start": time_start.value,
                      "time_end": time_end.value,
                      "tag": tag.value,
                      "info": info.value
                    };
                    pair[0] = event;
                  }
                }
                if(eventTime>curDate){
                  newListElement.innerHTML = `
                  <div id="event-entry" class="${tag.value}" tag="${tag.value}" time_start= "${time_start.value}" time_end ="${time_end.value}" title = "${title.value}" info = "${info.value}">
                  <div id="entry-title">${title.value}</div>
                  <div id="time">${time_start.value}-${time_end.value}</div>
                  </div> 
                  `;
                }
                else{ 
                  newListElement.innerHTML = `
                  <div id="event-entry" class="${tag.value}-passed" tag="${tag.value}" time_start= "${time_start.value}" time_end ="${time_end.value}" title = "${title.value}" info = "${info.value}">
                  <div id="entry-title">${title.value}-${time_end.value}</div>
                  <div id="time">${time_start.value}-${time_end.value}</div>
                  </div> 
                  `;
                }
                this.sortEvents();
                editModal.remove();
              }
            });
            deleteButton.addEventListener('click', () => {
              editModal.remove();
              newListElement.remove();
              for (let pair of this.listOfEvents) {
                if(pair[1] === newListElement) {
                  this.listOfEvents.splice(pair, 1);
                }
              }
            });
            this.#shadow.append(editModal);
            
            editModal.style.display="flex";

        });
        }

        /**
         * Documented by Henry
         * Created by Henry and Brendon
         * Sets up modal for new and existing events. Grabs modal and form elements to display and edit
         */
        addNewEvent(object = undefined){
            if(!object){
              let cancel = this.#shadow.querySelector('.event-cancel');
              let confirm = this.#shadow.querySelector('.event-confirm');
              let modal = this.#shadow.querySelector('#modal_add_event');
              let title = this.#shadow.querySelector('#title');
              let time_start = this.#shadow.querySelector('#time_start');
              let time_end = this.#shadow.querySelector('#time_end');
              let tag = this.#shadow.querySelector('#tag');
              let info = this.#shadow.querySelector('#info');
              cancel.addEventListener('click', () => {
                  modal.style.display = "none";
                  title.value ='';
                  time_start.value='';
                  time_end.value='';
                  tag.value='';
                  info.value='';
              }); 
              //confirm currently does not store all the data, make sure to store all the data
              //date and info not saved
              confirm.addEventListener('click', () => {
                if(title.value=='') alert("Missing Title");
                else if(time_start.value=='') alert("Missing Start Time");
                else if(time_end.value=='') alert("Missing End Time");
                else if(time_start.value>time_end.value) alert("End Time cannot be before Start Time");
                else if(tag.value=='') alert("Missing Tag");
                  else {
                    modal.style.display = "none";
                    let newListElement = document.createElement('article');
                    newListElement.className = 'element-entry';
                  //please tell me theres a better way of doing this
                  
                  let curDate = new Date();
                  let eventTime = new Date(document.querySelector('calendar-component').current_utc_time_stamp);
                  console.log(time_end.value);
                  eventTime.setHours(time_end.value.substring(0,2));
                  eventTime.setMinutes(time_end.value.substring(3,5));
                  
                  let event = {
                    "title": title.value,
                    "time_start": time_start.value,
                    "time_end": time_end.value,
                    "tag": tag.value,
                    "info": info.value
                  };
                  // [eventObj, Event HTML Element]
                  this.listOfEvents.push([event, newListElement]);
                  

                  //push event-data to db
                  //call function that loads all events from db into eventlist list
                  if(eventTime>curDate)
                  newListElement.innerHTML = `
                  <div id="event-entry" class="${tag.value}" tag="${tag.value}" time_start= "${time_start.value}" time_end ="${time_end.value}" title = "${title.value}" info = "${info.value}">
                  <div id="entry-title">${title.value}</div>
                  <div id="time">${time_start.value}-${time_end.value}</div>
                  </div> 
                  `;
                  else newListElement.innerHTML = `
                  <div id="event-entry" class="${tag.value}-passed" tag="${tag.value}" time_start= "${time_start.value}" time_end ="${time_end.value}" title = "${title.value}" info = "${info.value}">
                  <div id="entry-title">${title.value}</div>
                  <div id="time">${time_start.value}-${time_end.value}</div>
                  </div> 
                  `;
                  
                  // add edit-onclick functionality to new element
                  this.editEvent(newListElement);
                  this.#event_list.appendChild(newListElement);

                  // resets modal input
                  title.value ='';
                  time_start.value='';
                  time_end.value='';
                  tag.value='';
                  info.value='';
                  this.sortEvents();
                }
              });
            } else {
              let newListElement = document.createElement('article');
              newListElement.innerHTML = `
                  <div id="event-entry" class="${object["tag"]}" tag="${object["tag"]}" time_start= "${object["time_start"]}" time_end ="${object["time_end"]}" title = "${object["title"]}" info = "${object["info"]}">
                  <div id="entry-title">${object["title"]}</div>
                  <div id="time">${object["time_start"]}-${object["time_end"]}</div>
                  </div> 
                  `;
              this.editEvent(newListElement);
              this.#event_list.appendChild(newListElement);
            }
        }
      

      /**
       * Created by Jason
       * @param {Array<Object>} prevListOfEvents 
       */
      loadEvents(prevListOfEvents){
          this.#event_list.innerHTML = '';
          this.listOfEvents = [];
          prevListOfEvents.forEach(event =>{
              this.addNewEvent(event);
          });
      }

      //use flat map
      /**
       * @property {Function} save
       * @returns {Array<Object>}
       * @summary returns array of Event objects to save in database
       */
      save(){
        return this.listOfEvents.map((event) => structuredClone(event[0]));
      }

      clearEvents(){
        this.#event_list.innerHTML = '';
        this.listOfEvents = [];
      }

      /**
      * @property {Function} sortEvents
      * @returns {Array<Object>}
      * @summary sorts list of events 
      */
      sortEvents() {
        // if (this.listOfEvents.length < 2) return;
        this.listOfEvents.sort((a, b) => {
          let timeA_start = a[0]["time_start"].split(':'); //17:04 -> [17, 04]
          let timeB_start = b[0]["time_start"].split(':');

          //check hour
          if (timeA_start[0] > timeB_start[0]) return 1;
          else if (timeA_start[0] == timeB_start[0]) {
            // same hour -> check minutes
            if (timeA_start[1] > timeB_start[1]) return 1;
            else return -1;
          }
          else return -1;
        });

        this.#event_list.innerHTML = '';
        this.listOfEvents.forEach(eventPair => {
          this.#event_list.appendChild(eventPair[1]);
        });

        // Return the sorted list of events
        return this.listOfEvents.map(eventEntry => eventEntry[0]);
      }
     }

    
    customElements.define('event-list-component',EventListItem);