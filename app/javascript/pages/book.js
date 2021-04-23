function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {
        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        transferContent(false);

        document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
}

// || elem.getClientRects().length
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight);


function transferValue(eventValueName, openingForm) {
    // Takes an event value name 
    if (openingForm) {
        document.getElementById(eventValueName).value =
            document.getElementById("temp_" + eventValueName).value;
    } else {
        // closing form
        document.getElementById("temp_" + eventValueName).value =
            document.getElementById(eventValueName).value;

    }


}

function transferContent(openingForm) {
    transferValue('event_date', openingForm);
    transferValue('event_start_time', openingForm);
    transferValue('event_end_time', openingForm);
    transferValue('event_num_attendees', openingForm);
    transferValue('event_event_type', openingForm);

}

function toggleVisibility(element) {
    console.log("toggleVisibility")
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


function toggleFormVisibility() {
    // tempFormClassList = document.getElementById('temp_event_form_container').classList;
    formClassList = document.getElementById('event_form_container').classList;
    // toggleClassListVisibility(tempFormClassList);
    toggleClassListVisibility(formClassList);
}

function addPartnershipFormListeners() {

}


document.addEventListener('turbolinks:load', () => {
    tempSubmit = document.getElementById("temp_submit");
    eventFormScreen = document.getElementById('event_form_screen');
    eventFormContainer = document.getElementById('event_form_container');
    vendorPartnershipButton = document.getElementById('event_vendor_partnership');
    vendorPartnershipForm = document.getElementById('vendor_partnership_form');
    musicianPartnershipButton = document.getElementById('event_musician_partnership');
    musicianPartnershipForm = document.getElementById('musician_partnership_form');


    // vendorPartnershipForm.getElementsByTagName('select').addEventListener
    vendorPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();
        toggleVisibility(vendorPartnershipForm);

    });
    musicianPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();

        toggleVisibility(musicianPartnershipForm);

    });

    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        //   validate inputs
        // transfer content
        // toggle visibility

        transferContent(true);
        toggleVisibility(eventFormScreen);

        hideOnClickOutside(eventFormScreen, eventFormContainer);
        // formClassList = document.getElementById('event_form_container');
        // formClassList.style.display = 
    });

});