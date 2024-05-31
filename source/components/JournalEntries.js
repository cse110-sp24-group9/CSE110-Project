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
    }
    /**
     * This function is responsible for subscribing to the input field, to filter journal entries by finding what entries have the same/contains the search for string
     * @private
     * @property {Function} initSearchHandler
     * @returns {void}
     * @summary creates the filter handler for the journal component
     * 1: grab input text listener line 154 journal app
     * 2: listen to input when value changes
     * 3: grab string from it
     * 4: loop through #entries and get title from obj
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
     * 5: if false -> js inline styling (independent of css), verbatim: card_ele.setAttribute("style","display: none;")
     *    if true -> card_ele.toggleAttribute("style") https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute
     * 
     */
    #initSearchHandler(){
        // TODO
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