document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.querySelector('.main-navigation');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
      if (
        !nav.contains(event.target) &&
        !hamburger.contains(event.target) &&
        nav.classList.contains('active')
      ) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
});
