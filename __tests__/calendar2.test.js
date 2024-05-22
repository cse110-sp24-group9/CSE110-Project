// initialize months table
const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

// mod function to handle cyclic property of calendar
function mod(n) {
    return ((n % 12) + 12) % 12;
}

describe('Basic user flow for Calendar', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000/pages/Calendar.html');
    });
    
    // ***** TEST CASES *****

    // calendar month goes backward when click LEFT arrow
    it('Testing prev month LEFT arrow button', async () => {
        console.log('left arrow button moves to prev month...');

        // access calendar Web-Component and get the shadow root
        const calendarComp = await page.$('calendar-component');
        const shadowCalendar = await calendarComp.getProperty('shadowRoot');

        // get span element (Month Year) and extract just Month name
        const titleSpan = await shadowCalendar.$('span');
        const textContent = await page.evaluate(el => el.textContent, titleSpan); // eval JSHandle
        const monthName = textContent.split(' ')[0];
        const monthNum = months[monthName];

        // click prev button
        const button = await shadowCalendar.$('#prev');
        await button.click();

        // get new Month name after clicking prev button
        const prevTitleSpan = await shadowCalendar.$('span');
        const prevTextContent = await page.evaluate(el => el.textContent, prevTitleSpan);
        const prevMonthName = prevTextContent.split(' ')[0];

        expect(mod(monthNum - 1)).toBe(months[prevMonthName]);
    }, 15000);

    // calendar month goes forward when clicking RIGHT arrow
    it('Testing next month RIGHT arrow button', async () => {
        console.log('right arrow button moves to next month...');

        // access calendar Web-Component and get the shadow root
        const calendarComp = await page.$('calendar-component');
        const shadowCalendar = await calendarComp.getProperty('shadowRoot');

        // get span element (Month Year) and extract just Month name
        const titleSpan = await shadowCalendar.$('span');
        const textContent = await page.evaluate(el => el.textContent, titleSpan); // eval JSHandle
        const monthName = textContent.split(' ')[0];
        const monthNum = months[monthName];

        // click next button
        const button = await shadowCalendar.$('#nextBtn');
        await button.click();

        // get new Month name after clicking next button
        const nextTitleSpan = await shadowCalendar.$('span');
        const nextTextContent = await page.evaluate(el => el.textContent, nextTitleSpan);
        const nextMonthName = nextTextContent.split(' ')[0];

        expect(mod(monthNum + 1)).toBe(months[nextMonthName]);
    }, 15000);
    
    // year increases by 1 after December
    it('Testing year increasing after December', async () => {
        console.log('year increments after December...');

        // access calendar Web-Component and get the shadow root
        const calendarComp = await page.$('calendar-component');
        const shadowCalendar = await calendarComp.getProperty('shadowRoot');

        // get span element (Month Year) and extract:
        //  month name: to determine how many times to click next button to reach next year
        //  year: to compare
        const titleSpan = await shadowCalendar.$('span');
        const textContent = await page.evaluate(el => el.textContent, titleSpan); // eval JSHandle
        const monthName = textContent.split(' ')[0];
        const monthNum = months[monthName];
        const year = textContent.split(' ')[1];

        // click next button until we reach next January (should be new year)
        const tilNextJan = 12 - monthNum;
        const button = await shadowCalendar.$('#nextBtn');
        for (let i = 0; i < tilNextJan; i++) {
            await button.click();
        }

        // get new year value after clicking next button
        const newTitleSpan = await shadowCalendar.$('span');
        const newTextContent = await page.evaluate(el => el.textContent, newTitleSpan);
        const newYear = newTextContent.split(' ')[1];

        expect(Number(year) + 1).toBe(Number(newYear));
    }, 15000);

    // year decreases by 1 before January
    it('Testing year decreasing before January', async () => {
        console.log('year decrements before January...');

        // access calendar Web-Component and get the shadow root
        const calendarComp = await page.$('calendar-component');
        const shadowCalendar = await calendarComp.getProperty('shadowRoot');

        // get span element (Month Year) and extract:
        //  month name: to determine how many times to click prev button to reach prev year
        //  year: to compare
        const titleSpan = await shadowCalendar.$('span');
        const textContent = await page.evaluate(el => el.textContent, titleSpan); // eval JSHandle
        const monthName = textContent.split(' ')[0];
        const monthNum = months[monthName];
        const year = textContent.split(' ')[1];

        // click prev button until we reach last January (should be old year)
        const tilLastJan = monthNum + 1;
        const button = await shadowCalendar.$('#prev');
        for (let i = 0; i < tilLastJan; i++) {
            await button.click();
        }

        // get new year value after clicking next button
        const newTitleSpan = await shadowCalendar.$('span');
        const newTextContent = await page.evaluate(el => el.textContent, newTitleSpan);
        const oldYear = newTextContent.split(' ')[1];

        expect(Number(year) - 1).toBe(Number(oldYear));
    }, 15000);

    // current day is highlighted
    it('Testing that current day is highlighted', async () => {
        console.log('current day is highlighted...');

        // access calendar Web-Component and get the shadow root
        const calendarComp = await page.$('calendar-component');
        const shadowCalendar = await calendarComp.getProperty('shadowRoot');

        // get span element (Month Year) and extract:
        //  month name: to determine how many times to click prev button to reach prev year
        //  year: to compare
        const titleSpan = await shadowCalendar.$('span');
        const textContent = await page.evaluate(el => el.textContent, titleSpan); // eval JSHandle
        const monthName = textContent.split(' ')[0];
    }, 15000);

    // hovering over a day highlights it


    // correct number of active days, ie number of days inside the month
    it('testing current active days inside the calendar', async () => {
        const monthGrid = await page.$('calendar-component >>> .day_grid');
        const numberOfDays = (await monthGrid.$$('span')).length;
        const inactiveDays = (await monthGrid.$$('.inactive')).length;
        let date = new Date(), // getting new date, current year and month
        currentDay = date.getDate(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();
        const numberMonthDays = new Date(currYear, currMonth + 1, 0).getDate();
        expect((numberOfDays - inactiveDays) === numberMonthDays).toBe(true)
    });

    // first day in correct day of week position
    it('testing first day is in the correct position ', async () => {
        let date = new Date(), // getting new date, current year and month
        currentDay = date.getDate(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();
        const firstDayofMonth = new Date(currYear, currMonth, 0).getDay();
        const spanList = await page.$$('calendar-component >>> .day_grid span');
        for(let i = 0; i < spanList.length; i++){
           let texItem = await spanList[i].getProperty('textContent');
           if(texItem == 1){
                expect(i%7 == firstDayofMonth).toBe(true);
                return;
           }
        }
        expect(true).toBe(false);
    })

    // last day in correct day of week position
    it('testing last day of month is inside correct week position', async () => {
        let date = new Date(), // getting new date, current year and month
        currentDay = date.getDate(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();
        const lastDayofMonth = new Date(currYear, currMonth, 0).getDay();
        const lastDateofMonth = new Date(currYear, currMonth, 0).getDay();
        const spanList = await page.$$('calendar-component >>> .day_grid span');
        for(let i = 0; i < spanList.length; i++){
           let texItem = await spanList[i].getProperty('textContent');
           if(texItem == lastDateofMonth){
                expect(i%7 == lastDayofMonth).toBe(true);
                return;
           }
        }
        expect(true).toBe(false);
    })

    // should load the calendar

    // should handle navigation boundary /// changing between months at last day

    // styling

    it('Testing', async () => {
        console.log('Testing...');
        expect(true).toBe(true);
    });
});