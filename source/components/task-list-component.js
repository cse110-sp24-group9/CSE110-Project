//not used yet, as I don't think it works, and is also not in the task-list html yet
export default class TaskListComponent extends HTMLElement{
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
     * @summary the text element to write the Task
     */
    #addTaskButton


    constructor(){
        super();
        this.#shadow = this.attachShadow({mode: "open"});
        /**
         * @type {HTMLTemplateElement}
         */
        const tmpl =  document.getElementById('tasklist-template');
        this.#shadow.appendChild(tmpl.content);
        /**
         * @type {HTMLButtonElement}
         */
        this.#addTaskButton = this.#shadow.querySelector('.AddTask');

                /**
         * @type {HTMLDivElement}
         */
                this.#task_list = this.#shadow.querySelector(".list");
        
        this.#setUpList();
        this.#setupButtons();
    }

    #setUpList(){
        //will have to set up how the list itself works
    }
    //set up the add task button
    #setupButtons(){
        this.#addTaskButton.addEventListener('click', () => {
            createNewTask();
            listElement.insertAdjacentHTML('beforeend', taskElement);
            i++;
        });
    }
}