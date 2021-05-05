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

function getSelectedOptionText(e) {
    return e.options[e.selectedIndex].textContent;
}

const nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
function formatDateForInfo(date) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
    return `${month} ${date.getDate()}${nth(date.getDate())}`
}

function transferInfo() {
    document.getElementById('info_date').textContent =
        formatDateForInfo(new Date(document.getElementById('temp_event_date').value.replace(/-/g, '\/')));
    document.getElementById('info_start_time').textContent =
        getSelectedOptionText(document.getElementById('temp_event_start_time'));
    document.getElementById('info_end_time').textContent =
        getSelectedOptionText(document.getElementById('temp_event_end_time'));
    document.getElementById('info_event_type').textContent =
        getSelectedOptionText(document.getElementById('temp_event_event_type'));
}

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

function getDateFromHours(time) {
    time = time.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

function validateTime() {
    var startTime = document.getElementById('temp_event_start_time');
    var endTime = document.getElementById('temp_event_end_time');

    function startBeforeFinish(e) {
        if ((endTime.value != '') && (startTime != '') &&
            (getDateFromHours(endTime.value) - getDateFromHours(startTime.value) <= 0)) {
            e.target.setCustomValidity('The event must start before it finishes.');
            e.target.reportValidity();
        } else {
            endTime.setCustomValidity('');
            startTime.setCustomValidity('');

        }
    }
    startTime.addEventListener('input', startBeforeFinish);
    endTime.addEventListener('input', startBeforeFinish);
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
    validateTime();
    // vendorPartnershipForm.getElementsByTagName('select').addEventListener
    vendorPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();
        toggleVisibility(vendorPartnershipForm);
        toggleText(vendorPartnershipText,
            "I am requesting to book these vendors:",
            "I will bring my own food.")
    });


    musicianPartnershipButton.addEventListener('click', (event) => {
        // event.preventDefault();
        toggleVisibility(musicianPartnershipForm);
        toggleText(musicianPartnershipText,
            "I am requesting to book these musicians:",
            "I will bring my own music.")
    });
    // this is a janky solution but should work.
    //  always set to one on server side
    // pass the value of button to view through html value
    // If param not one then artificially click on button
    if (musicianPartnershipButton.getAttribute('click_again') == 'true') {
        musicianPartnershipButton.click();
    }
    if (vendorPartnershipButton.getAttribute('click_again') == 'true') {
        vendorPartnershipButton.click();
    }


    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if (document.getElementById("temp_event_start_time").checkValidity()
            && document.getElementById("temp_event_end_time").checkValidity()
            && document.getElementById("temp_event_date").checkValidity()) {
            transferContent(true);
            transferInfo();
            toggleVisibility(eventFormScreen);

            hideOnClickOutside(eventFormScreen, eventFormContainer);

        } else {
            document.getElementById("temp_event_start_time").reportValidity()
            document.getElementById("temp_event_end_time").reportValidity()
            document.getElementById("temp_event_date").reportValidity()
        }

        //   validate inputs
        // transfer content
        // toggle visibility
        // if (timeValidated()) {

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