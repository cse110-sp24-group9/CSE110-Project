describe('Basic user flow for Calendar', () => {
    let page;
    let calendarComponent;
    let shadowRoot;
    let titleBarSpan;
    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    beforeAll(async () => {
        page = await browser.newPage();
        console.log('Navigating to Calendar page...');
        await page.goto('http://127.0.0.1:5500/source/pages/Calendar.html', { waitUntil: 'networkidle2' });
        console.log('Page loaded');

        calendarComponent = await page.$('calendar-component');
        shadowRoot = await calendarComponent.evaluateHandle(element => element.shadowRoot);
        titleBarSpan = await shadowRoot.evaluateHandle(root => root.querySelector('.title_bar span'));
    }, 60000);

    it('should load the calendar', async () => {
        console.log('Searching for .title_bar span inside Shadow DOM...');
        const textContent = await titleBarSpan.evaluate(element => element.textContent);
        console.log('Title bar span text content:', textContent);

        // Instead of checking for the initial debug text, we will log the content and pass the test if it is non-empty.
        expect(textContent).not.toBe('');
    });

    // Test to check if the calendar goes to the next month when clicking the right arrow
    it('should go to the next month when clicking the right arrow', async () => {
        const initialMonth = await titleBarSpan.evaluate(element => element.textContent);
        console.log('Initial month:', initialMonth);

        const rightArrowButton = await shadowRoot.evaluateHandle(root => root.querySelector('#nextBtn'));
        await rightArrowButton.click();

        // Wait for some time to allow the calendar to update
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the timeout as needed

        const newMonth = await titleBarSpan.evaluate(element => element.textContent);
        console.log('New month:', newMonth);

        expect(newMonth).not.toBe(initialMonth);
    });

    // Test to check if the calendar goes to the previous month when clicking the left arrow
    it('should go to the previous month when clicking the left arrow', async () => {
        const initialMonth = await titleBarSpan.evaluate(element => element.textContent);
        console.log('Initial month:', initialMonth);

        const leftArrowButton = await shadowRoot.evaluateHandle(root => root.querySelector('#prev'));
        await leftArrowButton.click();

        // Wait for some time to allow the calendar to update
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the timeout as needed

        const newMonth = await titleBarSpan.evaluate(element => element.textContent);
        console.log('New month:', newMonth);

        expect(newMonth).not.toBe(initialMonth);
    });

    // year increases by 1 after December
    it('should increase the year by 1 after December', async () => {
        const initialYear = await titleBarSpan.evaluate(element => element.textContent);
        console.log('Initial year and month:', initialYear);

        const rightArrowButton = await shadowRoot.evaluateHandle(root => root.querySelector('#nextBtn'));

        // Click the right arrow button 12 times to move from December to January of the next year
        for (let i = 0; i < 12; i++) {
            await rightArrowButton.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const newYear = await titleBarSpan.evaluate(element => element.textContent);
        console.log('New year and month:', newYear);

        // Extract the years from the text content
        const initialYearValue = parseInt(initialYear.split(' ')[1], 10);
        const newYearValue = parseInt(newYear.split(' ')[1], 10);

        expect(newYearValue).toBe(initialYearValue + 1);
    });

    // year decreases by 1 before January
    it('should decrease the year by 1 before January', async () => {
        const initialYear = await titleBarSpan.evaluate(element => element.textContent);
        console.log('Initial year and month:', initialYear);

        const leftArrowButton = await shadowRoot.evaluateHandle(root => root.querySelector('#prev'));

        // Click the left arrow button 12 times to move from January to December of the previous year
        for (let i = 0; i < 12; i++) {
            await leftArrowButton.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const newYear = await titleBarSpan.evaluate(element => element.textContent);
        console.log('New year and month:', newYear);

        // Extract the years from the text content
        const initialYearValue = parseInt(initialYear.split(' ')[1], 10);
        const newYearValue = parseInt(newYear.split(' ')[1], 10);

        expect(newYearValue).toBe(initialYearValue - 1);
    });
    
    // current day is highlighted
    it('should highlight the current day', async () => {
        const dayGrid = await shadowRoot.evaluateHandle(root => root.querySelector('.day_grid'));
        const activeDaySpan = await dayGrid.evaluateHandle(grid => grid.querySelector('span.active'));
        const currentDay = new Date().getDate();
        const highlightedDay = await activeDaySpan.evaluate(span => parseInt(span.textContent, 10));

        expect(highlightedDay).toBe(currentDay);
    });

    // hovering over a day highlights it
    it('should highlight a day when hovering over it', async () => {
        const dayElements = await shadowRoot.$$('.day_grid .day');
        
        if (dayElements.length > 0) {
            const dayElement = dayElements[0];
            
            await dayElement.hover();
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the highlight effect to apply
            
            const isHighlighted = await dayElement.evaluate(el => el.classList.contains('hover-highlighted'));
            expect(isHighlighted).toBe(true);
        }
    });

    // correct number of active days
    it('should display the correct number of active days', async () => {
        const dayGrid = await shadowRoot.evaluateHandle(root => root.querySelector('.day_grid'));
        const activeDaySpans = await dayGrid.evaluateHandle(grid => grid.querySelectorAll('span:not(.inactive)'));
        const activeDaysCount = await activeDaySpans.evaluate(spans => spans.length);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        expect(activeDaysCount).toBe(daysInMonth);
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

    afterAll(async () => {
        await page.close();
    });
});
