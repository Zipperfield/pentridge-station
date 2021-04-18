
function transferValue(eventValueName) {
    // Takes an event value name that is in the temporary form
    // and transfers it to the actual form
    document.getElementById(eventValueName).value =
        document.getElementById("temp_" + eventValueName).value;

}

function transferContent() {
    transferValue('event_date');
}

function toggleClassListVisibility(formClassList) {
    if (formClassList.contains('flex')) {
        formClassList.remove('flex');
        formClassList.add('hidden');
    } else if (formClassList.contains('hidden')) {
        formClassList.remove('hidden');
        formClassList.add('flex');
    } else {
        console.log("Error: Form class lists are broken")
    }
}


function toggleFormVisibility() {
    tempFormClassList = document.getElementById('temp_event_form').classList;
    formClassList = document.getElementById('event_form').classList;
    toggleClassListVisibility(tempFormClassList);
    toggleClassListVisibility(formClassList);
}

document.addEventListener('turbolinks:load', () => {
    tempSubmit = document.getElementById("temp_submit");

    tempSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        //   validate inputs
        // transfer content
        // toggle visibility

        transferContent();
        toggleFormVisibility()
    });
});