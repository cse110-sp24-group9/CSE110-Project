const journalEntryList = [
    "<article class='journal-entry'>\
        <div id='top'>\
            <div id='favorite'>★</div>\
            <div id='title' style='font-weight:bold;'>Task Completed</div>\
            <div id='time'>10:50pm</div>\
        </div>\
        <div id='info'>Completed dev journal prototype</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div id='label-box'>\
                <div id='label'>Task</div>\
            </div>\
            </div>\
            <div id='emotion'>😄</div>\
        </div>\
    </article>",
    "<article class='journal-entry'>\
        <div id='top'>\
            <div id='favorite'>★</div>\
            <div id='title' style='font-weight:bold;'>My True Title</div>\
            <div id='time'>10:25pm</div>\
        </div>\
        <div id='info'>Lorem ipsum dolor sit amet, consectetur adipiscing ...</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div id='label-box'>\
                    <div id='label' style='background-color: rgb(215,58,74); color:white'>Work</div>\
                </div>\
            </div>\
            <div id='emotion'>😕</div>\
        </div>\
    </article>",
    "<article class='journal-entry' >\
        <div id='top'>\
            <div id='favorite'></div>\
            <div id='title' style='font-weight:bold;'>Design Team Meeting</div>\
            <div id='time'>8:00pm</div>\
        </div>\
        <div id='info'>Today I discussed with my design team information about ...</div>\
        <div id='bottom'>\
            <div id='tags'>\
                <div id='label-box'>\
                    <div id='label'>CSE110</div>\
                </div>\
                <div id='label-box'>\
                    <div id='label'>Draft 2</div>\
                </div>\
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