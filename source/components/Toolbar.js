const SideBar = document.querySelector('aside');
const SidebarButtonOpen = document.querySelector('#open-sidebar-button');
const SidebarButtonClose = document.querySelector('#close-sidebar-button');


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