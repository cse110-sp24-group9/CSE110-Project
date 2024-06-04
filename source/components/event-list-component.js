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
            this.#addEventButton = this.#shadow.querySelector('#addEventsButton');     
            /**
             * @type {HTMLDivElement}
             */
            this.#event_list = this.#shadow.querySelector("#displayEvents");

            let modal = document.createElement('div');
            modal.setAttribute('id', 'modal');
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
            let modal = this.#shadow.querySelector('#modal');
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
                    <!-- Add more tags as needed -->
                </select>
              </article>
              <article id="input-info">
                <label for="info">Information</label>
                <textarea id="info"></textarea>
              </article>
              <article id="input-accept">
                <button type="button" class="event-cancel">x</button>
                <button type="button" class="event-confirm">✓</button>
              </article>
            </form>
          `;
          modal.style.display = "none";
        }


        setUpaddEventButton(){
            this.#addEventButton.addEventListener('click', () => {
                let modal = this.#shadow.querySelector('#modal');
                modal.style.display = "flex";
            });
        }

        setUpCancelAndConfirm(){
            let cancel = this.#shadow.querySelector('.event-cancel');
            let confirm = this.#shadow.querySelector('.event-confirm');
            let modal = this.#shadow.querySelector('#modal');
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