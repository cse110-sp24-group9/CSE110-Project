/**
 * @module CalendarModule
 * The module that houses the Calendar Component
 */

let date = new Date(), // getting new date, current year and month
currentDay = date.getDate(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing String names of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

/**
 * The Calendar web component implementation file
 * @author Andrew Pegg
 * @alias calendar-component
 * @extends {HTMLElement}
 * @version 0.1.1
 * @type {CalendarItem}
 * @summary the calendar web component js implementation class
 * @class
 */              
export default class CalendarItem extends HTMLElement{
    /**
     * The shadow root of the calendarItem 
     * @type {ShadowRoot}
     * @private
     * @summary the shadow root of the Calendar Component
     * @since 0.1.0
     */
    #shadow
    /**
     * The grid html element that holds the days 
     * @type {HTMLElement}
     * @private
     * @summary the html grid for the days of the month
     * @since 0.1.0
     */
    #daysGrid
    /**
     * Title element of the calendar for now
     * @type {HTMLElement}
     * @private
     * @summary the text element for the title of the calendar specify the month and year
     * @since 0.1.0
     */
    #currentDate
    /**
     * @type {HTMLButtonElement}
     * @private
     * @summary the buttons that allow for the generation of the previous and next month
     * @since 0.1.0
     */
    #prevNextIcon
    /**
     * This event is responsible for informing the front end that a new day has been selected
     * This event contains a detail with the utc string of the day selected
     * @event CalendarItem#day-changed-event
     * @type {CustomEvent}
     * @property {number} time
     */
    /**
     * This event is responsible for letting the page know that the calendar item has loaded
     * The custom information onto the page
     * @event CalendarItem#hydrated
     * @type {CustomEvent}
     * @summary listen to event to see if custom component is ready
     */
    /**
     * @since 0.1.0
     * @author Andrew Pegg
     * @summary Creates, renders, and sets up interactability with the calendar component
     * @since 0.1.0
     */
    constructor(){
        super();
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */
        const tmpl =  document.getElementById('calendar_template');

        this.#shadow.appendChild(tmpl.content);
        this.#daysGrid = this.#shadow.querySelector('.day_grid');
        this.#currentDate = this.#shadow.querySelector(".title_bar span");
        this.#prevNextIcon = this.#shadow.querySelectorAll(".title_bar button");

        this.#renderCalendar();
        this.#setupButtons();
        //tells page that calendar should be ready to test
        this.#dispatchCustomEvent(new CustomEvent('hydrated',{
            bubbles: true,
            composed: true
        }));
    }
    /**
     * The function responsible for rendering the days to screen by adding span items to the day grid
     * Days from the previous month are marked with inactive tag, as well as, the days for next month
     * @function
     * @private
     * @alias renderCalendar
     * @summary renders the calendar to the screen
     * @since 0.1.0
     */
    #renderCalendar() { 
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month, in terms of week days
        // zero indexed, ie 0 = sun, 1 = mon ... 6 = sat
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month, ie 31
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month, ie what week day
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let spanList = []; //houses all newly created HTML elements

        // creating span elements of previous month prefix days of this month
        for (let i = firstDayofMonth; i > 0; i--) { 
            /** @type {HTMLSpanElement} */
            let dayEle = document.createElement('span');
            dayEle.className = "inactive";
            dayEle.innerText = (lastDateofLastMonth - i + 1);
            /**
             * @fires calendar-component#day-changed-event
             */
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
                let event = new CustomEvent('day-changed-event', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {time: new Date(currYear,currMonth,-i+1).valueOf()}
                });
                this.#dispatchCustomEvent(event);
            }
            spanList.push(dayEle);
        }


        let isCorrectMonth = currMonth === new Date().getMonth();
        let isCorrectYear = currYear === new Date().getFullYear();
        // create all days of the current month in span elements
        for (let i = 1; i <= lastDateofMonth; i++) { 
            let isToday = i === currentDay && isCorrectMonth
                        && isCorrectYear ? "active" : "currMonth";
            // if the users current date matches above date then give it the active class
            let dayEle = document.createElement('span');
            dayEle.className = isToday;
            dayEle.innerText = (i);
            /**
             * @fires CalendarItem#day-changed-event
             */
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
                let event = new CustomEvent('day-changed-event', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {time: new Date(currYear,currMonth,i).valueOf()}
                });
                this.#dispatchCustomEvent(event);
            }
            spanList.push(dayEle);
        }
        // creating spans of next months suffix days of this current month
        for (let i = lastDayofMonth; i < 6; i++) {
            let dayEle = document.createElement('span');
            dayEle.className = "inactive";
            dayEle.innerText = (i - lastDayofMonth + 1);
            /**
             * @fires CalendarItem#day-changed-event
             */
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
                let event = new CustomEvent('day-changed-event', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {time: new Date(currYear,currMonth+1,i - lastDayofMonth + 1).valueOf()}
                });
                this.#dispatchCustomEvent(event);
            }
            spanList.push(dayEle);
        }
        // Replace Old date text with the newly updated date
        this.#currentDate.innerText = `${months[currMonth]} ${currYear}`; 
        // animation toggle, making sure if animation loading was playing before it is removed before we unload the calendar
        if(this.#daysGrid.classList.contains("loadingIn")){ 
            this.#daysGrid.classList.remove("loadingIn");
        }
        // start the loading animation 
        this.#daysGrid.classList.add("loading"); 
        //update event listener to render the span list to the calendar grid, once the load out animation ended
        this.#daysGrid.onanimationend = () => {
            if(this.#daysGrid.classList.contains("loading")){
                this.#daysGrid.replaceChildren();
                spanList.forEach((ele) => this.#daysGrid.appendChild(ele));
                this.#daysGrid.classList.toggle("loading");
                this.#daysGrid.classList.add("loadingIn");
            }
        }
    }
    /**
     * @private
     * @function
     * @author Andrew Pegg
     * @alias setupButtons
     * @summary sets up the buttons so that once clicked they update the calendar in the direction they are assigned to
     * @since 0.1.0
     */
    #setupButtons(){
        this.#prevNextIcon.forEach(icon => { // getting prev and next icons
            icon.addEventListener("click", () => { // adding click event on both icons
                // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
                currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
                if(currMonth < 0 || currMonth > 11) { // roll over, and update year and month information
                    date = new Date(currYear, currMonth, new Date().getDate());
                    currYear = date.getFullYear(); // updating current year with new date year
                    currMonth = date.getMonth(); // updating current month with new date month
                } else {
                    // seems redundant, should be able to just removed this
                    date = new Date(); 
                }
                this.#renderCalendar(); // calling renderCalendar function, with updated dates
            });
        });
    }
    /**
     * 
     * @param {CustomEvent} event the event to be dispatched by this web component
     */
    #dispatchCustomEvent(event){
        this.dispatchEvent(event);
    }
}

customElements.define('calendar-component',CalendarItem);