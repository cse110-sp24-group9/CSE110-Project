document.addEventListener('DOMContentLoaded', function() {
    // Filter Button On and Off
    let filterBtn = document.getElementById("filter-button").querySelector("button");
    let dropdown = document.getElementById("dropdown-content");

    filterBtn.addEventListener('click', function() {
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "flex";
        } else {
            dropdown.style.display = "none";
        }
    });
});
