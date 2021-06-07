function toggleForm(button) {
  button.classList.add('hidden');
  document.getElementById("new_contact").classList.remove('hidden');

}

document.addEventListener('turbolinks:load', () => {
  const newsletterButton = document.getElementById("newsletterButton");

  newsletterButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleForm(newsletterButton);
  });

  const hamburger = document.querySelector(".tham");
  hamburger.addEventListener("click", (event) => {
    // event.preventDefault();
    hamburger.classList.toggle('tham-active');
  });
});
