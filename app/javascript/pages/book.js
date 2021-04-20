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
// || elem.getClientRects().length
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight);

function transferValue(eventValueName) {
    // Takes an event value name that is in the temporary form
    // and transfers it to the actual form
    document.getElementById(eventValueName).value =
        document.getElementById("temp_" + eventValueName).value;

}

function transferContent() {
    transferValue('event_date');
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

document.addEventListener('turbolinks:load', () => {
    tempSubmit = document.getElementById("temp_submit");
    eventFormScreen = document.getElementById('event_form_screen');
    eventFormContainer = document.getElementById('event_form_container');

    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event);

        //   validate inputs
        // transfer content
        // toggle visibility

        transferContent();
        toggleVisibility(eventFormScreen);

        hideOnClickOutside(eventFormScreen, eventFormContainer);
        // formClassList = document.getElementById('event_form_container');
        // formClassList.style.display = 
    });

});