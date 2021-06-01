function openPopUp(e) {
    if (e.target.classList.contains('partner-panel')) {
        t = e.target;
    } else {
        // we are in text and need to set it to the granparent
        console.log(e.target);
        t = e.target.parentElement.parentElement;
    }
    console.log(t.getAttribute('bio'));
    transferPartnerContent(t);
}
function transferPartnerContent(panel) {
    document.getElementById('popup_partner_name').textContent =
        document.getElementById('partner_name').textContent;
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
