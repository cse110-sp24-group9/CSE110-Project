describe('Basic user flow for Calendar', () => {
    let calendar;

    beforeAll(async () => {
        await page.goto('http://localhost:3000/pages/Calendar.html');
        calendar = await page.$('calendar-component');
    });

    // ***** TEST CASES *****
    
    // should load the calendar
    it('should load the calendar', async () => {
        expect(calendar).not.toBeNull();
    });

    // calendar month goes forward when clicking right arrow
    it('should go to the next month when clicking the right arrow', async () => {
        // TODO: Implement test to check if calendar goes to the next month
    });

    // calendar month goes backward when clicking left arrow
    it('should go to the previous month when clicking the left arrow', async () => {
        // TODO: Implement test to check if calendar goes to the previous month
    });

    // year increases by 1 after December
    it('should increase the year by 1 after December', async () => {
        // TODO: Implement test to check if the year increases by 1 after December
    });

    // year decreases by 1 before January
    it('should decrease the year by 1 before January', async () => {
        // TODO: Implement test to check if the year decreases by 1 before January
    });

    // current day is highlighted
    it('should highlight the current day', async () => {
        // TODO: Implement test to check if the current day is highlighted
    });

    // hovering over a day highlights it
    it('should highlight a day when hovering over it', async () => {
        // TODO: Implement test to check if hovering over a day highlights it
    });

    // correct number of active days
    it('should display the correct number of active days', async () => {
        // TODO: Implement test to check if the calendar displays the correct number of active days
    });

    // first day in correct day of week position
    it('should have the first day in the correct day of the week position', async () => {
        // TODO: Implement test to check if the first day is in the correct day of the week position
    });

    // last day in correct day of week position
    it('should have the last day in the correct day of the week position', async () => {
        // TODO: Implement test to check if the last day is in the correct day of the week position
    });

    // should handle navigation boundary when changing between months at last day
    it('should handle navigation boundary correctly when changing between months at the last day', async () => {
        // TODO: Implement test to check navigation boundary when changing months at the last day
    });

    // // check styling
    // it('should apply correct styling to the calendar', async () => {
    //     // TODO: Implement test to check the styling of the calendar
    // });

    it('Testing', async () => {
        console.log('Testing...');
        expect(true).toBe(true);
    });
});
