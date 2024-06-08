    import dbInstance from "./db.js";

/**
* @type {dbInstance}
*/
let db;


document.addEventListener('DOMContentLoaded', function() {
    // Filter Button On and Off
    db = new dbInstance();
    db.init().then((val)=>{
        if(db.failed){
            alert('db could not be created');
            return;
        }
        db.getDayObject(document.querySelector("calendar-component").current_utc_time_stamp).then((day)=>{
            if(day)
            {
                let eventList = day['events'];
                document.querySelector('event-list-component').clearEvents();
                document.querySelector('event-list-component').loadEvents(eventList);
                let taskList = day['tasks'];
                document.querySelector('task-list-component').clearTasks();
                document.querySelector('task-list-component').loadTasks(taskList);
                let journalList = day['entries'];
                document.querySelector('journal-entries-component').clearEntries();
                for(let obj of journalList){
                    document.querySelector('journal-entries-component').addEntry(obj);
                }
            }
        });
    }).catch((error)=>{
        console.error(error);
        alert('db had an error');
    }); 
    let filterBtn = document.getElementById("filter-button").querySelector("button");
    let dropdown = document.getElementById("dropdown-content");
    filterBtn.addEventListener('click', function() {
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "flex";
        } else {
            dropdown.style.display = "none";
        }
    });
        
    document.querySelector("calendar-component").addEventListener('day-changed-event', (e)=>{
        let p_key = e.detail.time;
        db.getDayObject(p_key).then((day) => {
            if(day) {
                let eventList = day['events'];
                document.querySelector('event-list-component').clearEvents();
                document.querySelector('event-list-component').loadEvents(eventList);
                let taskList = day['tasks'];
                document.querySelector('task-list-component').clearTasks();
                document.querySelector('task-list-component').loadTasks(taskList);
        
                let journalList = day['entries'];
                document.querySelector('journal-entries-component').clearEntries();
                for(let obj of journalList){
                    document.querySelector('journal-entries-component').addEntry(obj);
                }
            }else{
                document.querySelector('event-list-component').clearEvents();
                document.querySelector('task-list-component').clearTasks();
                document.querySelector('journal-entries-component').clearEntries();
            }
        });
    });
});


window.addEventListener('data-updated', (event) => {
    // need to save entire page
    let eventList = document.querySelector('event-list-component').save();
    let taskList = document.querySelector('task-list-component').save();
    let journalList = document.querySelector('journal-entries-component').save();
    let day = {};
    day['time'] = document.querySelector('calendar-component').current_utc_time_stamp;
    day['events'] = eventList;
    day['tasks'] = taskList;
    day['entries'] = journalList;
    db.saveDayObject(day);
});




