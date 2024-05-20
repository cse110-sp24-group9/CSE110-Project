describe('Basic user flow for Calendar', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000/pages/Calendar.html');
    });
    
    // ***** TEST CASES *****
    // calendar month goes forward when clicking right arrow
    // calendar month goes backward when click left arrow
    // year increases by 1 after December
    // year decreases by 1 before January
    // current day is highlighted
    // hovering over a day highlights it

    // correct number of active days
    // first day in correct day of week position
    // last day in correct day of week position
    // should load the calendar
    // should handle navigation boundary /// changing between months at last day
    // styling

    it('Testing', async () => {
        console.log('Testing...');
        expect(true).toBe(true);
    });
});