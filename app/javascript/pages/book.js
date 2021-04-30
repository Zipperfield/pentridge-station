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
function validatedTime() {
    var startTime = document.getElementById('temp_event_start_time');
    var endTime = document.getElementById('temp_event_end_time');

}
function validateDate() {
    var formDateInput = document.getElementById('event_date');
    var tempFormDateInput = document.getElementById('temp_event_date');
    excludedDates = document.getElementById('excluded_dates').getAttribute('dates').split(',');
    function dontOverbook(e) {
        if (excludedDates.indexOf(e.target.value) > -1) {
            e.target.setCustomValidity('This date is already booked. Please select another date.');
            e.target.reportValidity();
        } else {
            e.target.setCustomValidity('');
        }
    }
    formDateInput.addEventListener('input', dontOverbook);
    tempFormDateInput.addEventListener('input', dontOverbook);
}

function toggleText(element, from, to) {
    if (element.textContent == from) {
        element.textContent = to;
    } else if (element.textContent == to) {
        element.textContent = from;
    } else {
        console.log("Element out of sync");
    }
}


document.addEventListener('turbolinks:load', () => {
    tempSubmit = document.getElementById("temp_submit");
    eventFormScreen = document.getElementById('event_form_screen');
    eventFormContainer = document.getElementById('event_form_container');
    vendorPartnershipButton = document.getElementById('event_vendor_partnership');
    vendorPartnershipForm = document.getElementById('vendor_partnership_form');
    vendorPartnershipText = document.getElementById('vendor_partnership_text');

    musicianPartnershipButton = document.getElementById('event_musician_partnership');
    musicianPartnershipForm = document.getElementById('musician_partnership_form');
    musicianPartnershipText = document.getElementById('musician_partnership_text');

    validateDate();
    // vendorPartnershipForm.getElementsByTagName('select').addEventListener
    vendorPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();
        toggleVisibility(vendorPartnershipForm);
        toggleText(vendorPartnershipText,
            "I am requesting to book these food vendors:",
            "I will bring my own food.")
    });


    musicianPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();
        toggleVisibility(musicianPartnershipForm);
        toggleText(musicianPartnershipText,
            "I am requesting to book these musicians:",
            "I will bring my own music.")
    });


    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        //   validate inputs
        // transfer content
        // toggle visibility
        // if (timeValidated()) {
        transferContent(true);
        toggleVisibility(eventFormScreen);

        hideOnClickOutside(eventFormScreen, eventFormContainer);
        // } else {
        // alert
        // }

        // formClassList = document.getElementById('event_form_container');
        // formClassList.style.display = 
    });
    console.log(eventFormScreen.getAttribute('alert'));

    if (eventFormScreen.getAttribute('alert') == 'true') {
        tempSubmit.click();
    }
});