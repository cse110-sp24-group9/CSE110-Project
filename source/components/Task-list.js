     /*
     Outline of template made by Brendon He
     Documentation done by:
      - Henry Tiet
      - Jason Boenjamin
      - Drew Lara
     */
     
    export default class TaskListItem extends HTMLElement {
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
         * @type {Array} (added by Jason)
         * @private
         * @summary the array to hold task objects
         */
        tasks = [];

        /**
         * Created by Brendon
         * Documented by Henry Tiet 
         * Constructs the shadow tree with fixed nodes of add task 
         * and the list
         */
        constructor(){
            super();

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

            this.#addTaskButton = this.#shadow.querySelector('.addbtn');     
            /**
             * @type {HTMLDivElement}
             */
            this.#task_list = this.#shadow.querySelector("#list");
            this.#setupButtons();
        }

        /**
         * Created by Brendon
         * Edited by Jason to work with DB
         * @param {Object} taskData 
         * @returns newListElement
         */
        createTaskElement(taskData){
            let newListElement = document.createElement('article');
            newListElement.className = 'task-entry';
            newListElement.innerHTML = `
            <div class="checkbox">
                <input type="checkbox" class="task-checkbox">
                <div class="checkmark"></div>
            </div>
            <input type="text" class="task-text" readonly="true">
            <button class="minusbtn">-</button>
            `;
            /**
             * Documented by Jason
             * Created by Brendon
             * Initializes the minus button to remove tasks
             */
            const minusbtn = newListElement.querySelector('.minusbtn');
            minusbtn.addEventListener('click', ()=> {
                newListElement.remove();
            });

            /* Author : Henry Tiet
                Adjusting class calls
            */
            const checkbox = newListElement.querySelector('.task-checkbox');
            const textEntry = newListElement.querySelector('.task-text');
            textEntry.value = taskData['title'];
            checkbox.checked = taskData['checkbox'];
            if(checkbox.checked) {
                textEntry.classList.add('strikethrough');
            }
            
            /**
             * Documented by Jason
             * adds an event listener to do the strikethrough through each tasked checked
             * switched the parameter from 'input' to 'change' and used the .classlist to add
             */
            checkbox.addEventListener('change', () => {
                if(checkbox.checked) {
                    textEntry.classList.add('strikethrough');
                } else {
                    textEntry.classList.remove('strikethrough');
                }
            });

            /**
             * Documented by Drew
             * Allows user to edit tasklist title by double clicking
             * on text area,
             * tasklist will show up as selected
             */
            textEntry.addEventListener('dblclick', () => {
                textEntry.readOnly = false;
                textEntry.style.backgroundColor ='white';
                textEntry.style.cursor = 'text';
            })
            /**
             * Documented by Drew
             * Once user is done editing tasklist title,
             * show tasklist item as unselected
             */
            textEntry.addEventListener('focusout', () => {
                textEntry.readOnly = true;
                textEntry.style.backgroundColor='';
                textEntry.style.cursor = 'grab';
            });

            return newListElement;
        }

        /**
         * Documented and Authored by Andrew
         * @param {Object} object the object that needs to be loaded into the page, by default is undefined
         */
        createTask(object = undefined){
            if(!object){
                const newTaskData = {title: '', checkbox: false};
                const newListElement = this.createTaskElement(newTaskData);
                this.#task_list.appendChild(newListElement);
                this.tasks.push([newTaskData,newListElement]);
                const check_box = newListElement.querySelector(".task-checkbox");
                check_box.addEventListener('change',()=>{
                    for(let entry of this.tasks){
                        if(entry[1] === newListElement){
                            entry[0]['checkbox'] = check_box.checked;
                            console.log('task-list dispatch 1');
                            window.dispatchEvent(new Event('data-updated', {
                                bubbles: true,
                                composed: true,
                                cancelable: false
                            }));
                        }
                    }
                });
                const text_input = newListElement.querySelector('.task-text');
                text_input.addEventListener('input', (event) => {
                    for(let entry of this.tasks){
                        if(entry[1] === newListElement){
                            entry[0]['title'] = event.target.value;
                            console.log('task-list dispatch 2');
                            window.dispatchEvent(new Event('data-updated', {
                                bubbles: true,
                                composed: true,
                                cancelable: false
                            }));
                        }
                    }
                });
                const remove_button = newListElement.querySelector('.minusbtn');
                remove_button.addEventListener('click',()=>{
                    let index = -1;
                    for(let i = 0; i < this.tasks.length; i++){
                        if(this.tasks[i][1] === newListElement){
                            index = i;
                            break;
                        }
                    }
                    if(index >= 0){
                        this.tasks.splice(index,1);
                        console.log('task-list dispatch 3');
                        window.dispatchEvent(new Event('data-updated', {
                            bubbles: true,
                            composed: true,
                            cancelable: false
                        }));
                    }
                })
            }else{
                const newListElement = this.createTaskElement(object);
                this.#task_list.appendChild(newListElement);
                this.tasks.push([object,newListElement]);
                const check_box = newListElement.querySelector(".task-checkbox");
                check_box.addEventListener('change',()=>{
                    for(let entry of this.tasks){
                        if(entry[1] === newListElement){
                            entry[0]['checkbox'] = check_box.checked;
                            window.dispatchEvent(new Event('data-updated', {
                                bubbles: true,
                                composed: true,
                                cancelable: false
                            }));
                            break;
                        }
                    }
                });
                const text_input = newListElement.querySelector('.task-text');
                text_input.addEventListener('input', (event) => {
                    for(let entry of this.tasks){
                        if(entry[1] === newListElement){
                            entry[0]['title'] = event.target.value;
                            window.dispatchEvent(new Event('data-updated', {
                                bubbles: true,
                                composed: true,
                                cancelable: false
                            }));
                            break;
                        }
                    }
                });
                const remove_button = newListElement.querySelector('.minusbtn');
                remove_button.addEventListener('click',()=>{
                    let index = -1;
                    for(let i = 0; i < this.tasks.length; i++){
                        if(this.tasks[i][1] === newListElement){
                            index = i;
                            break;
                        }
                    }
                    if(index >= 0){
                        this.tasks.splice(index,1);
                        window.dispatchEvent(new Event('data-updated', {
                            bubbles: true,
                            composed: true,
                            cancelable: false
                        }));
                    }
                })
            }
        }
    
        /*
         * Documented by Jason
         * Created by Brendon
         * Converted the old Javascript into a template
         * Pulled old code and incorporated shadow dom into a template
        */ 
        #setupButtons(){
            /**
             * Documented and added by Jason
             * initializes the add task button from previous js file
             */
            this.#addTaskButton.addEventListener('click', ()=>{
                this.createTask();
            });
        }
        
        /**
         * Created by Jason
         * Clears tasks
         */
        clearTasks(){
            this.#task_list.innerHTML = '';
            this.tasks = [];
        }

        /**
         * Created by Jason
         * @param {Array<Object>} tasks 
         */
        loadTasks(tasks){
            this.#task_list.innerHTML = '';
            this.tasks = [];
            tasks.forEach(taskData =>{
                this.createTask(taskData);
            });
        }

        /**
         * created by Jason, edited by Andrew
         * @returns {Array<Object>}
         */
        save(){
            return this.tasks.map((entry) => structuredClone(entry[0]));
        }
}

customElements.define('task-list-component', TaskListItem);