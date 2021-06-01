function openPopUp(e) {
    if (e.target.classList.contains('partner-panel')) {
        t = e.target;
    } else {
        // we are in text and need to set it to the granparent
        console.log(e.target);
        t = e.target.parentElement.parentElement;
    }
    console.log(t.getAttribute('bio'));
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
