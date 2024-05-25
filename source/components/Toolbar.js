const SideBar = document.querySelector('aside');
const SidebarButtonOpen = document.querySelector('#sidebar-button-open');
const SidebarButtonClose = document.querySelector('#sidebar-button-close');
const ConditionalButtons = document.querySelector('#conditional-buttons')


/**
 * Makes the sidebar pop open
 * Removes Sidebar and Settings button from the journal entries
 */
SidebarButtonOpen.addEventListener('click', () => {
    SideBar.style.display = 'flex'
    ConditionalButtons.style.display = 'none'
});
/**
 * Makes the sidebar pop close
 * Adds Sidebar and Settings button to the journal entries
 */
SidebarButtonClose.addEventListener('click', () => {
    SideBar.style.display = 'none'
    ConditionalButtons.style.display = 'flex'
});