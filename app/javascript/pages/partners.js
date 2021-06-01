function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {
        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        document.removeEventListener('click', outsideClickListener);

    }
    document.addEventListener('click', outsideClickListener);

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
function openPopUp(e) {
    e.preventDefault();
    if (e.target.classList.contains('partner-panel')) {
        t = e.target;
    } else {
        // we are in text and need to set it to the granparent
        console.log(e.target);
        t = e.target.parentElement.parentElement;
    }
    transferPartnerContent(t);
    partnerPopup = document.getElementById('popup_partner_screen');
    toggleVisibility(partnerPopup);
    hideOnClickOutside(partnerPopup,
        document.getElementById('popup_partner_container'));

}
function transferPartnerContent(panel) {
    document.getElementById('popup_partner_name').textContent =
        panel.getAttribute('name');
    document.getElementById('popup_partner_bio').textContent =
        panel.getAttribute('bio');
    document.getElementById('popup_partner_twitter').setAttribute('href',
        panel.getAttribute('twitter'));
    document.getElementById('popup_partner_facebook').setAttribute('href',
        panel.getAttribute('facebook'));
    document.getElementById('popup_partner_instagram').setAttribute('href',
        panel.getAttribute('instagram'));
    document.getElementById('popup_partner_website').setAttribute('href',
        panel.getAttribute('website'));

}

document.addEventListener('turbolinks:load', () => {
    page = document.getElementById('navbar').getAttribute('page');
    if (!((page == 'musicians') || (page == "vendors"))) {
        return
    }
    panels = [...document.getElementsByClassName('partner-panel')];
    console.log(panels);
    panels.forEach(panel => {
        panel.addEventListener('click', openPopUp)

    });
    // get each panel element 
    // for each panel element add event listener for click 
    //  sets values
    //  that pops up screen 
    //  and adds another listener for outside click of popup
});
