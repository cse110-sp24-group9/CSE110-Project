const journalEntryList = [
    "<article class='journal-entry'>\
        <div id='top'>\
            <div id='favorite'>★</div>\
            <div id='title'>Task Completed</div>\
            <div id='time'>10:50pm</div>\
        </div>\
        <div id='info'>Completed dev journal prototype</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div>task</div>\
            </div>\
            <div id='emotion'>😄</div>\
        </div>\
    </article>",
    "<article class='journal-entry'>\
        <div id='top'>\
            <div id='favorite'>★</div>\
            <div id='title'>My True Title</div>\
            <div id='time'>10:25pm</div>\
        </div>\
        <div id='info'>Lorem ipsum dolor sit amet, consectetur adipiscing ...</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div>work</div>\
            </div>\
            <div id='emotion'>😕</div>\
        </div>\
    </article>",
    "<article class='journal-entry' >\
        <div id='top'>\
            <div id='favorite'></div>\
            <div id='title'>Design Team Meeting</div>\
            <div id='time'>8:00pm</div>\
        </div>\
        <div id='info'>Today I discussed with my design team information about ...</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div>CSE110</div>\
                <div>Draft 2</div>\
            </div>\
            <div id='emotion'>🙂</div>\
        </div>\
    </article>"
]

let entriesNum = 0;

const listElement = document.getElementById("journal-list");
function newEntry(){
    if(!journalEntryList.length == 0){
        newItem = journalEntryList.pop()
        listElement.insertAdjacentHTML('afterbegin', newItem);

        entriesNum += 1;
        document.getElementById("info-b").innerText =  entriesNum + " Entries";
    }
}