function embedMap() {
    // create map and set center and zoom level
    publicMapboxApiKey = document.getElementById('map').getAttribute('public-api-key');
    var map = new L.map("map");
    map.setView([39.948021, -75.220581], 15);

    var mapboxTileUrl =
        "https://api.mapbox.com/styles/v1/jdegrootlutzner/ckoddb6292czl19o4kmxe0d6a/tiles/256/{z}/{x}/{y}@2x?access_token=" + publicMapboxApiKey;

    L.tileLayer(mapboxTileUrl, {
        attribution:
            'Background map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);
    // Creating a marker

    // Icon options
    var iconOptions = {
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    }
    // Creating a custom icon
    var customIcon = L.icon(iconOptions);

    // Creating Marker Options
    var markerOptions = {
        icon: customIcon
    }

    var marker = L.marker([39.946, -75.2244], markerOptions);
    marker.bindPopup("<b>Pentridge Station</b><br>5110-5120 Pentridge St.<br>Philadelphia, PA 19143").openPopup();
    marker.addTo(map);

}




function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {
        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const submitOnEnter = event => {

        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('event_submit').click();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        transferContent(false);
        document.removeEventListener('click', outsideClickListener);
        document.getElementById('edit_event_type').removeEventListener('click', removeClickListener);
        document.getElementById('edit_event_date').removeEventListener('click', removeClickListener);
        document.getElementById('left_chevron').removeEventListener('click', removeClickListener);

        document.removeEventListener('keydown', submitOnEnter);

    }

    document.addEventListener('click', outsideClickListener);
    document.getElementById('edit_event_type').addEventListener('click', removeClickListener);
    document.getElementById('edit_event_date').addEventListener('click', removeClickListener);
    document.getElementById('left_chevron').addEventListener('click', removeClickListener);

    document.addEventListener('keydown', submitOnEnter);
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

function validNumAttendees() {
    var tempNumAttendees = document.getElementById('temp_event_num_attendees');
    tempNumAttendees.setCustomValidity('');
    console.log(tempNumAttendees.value);
    console.log(tempNumAttendees.value === "");

    if (tempNumAttendees.value === "") {
        tempNumAttendees.setCustomValidity('Please fill out this field.');
        tempNumAttendees.reportValidity();
        return false;
    }
    if (tempNumAttendees.value < 1 || tempNumAttendees > 300) {
        tempNumAttendees.setCustomValidity('You may have between 1 and 300 guests.');
        tempNumAttendees.reportValidity();
        return false;
    }
    tempNumAttendees.value = Math.trunc(tempNumAttendees.value);
    return true;
}


function validateTime() {
    var startTime = document.getElementById('temp_event_start_time');
    var endTime = document.getElementById('temp_event_end_time');

    function startBeforeFinish(e) {
        endTime.setCustomValidity('');
        startTime.setCustomValidity('');
        if ((endTime.value != '') && (startTime != '')) {
            end = getDateFromHours(endTime.value);
            start = getDateFromHours(startTime.value);
            sixHours = 21600000;
            console.log(end);
            console.log(start);
            console.log(end - start);
            if (end - start <= 0) {
                e.target.setCustomValidity('You must start before you finish!');
                e.target.reportValidity();
            } else if (end - start < sixHours) {
                e.target.setCustomValidity("One event rental includes a minimum of 6 hours (1 hour for set up, 4 hour event and 1 hour for cleanup)");
                e.target.reportValidity();
            }
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

class LineItem {
    constructor(id, visibility) {
        this.section = document.getElementById(id + "_section");
        this.readableName = document.getElementById(id + "_name");
        this.price = document.getElementById(id + '_price');
        this.base = Number(this.section.getAttribute('base'));
        this.wedding = Number(this.section.getAttribute('wedding'));
        this.hourly = Number(this.section.getAttribute('hourly'));
        this.perPerson = Number(this.section.getAttribute('per_person'));
        this.large = Number(this.section.getAttribute('large'));
        this.visibility = visibility;

        this.setReadableName = function (newName) {
            this.readableName.value = newName;
        }
        this.updatePrice = function (userInput) {
            console.log(userInput.isWedding());
            res = this.base + this.hourly + this.hourly + this.perPerson * userInput.numAttendees;
            console.log(res);
            this.setPrice(res);
            return res;
        }

        this.setPrice = function (newPrice) {
            this.price.textContent = newPrice;

        }

        this.isLarge = function (userInput) {
            console.log('is large ?');
            console.log(this.large);

            if (this.large < 0) {
                return false;
            }
            console.log(userInput.numAttendees > this.large)
            return (userInput.numAttendees > this.large)
        }

        this.toggleVisibility = function () {
            this.visible = !this.visibility;
            this.section.classList.toggle('hidden');
        }
    }
}

class UserPriceInput {
    constructor() {
        this.numAttendees = Number(document.getElementById('event_num_attendees').value);
        this.eventType = Number(document.getElementById('event_event_type').value);

        this.isWedding = function () {
            return (this.eventType == 0);
        }
    }
}

class PriceTool {
    constructor() {
        this.bartenderLineItem = new LineItem('bartender', false);
        this.baseLineItem = new LineItem('base', true);
        this.estimatedPrice = document.getElementById('estimated_price')
        this.userPriceInput = new UserPriceInput();

        // document.getElementById('')
        this.setEstimatedPrice = function (newPrice) {
            this.estimatedPrice.textContent = newPrice;
        }

        this.setPrices = function () {
            console.log('setting prices');
            bartenderPrice = this.bartenderLineItem.updatePrice(this.userPriceInput);
            console.log('price set');
            console.log(bartenderPrice);
            this.setEstimatedPrice(bartenderPrice);
        }
    }

}

class Preference {
    constructor(buttonID, firstChoiceID, secondChoiceID, thirdChoiceID) {
        this.button = document.getElementById(buttonID);
        this.firstChoice = document.getElementById(firstChoiceID);
        this.secondChoice = document.getElementById(secondChoiceID);
        this.thirdChoice = document.getElementById(thirdChoiceID);
        this.isValid = true;

        this.reset = function () {
            this.isValid = true;
            this.firstChoice.setCustomValidity('');
            this.secondChoice.setCustomValidity('');
            this.thirdChoice.setCustomValidity('');
        }
        this.validate = function () {

            if (this.button.checked) {
                if (this.firstChoice.value == '') {
                    this.firstChoice.setCustomValidity('Please fill out this field.');
                    this.firstChoice.reportValidity();
                    this.isValid = false;
                }
                else if (this.secondChoice.value == '') {
                    this.secondChoice.setCustomValidity('Please fill out this field.');
                    this.secondChoice.reportValidity();
                    this.isValid = false;
                }
                else if (this.thirdChoice.value == '') {
                    this.thirdChoice.setCustomValidity('Please fill out this field.');
                    this.thirdChoice.reportValidity();
                    this.isValid = false;
                }
                else if (this.firstChoice.value != '' &&
                    this.secondChoice.value != '' &&
                    this.thirdChoice.value != '') {
                    if (this.thirdChoice.value == this.secondChoice.value ||
                        this.thirdChoice.value == this.firstChoice.value) {
                        this.thirdChoice.setCustomValidity('Preferences must be different.');
                        this.thirdChoice.reportValidity();
                        this.isValid = false;


                    } else if (this.secondChoice.value == this.firstChoice.value) {
                        this.secondChoice.setCustomValidity('Preferences must be different.');
                        this.secondChoice.reportValidity();
                        this.isValid = false;
                    }
                }
            }

        }
    }
}

function validatePreferences() {

    vendorPreference = new Preference('event_vendor_partnership',
        'event_preferences_attributes_0_first_choice_id',
        'event_preferences_attributes_0_second_choice_id',
        'event_preferences_attributes_0_third_choice_id')
    musicianPreference = new Preference('event_musician_partnership',
        'event_preferences_attributes_1_first_choice_id',
        'event_preferences_attributes_1_second_choice_id',
        'event_preferences_attributes_1_third_choice_id')

    document.getElementById('event_form').addEventListener('submit', (event) => {
        console.log('validating');


        vendorPreference.validate();
        musicianPreference.validate();

        if (musicianPreference.isValid && vendorPreference.isValid) {
            console.log('valid!')
            return true;
        } else {
            console.log('not valid!')
            event.preventDefault();
            vendorPreference.reset();
            musicianPreference.reset();
        }

    });



}

document.addEventListener('turbolinks:load', () => {
    if (document.getElementById('header').getAttribute('page') != 'book') {
        return
    }
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
    validatePreferences();
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

    priceTool = new PriceTool();
    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        if (document.getElementById("temp_event_start_time").checkValidity()
            && document.getElementById("temp_event_end_time").checkValidity()
            && document.getElementById("temp_event_date").checkValidity()
            && validNumAttendees()) {
            transferContent(true);
            transferInfo();
            priceTool.setPrices();
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
    // embedMap();


});