/**
 * Initial Tests Created 5/16/2024
 * Author: Henry Tiet
 */

describe('Task List Testing', () => {
    
    /**
     * Author: Henry Tiet and Jason
     * Update link to github pages when posted
     */
    beforeAll(async () => {
      console.log('Navigating to Tasklist page...');
      await page.goto('http://localhost:3000/pages/task-list.html', { waitUntil: 'networkidle2' });
      console.log('Page loaded');
    },60000);
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
     * Checking if edits work
     */
    // it('Edit one task', async () => {
    //     await page.click('')
    // })

    
});

// Testing to do:
// Load task list at TOP of file - Jason
// add more tasks - henry
// edit middle task - henry
// check if strike through properly - JASON
// edit already edited task - Brendon
// delete middle task, ensure it doesn't affect other tasks - Brendon
// close page -LAST TEST - JASON

// LATER ONCE DATABASE IS CREATED
// refresh to check save//not possible until we get database
// repeat edting tests after reloading page//not possible yet
