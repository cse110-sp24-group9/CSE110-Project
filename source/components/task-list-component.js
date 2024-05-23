     /*
     Outline of template made by Brendon He
     Documentation done by Henry Tiet and Jason Boenjamin
     */
     
     export default class TaskListItem extends HTMLElement{
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
    #task_list
    /**
     * @type {HTMLButtonElement}
     * @private
     * @summary the button to add a Task
     */
    #addTaskButton

    /**
     * Documented by Henry Tiet
     * Constructs the shadow tree with fixed nodes of add task 
     * and the list
     */
    constructor(){
        super();
        console.log("custom component");
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */

        const tmpl =  document.getElementById('task-list_template');
        /**
         * Documented by Henry
         * Appends the template to shadow
         */
        this.#shadow.appendChild(tmpl.content.cloneNode(true));
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

    /*
     * Documented by Jason
     * Converted the old Javascript into a template
     * Pulled old code and incorporated shadow dom into a template
    */ 
    #setupButtons(){
        /**
         * Documented and added by Jason
         * initializes the add task button from previous js file
         */
        this.#addTaskButton.addEventListener('click', () => {
            var newListElement = document.createElement('article');
            newListElement.className = 'task-entry';
            newListElement.innerHTML = `
                <div class="checkbox">
                    <input type="checkbox" class="task-checkbox">
                    <div class="checkmark"></div>
                </div>
                <input type="text" class="task-text">
                <button class="minusbtn">-</button>
            `;
            this.#task_list.appendChild(newListElement);
            
            /**
             * Documented by Jason
             * Initializes the minus button to remove tasks
             */
            const minusbtn = newListElement.querySelector('.minusbtn')
            minusbtn.addEventListener('click', function() {
                newListElement.remove();
            });

            /* Author : Henry Tiet
                Adjusting class calls
            */
            // const checkbox = newListElement.querySelector('input[type=checkbox]');
            const checkbox = newListElement.querySelector('.task-checkbox');
            const textEntry = newListElement.querySelector('.task-text');
            
            /**
             * Documented by Jason
             * adds an event listener to do the strikethrough through each tasked checked
             * switched the parameter from 'input' to 'change' and used the .classlist to add
             */
            checkbox.addEventListener('change', function() {
                if(checkbox.checked) {
                  textEntry.classList.add('strikethrough');
                } else {
                  textEntry.classList.remove('strikethrough');
                }
            });
          });
        
    }
    
}
customElements.define('task-list-component',TaskListItem);
        