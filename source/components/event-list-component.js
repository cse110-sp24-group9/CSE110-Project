     /*
     Outline of template made by Brendon He
     Documentation done by:
      - Henry Tiet
      - Jason Boenjamin
     */
     
      export default class EventListItem extends HTMLElement{
        /**
         * @type {HTMLElement}
         * @private
         * @summary the Div that holds all of the events
         */
        #displayEvents
        /**
         * @type {HTMLButtonElement}
         * @private
         * @summary the button to add an event
         */
        #addEventButton
        constructor(){
            super();
            console.log("custom component");
            this.shadow = this.attachShadow({mode: "open"});
             /**
             * @type {HTMLTemplateElement}
             */
             const tmpl =  document.getElementById('event-list_template');
            /**
             * Documented by Henry
             * Appends the template to shadow
             */
            this.shadow.appendChild(tmpl.content.cloneNode(true));
            /**
             * @type {HTMLButtonElement}
             */
            console.log(tmpl.id);
            this.#addEventButton = this.shadow.querySelector('#add-event-button');  

            //create each html element in the event list
            
            let modal = document.createElement('div');

            //append all elements
            this.shadow.append(modal);

            //set up each part
            this.setUpModal();
            this.setUpaddEventButton();
            this.setUpCancelandConfirm();
        }
        setUpModal(){
            modal.innerHTML=`<div id="modal">
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
                <button type="button" class="cancel">x</button>
                <button type="submit" class="confirm">✓</button>
              </article>
            </form>
          </div>`;
          modal.style.display = "none";
        }
        
        setUpaddEventButton(){
            this.addEventButton.addEventListener('click', () => {
                modal.style.display = "flex";
            });
        }
        setUpCancelandConfirm() {
            const cancelButton = modal.querySelector('.cancel')
                cancelButton.addEventListener('click', function() {
                    modal.style.display = "hide";
                });
            const confirmButton = modal.querySelector('.confirm')
                confirmButton.addEventListener('click', function() {
                    modal.style.display = "hide";
                });
        }
    }

    customElements.define('event-list-component',EventListItem);