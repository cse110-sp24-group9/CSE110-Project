// Get the modal
var modal_add_event = document.getElementById("modal_add_event");

// Get the button that opens the modal
var btn = document.getElementById("add-event");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal_add_event.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal_add_event.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_add_event) {
        modal_add_event.style.display = "none";
    }
}