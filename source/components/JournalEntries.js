/**
 * @module JournalEntriesModule
 */
import JournalCard from "./JournalCard.js";
/**
 * @class
 * @extends {HTMLElement}
 * @alias journalEntries-component
 * @author Andrew Pegg, Lance Tran, Girma Terfa
 * @version 1.0.0
 */
export default class JournalEntries extends HTMLElement {
    /**
     * The shadow root of the JournalEntry 
     * @type {ShadowRoot}
     * @private
     * @summary the shadow root of the JournalEntry
     * @since 0.1.0
     */
    #shadow
    /**
     * @type {Array}
     * @private
     * @summary Has a tuple of json object and element of entries
     * @since 0.1.0
     */
    #entries = [];
    /**
     * @constructor
     */
    constructor(){
        super();
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */
        const tmpl =  document.getElementById('JournalEntries_template');

        this.#shadow.appendChild(tmpl.content);
        this.#initSearchHandler();
        this.#initFilterHandler();
    };
    /**
     * @param {string} entry the json object to be loaded into a journal card
     */
    addEntry(entry){
        const card_ele = document.createElement('journal-card-component');
        card_ele.data = JSON.parse(entry);
        this.#shadow.appendChild(card_ele);
        card_ele.addEventListener('click', (e)=>{
            console.log("Element with time of: " + JSON.parse(entry)['time']);
        })
        this.#entries.push([JSON.parse(entry),card_ele])
        console.log(this.#entries[this.#entries.length-1]);
        this.#shadow.getElementById('info-b').textContent = this.#entries.length + " Entries"
    }
    /**
     * This function is responsible for subscribing to the input field, to filter journal entries by finding what entries have the same/contains the search for string
     * @private
     * @property {Function} initSearchHandler
     * @returns {void}
     * @summary creates the filter handler for the journal component
     */
    #initSearchHandler(){
        // Get list of entries and subscribe to Search bar text input
        // Each element of array is of the form: [JSON object, journal-card-component element]
        const listOfEntries = this.#entries;
        const searchInput = document.querySelector('#search-bar').querySelector('input[type="text"]');

        // Dynamically listen to input and HIDE entries that do NOT match user input
        function handleInputEvent(event) {
            const userInput = event.target.value;
            for (let pair of listOfEntries) {
                const currTitle = pair[0]['title'].toLowerCase();
                const currEle = pair[1];
                if(!(currTitle.includes(userInput.toLowerCase()))) {
                    currEle.setAttribute("style", "display: none");
                }
                else {
                    currEle.toggleAttribute("style");
                }
            }
        }

        searchInput.addEventListener('input', handleInputEvent);
    }

    /**
     * This function filters journal entries by subscribing to journal entries tag check boxes
     * @private
     * @property {Function} initFilterHandler
     * @returns {void}
     * @summary filters entries based on tags selected
     */
    #initFilterHandler(){
        // TODO
    }
    
}
customElements.define('journal-entries-component', JournalEntries);