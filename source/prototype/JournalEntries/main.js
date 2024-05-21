const journalEntryList = [
    '<article class="journal-entry">\
            <div id="side-info">\
              <div id="favorite">★</div>\
            </div>\
            <div id="main-info">\
              <div id="top-info">\
                <div id="title"><span>Task Completed</span></div>\
                <div id="time"><span>10:50pm</span></div>\
              </div>\
              <div id="middle-info">\
                <div id="preview"><span>Completed dev journal prototype</span></div>\
              </div>\
              <div id="bottom-info">\
                <div id="label-bar">\
                  <div id="label">Task</div>\
                </div>\
                <div id="emotion">😄</div>\
              </div>\
            </div>\
      </arcicle>',
    '<article class="journal-entry">\
      <div id="side-info">\
        <div id="favorite">★</div>\
      </div>\
      <div id="main-info">\
        <div id="top-info">\
          <div id="title"><span>Design Team Meetin</span></div>\
          <div id="time"><span>10:50pm</span></div>\
        </div>  \
        <div id="middle-info">\
          <div id="preview"><span>Today I discussed with my design team information about</span></div>\
        </div>\
        <div id="bottom-info">\
          <div id="label-bar">\
            <div id="label">CSE 110</div>\
          </div>\
          <div id="label-bar">\
            <div id="label">Draft 2</div>\
          </div>\
          <div id="emotion">😄</div>\
        </div>\
    </arcicle>'
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