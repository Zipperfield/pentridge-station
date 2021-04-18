


function toggleForm(button){
  form = document.getElementById("new_contact");
  button.classList.add('hidden');
  form.classList.remove('hidden');

}

document.addEventListener('turbolinks:load', () => {
  console.log('hello');
  newsletterButton = document.getElementById("newsletterButton");

  newsletterButton.addEventListener("click", (event) =>{
    event.preventDefault();
    toggleForm(newsletterButton);
    });
});

