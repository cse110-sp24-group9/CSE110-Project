     //
     export default class TaskListItem extends HTMLElement{
    /**
     * @type {ShadowRoot}
     * @private
     * @property
     * @summary the shadow root of the task item Component
     */
    #shadow
    /**
     * @type {HTMLElement}
     * @property
     * @private
     * @summary the Div that holds the task list
     */
    #task_list
    /**
     * @type {HTMLButtonElement}
     * @property
     * @private
     * @summary the button to add a Task
     */
    #addTaskButton

    constructor(){
        super();
        console.log("custom component");
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */

        const tmpl =  document.getElementById('task-list_template');
        this.#shadow.appendChild(tmpl.content);
        /**
         * @type {HTMLButtonElement}
         */
        console.log(tmpl.id);
        this.#addTaskButton = this.#shadow.querySelector('.addbtn');     
        /**
         * @type {HTMLDivElement}
         */
        this.#task_list = this.#shadow.querySelector(".list");
        console.log(this.#task_list)
        this.#setupButtons();
    }


    #setupButtons(){
        this.#addTaskButton.addEventListener('click', () => {
            var newListElement = document.createElement('article');
            newListElement.className = 'task-entry';
            newListElement.innerHTML = `
                <div class="checkbox">
                    <input type="checkbox">
                    <div class="checkmark"></div>
                </div>
                <input type="text" class="task-text">
                <button class="minusbtn">-</button>
            `;
            this.#task_list.appendChild(newListElement);
          
            const minusbtn = newListElement.querySelector('.minusbtn')
            minusbtn.addEventListener('click', function() {
            newListElement.remove();
        });
        });
    }
    
}
customElements.define('task-list-component',TaskListItem);