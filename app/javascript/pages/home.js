function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {

        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        document.removeEventListener('click', outsideClickListener);
        document.getElementById('popup_home_exit').removeEventListener('click', removeClickListener);
    }
    document.addEventListener('click', outsideClickListener);
    document.getElementById('popup_home_exit').addEventListener('click', removeClickListener);

}
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight);


function toggleVisibility(element) {
    if (element.classList.contains('flex')) {
        element.classList.remove('flex');
        element.classList.add('hidden');
    } else if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        element.classList.add('flex');
    } else {
        console.log("Error: Element neither hidden or flex")
    }
}



document.addEventListener('turbolinks:load', () => {
    const page = document.getElementById('navbar').getAttribute('page');
    const homePopup = document.getElementById('popup_home_screen');

    console.log(page);
    console.log(homePopup);

    if ((page != 'home') || (homePopup == null) ) {
        return;
    }
    toggleVisibility(homePopup);
    hideOnClickOutside(homePopup,
        document.getElementById('popup_home_container'));
});
