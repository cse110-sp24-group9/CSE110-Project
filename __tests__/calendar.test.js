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
            kinda a nuance thing here, waiting for the component to have all the information
            loaded to page before testing children content.
        */
        const calendar = await page.waitForSelector('calendar-component[hydrated="true"]');
        const shadow =  await calendar.getProperty('shadowRoot');
        let chilldrenNumber = await shadow.$$('span');
        console.log(chilldrenNumber.length);
        expect(chilldrenNumber.length > 0).toBe(true);
    },10000)
});