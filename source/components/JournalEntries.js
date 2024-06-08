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
     * tag map trueness
     * @type {Object}
     * @private
     * @summary holds tags and says whether they are enabled or not
     */
    #tag_map = {};
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
     * @param {Object} entry the json object to be loaded into a journal card
     */
    addEntry(entry){
        let hoist = this;
        const card_ele = document.createElement('journal-card-component');
        card_ele.data = entry;
        const journal_list = this.#shadow.querySelector("#journal-list");
        journal_list.appendChild(card_ele);
        card_ele.addEventListener('click', (e)=>{
            hoist.#submitJournalClickEvent(entry['time']);
            console.log("Element with time of: " + entry['time']);
        });
        this.#entries.push([entry,card_ele])
        console.log(this.#entries[this.#entries.length-1]);
        this.#shadow.getElementById('info-b').textContent = this.#entries.length + " Entries Total"
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
        let dropdown_list = document.querySelectorAll('#dropdown-content div > input');
        for(let check_box of dropdown_list){
            this.#tag_map[check_box.value] = check_box.checked;
            let hoist = this;
            check_box.addEventListener('change',function(){
                if(this.checked){
                    console.log("checkbox: " + check_box.value + " : was checked" )
                }else{
                    console.log("checkbox: " + check_box.value + " : was unchecked" )
                }
                hoist.#tag_map[check_box.value] = check_box.checked;
                hoist.#filterJournalEntriesByTags();
            })
        }
    }
    /**
     * @private
     * @property {Function} filterJournalEntriesByTags
     * @returns {void}
     * @summary filters entries off of the selected tags
     */
    #filterJournalEntriesByTags(){
        let listOfEntries = this.#entries;
        for (let pair of listOfEntries) {
            const tagTupleList = pair[0]['tags']
            const currEle = pair[1];
            let tag_true = false;
            for(let tag_pair of tagTupleList){
                if(this.#tag_map[tag_pair[0]]){
                    currEle.toggleAttribute("style");
                    tag_true = true;
                    break;
                }
            }
            if(!tag_true)
                currEle.setAttribute("style", "display: none");
        }
    }
    /**
     * @private 
     * @property {Function} submitJournalClickEvent
     * @param {number} time_stamp 
     * @returns {void}
     * @fires  JournalEntries#journal-clicked
     */
    #submitJournalClickEvent(time_stamp){
        let event = new CustomEvent('journal-clicked', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {time: time_stamp}
        });
        this.dispatchEvent(event);
    }
    /**
     * @property {Function} clearEntries
     * @returns {void}
     * @summary clears all entries from the journal list
     */
    clearEntries(){
        for(let entry of this.#entries){
            this.#shadow.querySelector('#journal-list').removeChild(entry[1]);
        }
        this.#entries = [];
        this.#shadow.getElementById('info-b').textContent = "0 Entries Total";
    }

    /**
     * @property {Function} saveEntries
     * @returns {Array}
     * @summary returns array of Journal Entry objects to save in database
     */
    saveEntries(){
        const listOfEntryObjects = [];
        for(let entry of this.#entries){
            listOfEntryObjects.push(structuredClone(entry[0]));
        }
        return listOfEntryObjects;
    }
}
customElements.define('journal-entries-component', JournalEntries);


/* 
`
    {
        "title": "str",
        "tags": [["cse110", "green"]],
        "favorite": true,
        "time": 1717189743759,
        "preview-text": "Hello this is a preview",
        "emotion": "😄"
    }
`

 */