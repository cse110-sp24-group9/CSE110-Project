describe('Basic user flow for Calendar', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000/pages/Calendar.html');
    });
    
    it('Testing', async () => {
        console.log('Testing...');
        expect(true).toBe(true);
    });
});