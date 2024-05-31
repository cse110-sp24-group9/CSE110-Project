/**
 * @module JournalCardModule
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
        const tmpl =  document.getElementById('JournalCard_template');

        this.#shadow.appendChild(tmpl.content);
    };
    
    
    /**
     * Called when the .data property is set on this element.
     * @function
     * @param {Object} data
     */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        const parentArticle = this.#shadow.querySelector('.journal-entry');
        parentArticle.innerHTML = `
        <div id="side-info">
            <div id='favorite'></div>
        </div>
        <div id="main-info">
            <div id="top-info">
                <div id="title">
                    <span>${data.title}</span>
                </div>
                <div id="time">
                    <span>${data.time}</span>
                </div>
            </div>  
            <div id="middle-info">
                <div id="preview">
                    <span>${data.preview}</span>
                </div>
            </div>
            <div id="bottom-info">
                <div id="label-bar">
                    <div id="label">${data.label}</div>
                </div>
                <div id="emotion">${data.emotion}</div>
            </div>
        </div>
        `;
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