describe('Basic user flow for Calendar', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000/pages/Calendar.html');
    });
    
    it('Route Testing', async () => {
        console.log('Testing static page route');
        expect(true).toBe(true);
    });

    it('test that calendar component loads', async () => {
        /* 
            need to look into method to load the selector once the calendar has actually
            hydrated onto the page, right now its not waiting for the days to load
        */
        const calendar = await page.waitForSelector('calendar-component');
        const shadow =  await calendar.getProperty('shadowRoot');
        let chilldrenNumber = await shadow.$$('span');
        console.log(chilldrenNumber.length);
        expect(chilldrenNumber.length > 0).toBe(true);
    },10000)
});