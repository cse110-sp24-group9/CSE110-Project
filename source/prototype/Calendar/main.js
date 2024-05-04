// const monthYearElement = document.getElementById('monthYear');
// const datesElement = document.getElementById('dates');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// let currentDate = new Date();

// const updateCalendar = () => {
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();

//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth +1, 0);
//     const totalDays = lastDay.getDate();
//     const firstDayIndex = firstDay.getDay();
//     const lastDayindex = lastDay.getDay();

//     const monthYearString = currentDate.toLocaleString
//     ('default', {month: 'long', year: 'numeric'});

//     monthYearElement.textContent = monthYearString;

//     let datesHTML = '';

//     for(let i = firstDayIndex; i > 0; i--){
//         const prevDate = new Date(currentYear,currentMonth, 0- i+1);
//         datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
//     }

//     for(let i = 1; i<= totalDays; i++){
//         const date = new Date(currentYear, currentMonth, i);
//         const activeClass = date.toDateString() === newDate().toDateString() ? 'active' : '';
//         datesHTML += `<div class="date${activeClass}">${i}</div>`;
//     }

//     for(let i = 1; i <= 7 - lastDayindex; i++){
//         const nextDate = new Date(currentYear, currentMonth + 1, i);
//         datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;

        
//     }
//     datesElement.innerHTML = datesHTML;
// }

// prevBtn.addEventListener('click', () =>{
//     currentDate.setMonth(currentDate.getMonth()-1);
//     updateCalendar();
// })

// nextBtn.addEventListener('click', ()=> {
//     currentDate.setMonth(currentDate.getMonth()+1);
//     updateCalendar();
// })

// updateCalendar();

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1); // Corrected to get the first day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayindex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';
    //creates the days before the current month(for example, if the first of the month is on a wednesday, this for loop will create the monday and tuesday and fill it with  the previous months)
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, -i + 1);
        datesHTML += `<div tabindex ="1" class="date inactive">${prevDate.getDate()}</div>`; // Corrected closing tag
    }
    //creates the div for the current days of the month
    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? ' active' : '';
        datesHTML += `<div tabindex ="1" class="date${activeClass}" id="${i}">${i}</div>`; // Space added before active class
    }
    //added id="${i}" so that each div class has a different id, so we can access each one individually later

    //creates the days for the next month to fill out the calendar
    for (let i = 1; i <= (6 - lastDayindex); i++) { // Fixed loop condition to avoid an extra day
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div tabindex ="1" class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
};

// Adding event listeners outside the updateCalendar function
//go to previous month
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});
//go to next month
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar(); // Initial call to display the calendar

// I need to add an event to determine if a click has occured
// currently, it will tell you if any is clicked, now we have to make it determine which is clicked

 dates.addEventListener('click', () => {
    const myElement = event.target; // Get the element that is clicked
    /*
        Compare the selected element class, 
        if it is not an active date then make it active and make the other active date unactive
    */
    if(myElement.getAttribute("class") === 'date'){
        dates.getElementsByClassName("active")[0].classList.remove("active")
        myElement.classList.add("active");
    }
 });