/**
 * Initial Tests Created 5/16/2024
 * Author: Henry Tiet
 */

describe('Task List Testing', () => {
    
    /**
     * Author: Henry Tiet
     * Update link to github pages when posted
     */
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/CSE110-Project/source/pages/task-list.html');
    });

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
     * Author: Henry Tiet
     * Checking for correct implementation of adding one task
     */
    it('Add one task', async () => {
        await page.click('#addTaskButton');
        const numTasks = await page.$$eval('task-entry', (numTasks) => {
            return numTasks.length;
        });
        expect(numTasks).toBe(1);
    }, 10000);
});