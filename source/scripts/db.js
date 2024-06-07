export default class dbInstance{
    ready = false;
    failed = false;
    /**
     * @type {IDBDatabase}
     */
    #db_object;
    constructor(){
        if(!('indexedDB' in window)){
            console.error("indexdb not supported no save functionality");
            alert('indexdb not supported on browser please use a newer version.');
            this.failed = true;
        }
    }
    init(){
        let instance = this;
        let openRequest = indexedDB.open("Journal", 1);
        let promise = new Promise((resolve, reject) => {
            openRequest.onerror = function(){
                console.error(openRequest.error);
                reject(openRequest.error);
            }
            openRequest.onupgradeneeded = function(event) {
                // triggers if the client had no database
                // ...perform initialization...
                instance.#db_object = openRequest.result;
                switch(event.oldVersion){
                    case 0:
                        //no db existed
                        instance.#db_object.createObjectStore('days', {keyPath: 'time'});
                        instance.ready = true;
                        resolve(true);
                        break;
                    default:
                        console.error("impossible version. check data integrity");
                        reject("impossible version. check data integrity");
                }
            }
            openRequest.onsuccess = function() {
                instance.#db_object = openRequest.result;
                // continue working with database using db object
                instance.ready = true;
                resolve(true);
            }
        });
        return promise;
    }
    /**
     * returns the day saved on that day
     * @param {number} time_stamp UTC time stamp of the day you want to fetch, should be 12:00am in the morning
     * @returns {Promise<object>}
     */
    getDayObject(time_stamp) {
       let transaction =  this.#db_object.transaction('days');
       let objectStore = transaction.objectStore('days');
       let promise = new Promise((resolve, reject)=>{
            let request = objectStore.get(time_stamp);
            request.onsuccess = function(){
                resolve(request.result);
            }
            request.onerror = function(){
                reject(request.error);
            }
       })
       return promise;
    }

    /**
     * saves day object for that day
     * @param {Object} day_object 
     * @returns {Promise<object>}
     */
    saveDayObject(day_object){
        let transaction =  this.#db_object.transaction('days', 'readwrite');
        let objectStore = transaction.objectStore('days');
        let promise = new Promise((resolve, reject)=>{
            let saveData = objectStore.put(day_object);
            saveData.onsuccess = function(){
                resolve(saveData.result);
            }
            saveData.onerror = function(){
                reject(saveData.error);
            }
       })
       return promise;
    }
}
