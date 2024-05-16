describe('Basic user flow for Calendar', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/source/pages/Calendar.html');
    });
    
    it('Testing', async () => {
        console.log('Testing...');
        expect(true).toBe(true);
    });
});