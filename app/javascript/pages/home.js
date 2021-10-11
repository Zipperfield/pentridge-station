function hideOnClickOutside(parent, child) {
    const outsideClickListener = event => {

        if (!(event.defaultPrevented) && !child.contains(event.target) && isVisible(child)) {
            removeClickListener();
        }
    }

    const removeClickListener = () => {
        toggleVisibility(parent);
        document.removeEventListener('click', outsideClickListener);
        document.getElementById('popup_home_exit').removeEventListener('click', removeClickListener);
    }
    document.addEventListener('click', outsideClickListener);
    document.getElementById('popup_home_exit').addEventListener('click', removeClickListener);

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


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Strict; Secure;";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


document.addEventListener('turbolinks:load', () => {
    const page = document.getElementById('navbar').getAttribute('page');
    const homePopup = document.getElementById('popup_home_screen');
    if ((page != 'home') || (homePopup == null) ) {
        return;
    }
    const popupCookieValue = homePopup.getAttribute('cookie');
    let popupCookie = getCookie(popupCookieValue);
    if (popupCookie == "" || popupCookie == null) {
    
      toggleVisibility(homePopup);
      hideOnClickOutside(homePopup,
        document.getElementById('popup_home_container'));
      setCookie(popupCookieValue, true, 365);
    }
});
