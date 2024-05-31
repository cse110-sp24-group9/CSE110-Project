const SideBar = document.querySelector('aside');
const SidebarButtonOpen = document.querySelector('#open-sidebar-button');
const SidebarButtonClose = document.querySelector('#close-sidebar-button');

const SettingButton = document.querySelector('#setting-button');
const lightMode = document.getElementById("lightmode");
const darkMode = document.getElementById("darkmode");

/**
 * Makes the sidebar pop open
 * Removes Sidebar and Settings button from the journal entries
 */
SidebarButtonOpen.addEventListener('click', () => {
    SideBar.style.display = 'flex'
    SidebarButtonOpen.style.display = 'none'
});
/**
 * Makes the sidebar pop close
 * Adds Sidebar and Settings button to the journal entries
 */
SidebarButtonClose.addEventListener('click', () => {
    SideBar.style.display = 'none'
    SidebarButtonOpen.style.display = 'flex'
});

/**
 * Changes light/dark mode of the page
 * Makes all components to light/dark mode concurrently
 */


/* SettingButton.addEventListener('click', () => {
    const lightMode = document.getElementsByClassName("lightmode");
    const darkMode = document.getElementsByClassName("darkmode");
    for(let i = 0; i < lightMode.length; i++) {
        console.log(lightMode[i]);
        console.log(darkMode[i]);

       if (lightMode[i].disabled) {
        lightMode[i].disabled = false;
        darkMode[i].disabled = true;
        } else {
            lightMode[i].disabled = true;
            darkMode[i].disabled = false;
        } 
    } 
}); */