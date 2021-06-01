function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {
        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        document.getElementById('up-arrow').classList.add('md:flex');

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
    document.getElementById('up-arrow').classList.remove('md:flex');


}
function setLink(attr, panel) {
    link = document.getElementById("popup_partner_" + attr);
    val = panel.getAttribute(attr);
    if (val === null) {
        console.log('attr is null')
        if (!link.classList.contains("pointer-events-none")) {
            link.classList.add("pointer-events-none");
        }
        link.setAttribute('href', "javascript:void(0)");
    } else {
        if (link.classList.contains("pointer-events-none")) {
            link.classList.remove("pointer-events-none");
        }
        console.log('attr is there')
        link.setAttribute('href', val);
    }
}

function transferPartnerContent(panel) {
    document.getElementById('popup_partner_name').textContent =
        panel.getAttribute('name');
    document.getElementById('popup_partner_bio').textContent =
        panel.getAttribute('bio');
    setLink('twitter', panel);
    setLink('facebook', panel);
    setLink('instagram', panel);
    setLink('website', panel);
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
