/**
 * Initial Tests Created 5/16/2024
 * Author: Henry Tiet
 */

// To Do
// LATER ONCE DATABASE IS CREATED
// refresh to check save//not possible until we get database
// repeat edting tests after reloading page//not possible yet

describe('Task List Testing', () => {
    
    let page;
    /**
     * Author: Henry Tiet and Jason
     * Update link to github pages when posted
     */
    beforeAll(async () => {
      console.log('Navigating to Tasklist page...');
      page = await browser.newPage();
      await page.goto('http://localhost:3000/pages/JournalApp.html', { waitUntil: 'networkidle2' });
      console.log('Page loaded');
    },60000);

    /**
     * Author: Jason Boenjamin
     * Ensuring task list loads correctly 
     */
    it('Load Tasklist at file', async () => {
        const taskComponent = await page.$('task-list-component');
        const taskListPosition = await page.evaluate(taskComponent => {
            return window.getComputedStyle(taskComponent).top;
        }, taskComponent);
        expect(taskListPosition).toBe('auto');
    },10000);



    /** 
     * Author: Henry Tiet
     * Checking for correct empty task on initialization
     */
    it('Empty Task List', async () => {
        const numTasks = await page.$$eval('task-entry', (numTasks) => {
            return numTasks.length;
        });
        expect(numTasks).toBe(0);
    }, 1000);


    /**
     * Author: Henry Tiet, Jason Boenjamin, Brendon He
     * Checking for correct implementation of adding one task
     */
    it('Add one task', async () => {
        const prevTasks = await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            return shadowRoot.querySelectorAll('.task-entry').length;
        });
        console.log('Previous tasks count:', prevTasks);

        await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            const addButton = shadowRoot.querySelector('.addbtn');
            addButton.click();
        });

        const currTasks = await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            return shadowRoot.querySelectorAll('.task-entry').length;
        });
        console.log('Current tasks count:', currTasks);

        expect(currTasks).toBe(prevTasks + 1);
    }, 10000);


    /**
     * Author: Henry Tiet
     * Adding more tasks
     */
    it('Add more tasks', async () => {
        const prevTasks = await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            return shadowRoot.querySelectorAll('.task-entry').length;
        });
        console.log('Previous tasks count:', prevTasks);

        await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            const addButton = shadowRoot.querySelector('.addbtn');
            addButton.click();
            addButton.click();
        });

        const currTasks = await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            return shadowRoot.querySelectorAll('.task-entry').length;
        });
        console.log('Current tasks count:', currTasks);

        expect(currTasks).toBe(prevTasks + 2);
    }, 10000);

    /**
     * Author: Henry Tiet
     * Checking if edits work
     */
    // it('Edit middle task', async () => {

    //     const textEditHandle =  await page.evaluateHandle(() => {
    //         const taskComponent = document.querySelector('task-list-component');
    //         const shadowRoot = taskComponent.shadowRoot;
    //         const taskList = shadowRoot.querySelectorAll('.task-entry');
    //         return taskList[1].querySelector('.task-text');
    //     });
    //     await textEditHandle.focus();
    //     await textEditHandle.type('Testing');
    //     const newText = await page.evaluate(textEdit => textEdit.value, textEditHandle)
    //     expect(newText).toBe('Testing');
    // }, 10000);
    
     /**
     * Author: Jason Boenjamin
     * Checking if tasks get a strikethrough when checked
     */
     it('Check strike through, properly', async () => {
        const taskComponent = await page.$('task-list-component');
        await page.evaluate(taskComponent => {
            const shadowRoot = taskComponent.shadowRoot;
            const addButton = shadowRoot.querySelector('.addbtn');
            addButton.click();
            const taskText = shadowRoot.querySelector('.task-text');
            const taskCheckbox = shadowRoot.querySelector('.task-checkbox');
            taskText.value = 'Test Task';
            taskCheckbox.click();
        }, taskComponent);
        const isStrikethrough = await page.evaluate(taskComponent => {
            const shadowRoot = taskComponent.shadowRoot;
            const taskText = shadowRoot.querySelector('.task-text');
            return window.getComputedStyle(taskText).textDecoration.includes('line-through');
        }, taskComponent);
        expect(isStrikethrough).toBe(true);
    }, 10000);


    /**
     * Author: Jason Boenjamin
     * Edit already edited task
     */
    // it('Edit already edited task', async () => {
    //     const textEditHandle = await page.$('task-list-component >>> .task-text');
    //     await textEditHandle.focus();
    //     await textEditHandle.type(' More Testing');
    //     const newText = await page.evaluate(textEdit => textEdit.value, textEditHandle);
    //     expect(newText).toBe('Test Task More Testing');
    // }, 10000);

    /**
     * Author: Brendon He
     * Checking if delete works
     */
    it('Delete All Tasks', async () => {
            const deletebtn = await page.$$('task-list-component >>> .minusbtn');
            console.log("here");
            console.log(deletebtn);
            for (const button of deletebtn)
                await button.click();
            //this will find all tasks and delete them

        const currTasks = await page.evaluate(() => {
            const taskComponent = document.querySelector('task-list-component');
            const shadowRoot = taskComponent.shadowRoot;
            return shadowRoot.querySelectorAll('.task-entry').length;
        });
        console.log('Current tasks count:', currTasks);
        expect(currTasks).toBe(0);
    }, 10000);


    /**
     * Author: Brendon He
     * Checking to make sure delete does not affect other tasks
     * Edited by Jason
     */
//     it('Delete Second Tasks, Check to see if 3rd task becomes second', async () => {
//         //find and click the add tasks button 3 times so we have 3 tasks
//         const addbtn = await page.$('task-list-component >>> .addbtn');
//         await addbtn.click();
//         await addbtn.click();
//         await addbtn.click();

//         //from there, type something in all 3 tasks

//         const taskTexts = await page.$$('task-list-component >>> .task-text');
//         await taskTexts[0].type("1st Task");
//         await taskTexts[1].type("2nd Task");
//         await taskTexts[2].type("3rd Task");
        
//         //from here, delete the 2nd task
//         const deletebtn = await page.$$('task-list-component >>> .minusbtn');
//         await deletebtn[1].click();
//         //finally, check if the 1st and 3rd tasks were preserved, and if there are the correct # of tasks
//         const newTasks = await page.$$('task-list-component >>> .task-text');
//         expect(await (await newTasks[0].getProperty('value')).jsonValue()).toBe("1st Task");
//         expect(await (await newTasks[1].getProperty('value')).jsonValue()).toBe("3rd Task");
//         expect(newTasks.length).toBe(2);
// }, 10000);


    /**
     * Author: Jason Boenjamin
     * Closing the page after all tests are done
     */
    afterAll(async () => {
        if (page) {
            await page.close();
        }
    });
    
});



