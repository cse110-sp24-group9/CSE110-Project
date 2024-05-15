const journalEntryList = [
    '<article class="journal-entry">\
            <div id="left-info">\
              <div id="favorite">★</div>\
            </div>\
            <div id="middle-info">\
              <div id="title" style="font-weight:bold;">Task Completed</div>\
              <div id="info">Completed dev journal prototype</div>\
              <div id="tags">\
                <div id="label-box">\
                  <div id="label">Task</div>\
                </div>\
              </div>\
            </div>\
            <div id="right-info">\
              <div id="time">10:50pm</div>\
              <div id="emotion">😄</div>\
            </div>\
          </article>',
    '<article class="journal-entry">\
            <div id="left-info">\
              <div id="favorite">★</div>\
            </div>\
            <div id="middle-info">\
              <div id="title" style="font-weight:bold;">Design Team Meeting</div>\
              <div id="info">Today I discussed with my design team information about</div>\
              <div id="tags">\
                <div id="label-box">\
                  <div id="label">CSE110</div>\
                </div>\
                <div id="label-box">\
                  <div id="label">Draft2</div>\
                </div>\
              </div>\
            </div>\
            <div id="right-info">\
              <div id="time">10:50pm</div>\
              <div id="emotion">😄</div>\
            </div>\
          </article>']

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