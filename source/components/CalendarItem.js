let date = new Date(), // getting new date, current year and month
currentDay = date.getDate(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing String names of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

/**
 * @author Andrew Pegg
 * @alias calendar-component
 * @extends {HTMLElement}
 * @since 0.0.0
 * @version 0.1.0
 * @type {CalendarItem}
 * @summary the calendar web component js implementation class
 * @module
 */              
export default class CalendarItem extends HTMLElement{
    /**
     * @type {ShadowRoot}
     * @private
     * @property
     * @summary the shadow root of the Calendar Component
     */
    #shadow
    /**
     * @type {HTMLElement}
     * @property
     * @private
     * @summary the html grid for the days of the month
     */
    #daysGrid
    /**
     * @type {HTMLElement}
     * @property
     * @private
     * @summary the text element for the title of the calendar specify the month and year
     */
    #currentDate
    /**
     * @type {HTMLButtonElement}
     * @property
     * @private
     * @summary the buttons that allow for the generation of the previous and next month
     */
    #prevNextIcon
    /**
     * @constructor
     * @version 0.1.0
     * @author Andrew Pegg
     * @summary Creates, renders, and sets up interactability with the calendar component
     */
    constructor(){
        super();
        console.log("custom component");
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */
        const tmpl =  document.getElementById('calendar_template');
        this.#shadow.appendChild(tmpl.content);
        /**
         * @type {HTMLElement}
         */
        this.#daysGrid = this.#shadow.querySelector('.day_grid');
        /**
         * @type {HTMLElement}
         */
        this.#currentDate = this.#shadow.querySelector(".title_bar span");
        
        /**
         * @type {NodeListOf.HTMLElement}
         */
        this.#prevNextIcon = this.#shadow.querySelectorAll(".title_bar button");
        
        this.renderCalendar();
        this.setupButtons();
    }
    /**
     * @function
     * @public
     * @name renderCalendar
     * @summary renders the calendar to the screen
     */
    renderCalendar() { 
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
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
            }
            spanList.push(dayEle);
        }


        let isCorrectMonth = currMonth === new Date().getMonth();
        let isCorrectYear = currYear === new Date().getFullYear();
        // create all days of the current month in span elements
        for (let i = 1; i <= lastDateofMonth; i++) { 
            let isToday = i === currentDay && isCorrectMonth
                        && isCorrectYear ? "active" : "";
            // if the users current date matches above date then give it the active class
            let dayEle = document.createElement('span');
            dayEle.className = isToday;
            dayEle.innerText = (i);
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
            }
            spanList.push(dayEle);
        }
        // creating spans of next months suffix days of this current month
        for (let i = lastDayofMonth; i < 6; i++) {
            let dayEle = document.createElement('span');
            dayEle.className = "inactive";
            dayEle.innerText = (i - lastDayofMonth + 1);
            dayEle.onclick = () => {
                let activeEle = this.#shadow.querySelector(".selected");
                if(activeEle){
                    activeEle.classList.toggle('selected');
                }
                dayEle.classList.add('selected');
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
    setupButtons(){
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
                this.renderCalendar(); // calling renderCalendar function, with updated dates
            });
        });
    }
    
}

customElements.define('calendar-component',CalendarItem);