/**
 * @module JournalCardModule
 * The module that holds the JournalCard Component
 */
/**
 * @class
 * @extends {HTMLElement}
 * @alias journalCard-component
 * @author Andrew Pegg, Lance Tran, Girma Terfa
 * @version 1.0.0
 */
export default class JournalCard extends HTMLElement {
    /**
     * The shadow root of the JournalEntry 
     * @type {ShadowRoot}
     * @private
     * @summary the shadow root of the JournalEntry
     * @since 0.1.0
     */
    #shadow
    /**
     * @constructor
     */
    constructor(){
        super();
        /**
         * @type {HTMLTemplateElement}
         */
        this.#shadow = this.attachShadow({mode: "open"});
        const tmpl =  window.document.querySelector('#JournalCardTemplate');
        console.log(tmpl.innerHTML);
        this.#shadow.appendChild(tmpl.content.cloneNode(true));
        console.log('hello from card')
    };
    
    
    /**
     * Called when the .data property is set on this element.
     * @function
     * @param {Object} data
     */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        console.log(this.#shadow.innerHTML);
        this.#shadow.querySelector('#favorite').innerText = data['favorite'] ? '★' : '';
        this.#shadow.querySelector('#title span').innerText = data['title'];
        this.#shadow.querySelector('#emotion').innerText = '😄';
        this.#shadow.querySelector('#preview span').innerText = data['preview-text'];
        const time_string =  new Date(data['time']).toLocaleString('en-US', {hour: "numeric", hour12: true});
        this.#shadow.querySelector('#time span').innerText = time_string;
    }

    /**
     * 
     */
    #initClickListener(){

    }

    /*
        Needs to have ability to favorite and save those changes to the database
        Needs ability to send out needs-edit event to main page, so modal can open to edit this component
        Needs ability to have right click context menu with associated actions
    */
    
}
customElements.define('journal-card-component', JournalCard);