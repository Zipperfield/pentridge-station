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


function alcoholChoiceHelper() {
    openInput = document.getElementById('event_open_bar');
    byobInput = document.getElementById('event_byob');

    function switchCheck(value) {
        if (value == false) {
            return true;
        } else {
            return false;
        }
    }

    const switchClick = event => {
        if (event.target == openInput) {
            byobInput.checked = switchCheck(byobInput.checked);
        } else {
            openInput.checked = switchCheck(openInput.checked);
        }
    }
    openInput.addEventListener('click', switchClick);
    byobInput.addEventListener('click', switchClick);
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

function changeValueToDate(element) {
    return new Date(element.value.replace(/-/g, '\/'))
}

function transferInfo() {
    document.getElementById('info_date').textContent =
        formatDateForInfo(changeValueToDate(document.getElementById('temp_event_date')));
    document.getElementById('info_start_time').textContent =
        getSelectedOptionText(document.getElementById('temp_event_start_time'));
    document.getElementById('info_end_time').textContent =
        getSelectedOptionText(document.getElementById('temp_event_end_time'));
    document.getElementById('info_event_type').textContent =
        getSelectedOptionText(document.getElementById('temp_event_event_type'));
    document.getElementById('info_num_attendees').textContent =
        document.getElementById('temp_event_num_attendees').value;

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
    sixHours = 21600000;
    function startBeforeFinish(e) {
        endTime.setCustomValidity('');
        startTime.setCustomValidity('');
        if ((endTime.value != '') && (startTime != '')) {
            end = getDateFromHours(endTime.value);
            start = getDateFromHours(startTime.value);

            if (end - start <= 0) {
                e.target.setCustomValidity('You must start before you finish!');
                e.target.reportValidity();
            } else if (end - start < sixHours) {
                e.target.setCustomValidity("One event rental includes a minimum of 6 hours (1 hour for set up, 4 hour event and 1 hour for cleanup)");
                e.target.reportValidity();
            }
        }
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function setTime(e) {
        start = getDateFromHours(startTime.value);
        endTime.value = `${checkTime(start.getHours() + 6)}:00:00`;
    }

    startTime.addEventListener('input', setTime);
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
    constructor(id, controller = "", altController = "") {
        this.section = document.getElementById(id + "_section");
        this.readableName = document.getElementById(id + "_name");
        this.price = document.getElementById(id + '_price');
        this.hourly = Number(this.section.getAttribute('hourly'));
        this.perPerson = Number(this.section.getAttribute('per_person'));
        this.controllingButton = document.getElementById(controller);

        this.altControllingButton = document.getElementById(altController);


        this.visible = function () {
            return (!this.section.classList.contains('hidden'));
        }

        this.setReadableName = function (newName) {
            this.readableName.textContent = newName;
        }
        this.updatePrice = function (userInput) {
            res = this.calculatePrice(userInput);
            this.setPrice(res);
            return res;
        }


        this.calculateBasePrice = function (userInput) {
            return (
                (500 +
                    250 * userInput.dateIsBusinessDay() * !userInput.businessHours() * !userInput.isWedding() +
                    500 * userInput.isWedding() * !userInput.addedBusinessCost() +
                    1000 * userInput.addedBusinessCost() +
                    250 * !userInput.addedBusinessCost() * userInput.isLarge() * !userInput.isWedding()));
        }

        this.calculateHourlyPrice = function (userInput, hoursReduced = 2) {
            return (this.visible() *
                (userInput.numHours() - hoursReduced) * this.hourly * (userInput.isLarge() + 1));
        }

        this.calculatePerPersonPrice = function (userInput) {
            return (this.visible() *
                this.perPerson * userInput.numAttendees());
        }


        this.setPrice = function (newPrice, lead = '$', close = "") {
            this.price.textContent = lead + newPrice + close;
            return newPrice;
        }


        this.hide = function () {
            if (this.visible()) {
                return;
            }
            this.section.classList.add('hidden');
        }

        this.show = function () {
            if (!this.visible()) {
                this.section.classList.remove('hidden');
            }

        }
        this.toggleVisibility = function () {
            this.section.classList.toggle('hidden');
        }

    }
}

class UserPriceInput {
    constructor() {
        this.numberAttendees = document.getElementById('event_num_attendees');
        this.eventType = document.getElementById('event_event_type');
        this.startHour = document.getElementById('temp_event_start_time');
        this.endHour = document.getElementById('temp_event_end_time');
        this.date = document.getElementById('temp_event_date');
        // this.numHours = ((this.endHour - this.startHour) / 3600000)

        this.numAttendees = function () {
            // console.log('pls');
            // console.log(this.numberAttendees);
            return (Number(this.numberAttendees.value));
        }

        this.isWedding = function () {
            return (this.eventType.value == '0');
        }
        this.numHours = function () {
            return ((getDateFromHours(this.endHour.value) - getDateFromHours(this.startHour.value)) / 3600000)
        }
        this.addedBusinessCost = function () {
            return this.businessHours() && this.dateIsBusinessDay();
        }

        this.businessHours = function () {
            return (getDateFromHours(this.endHour.value).getHours() > 17);
        }

        this.dateIsBusinessDay = function () {
            switch (changeValueToDate(this.date).getDay()) {
                case 0:
                    return true;
                case 5:
                    return true;
                case 6:
                    return true;
                default:
                    return false;
            }
        }
        this.isLarge = function () {
            return (this.numAttendees() > 25)
        }
    }
}

class PriceTool {
    constructor() {
        this.baseLineItem = new LineItem('base');
        this.bartenderLineItem = new LineItem('bartender', "event_alcohol");
        this.doorpersonLineItem = new LineItem('doorperson', "event_doorperson");
        this.openBarLineItem = new LineItem('open_bar', "event_open_bar", "event_byob");
        this.businessLineItem = new LineItem('business_operation',);
        this.musicianLineItem = new LineItem('musician_cost', "event_musician_partnership");
        this.vendorLineItem = new LineItem('food_vendor_cost', "event_vendor_partnership");
        this.estimatedPrice = document.getElementById('estimated_price');
        this.userPriceInput = new UserPriceInput();


        this.calculateEstimatePrice = function () {
            return (this.basePrice() +
                this.bartenderPrice() +
                this.doorpersonPrice() +
                this.openBarPrice() +
                this.musicianPrice() +
                this.vendorPrice());
        }


        this.businessLineItem.setPrice('*', lead = '');


        this.setEstimatedPrice = function (newPrice) {
            close = ""
            if ((this.vendorPrice()) > 0) {
                close = "+"
            }
            this.estimatedPrice.textContent = newPrice + close;
        }

        this.checkBusinessHours = function () {
            if (this.userPriceInput.addedBusinessCost()) {
                this.businessLineItem.show();
            } else {
                this.businessLineItem.hide();
            }
        }
        this.pluralizeBartenderText = function () {
            if (this.userPriceInput.isLarge()) {
                this.bartenderLineItem.setReadableName('BART Certified Bartenders');
            } else {
                this.bartenderLineItem.setReadableName('BART Certified Bartender');
            }
        }

        this.pluralizeDoorPersonText = function () {
            if (this.userPriceInput.isLarge()) {
                this.doorpersonLineItem.setReadableName('Doorpersons');
            } else {
                this.doorpersonLineItem.setReadableName('Doorperson');
            }
        }


        this.doorpersonSpecificAfterClick = function () {
            e = document.getElementById("event_doorperson_text");
            if (e.textContent == "Pentridge Station will provide a doorperson.") {
                e.textContent = "I will provide a doorperson for my event.";
            } else {
                e.textContent = "Pentridge Station will provide a doorperson.";
            }
        }

        this.alcoholSpecificAfterClick = function () {
            console.log('toggleAlcoholText');
            e = document.getElementById("event_alcohol_text");
            if (e.textContent == "NOT") {
                e.textContent = "";
            } else {
                e.textContent = "NOT";
            }
            document.getElementById('open_bar_toggle_section').classList.toggle('hidden');
        }

        this.basePrice = function () {
            return (this.baseLineItem.setPrice(this.baseLineItem.calculateBasePrice(this.userPriceInput)));

        }

        this.bartenderPrice = function () {
            this.pluralizeBartenderText();
            return (this.bartenderLineItem.setPrice(this.bartenderLineItem.calculateHourlyPrice(this.userPriceInput)));
        }



        this.doorpersonPrice = function () {
            this.pluralizeDoorPersonText();
            return (this.doorpersonLineItem.setPrice(this.doorpersonLineItem.calculateHourlyPrice(this.userPriceInput)));
        }
        this.openBarPrice = function () {
            return (this.openBarLineItem.setPrice(this.openBarLineItem.calculatePerPersonPrice(this.userPriceInput)));
        }

        this.vendorPrice = function () {
            return (this.vendorLineItem.setPrice(this.vendorLineItem.calculatePerPersonPrice(this.userPriceInput), "$", "+*"));

        }

        this.musicianPrice = function () {
            return (this.musicianLineItem.setPrice(this.musicianLineItem.calculateHourlyPrice(this.userPriceInput, 4), "$", "+*"));

        }


        this.setPrices = function () {
            this.setEstimatedPrice(this.calculateEstimatePrice());
        }
        // this.bartenderPrice = this.bartenderPrice.bind(this);

        this.setPrices = this.setPrices.bind(this);

        this.addLineItemListener = function (lineItem, func, specificFunc = function () { }) {
            if (!!lineItem.controllingButton) {
                console.log('addding listener')
                lineItem.controllingButton.addEventListener('click', function () {
                    lineItem.toggleVisibility();
                    func();
                    specificFunc();
                });
            }
            if (!!lineItem.altControllingButton) {
                console.log('addding listener')
                lineItem.altControllingButton.addEventListener('click', function () {
                    lineItem.toggleVisibility();
                    func();
                    specificFunc();
                });
            }
        };

        this.addLineItemListeners = function () {
            this.addLineItemListener(this.bartenderLineItem, this.setPrices);
            this.addLineItemListener(this.doorpersonLineItem, this.setPrices, this.doorpersonSpecificAfterClick);
            this.addLineItemListener(this.openBarLineItem, this.setPrices);
            this.addLineItemListener(this.musicianLineItem, this.setPrices);
            this.addLineItemListener(this.vendorLineItem, this.setPrices);
            document.getElementById('event_alcohol').addEventListener('click', this.alcoholSpecificAfterClick);
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
        vendorPreference.validate();
        musicianPreference.validate();

        if (musicianPreference.isValid && vendorPreference.isValid) {
            return true;
        } else {
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
    priceTool = new PriceTool();
    priceTool.addLineItemListeners();
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
    alcoholChoiceHelper();
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
            && document.getElementById("temp_event_date").checkValidity()
            && validNumAttendees()) {
            transferContent(true);
            transferInfo();
            toggleVisibility(eventFormScreen);
            priceTool.setPrices();

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