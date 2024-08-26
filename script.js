//space between header between sections
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header"); // Adjust selector if needed
  const headerHeight = header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: "smooth",
      });
    });
  });
});

//active links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-list li a");
  const sections = Array.from(navLinks).map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  function changeActiveLink() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      if (
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight >= scrollPosition
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveLink);
  changeActiveLink(); // Run on initial load to set the correct active link
});

//projects
document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const wrapper = document.getElementById("projects-wrapper");

  leftArrow.addEventListener("click", function () {
    wrapper.scrollBy({ left: -300, behavior: "smooth" }); // Adjust the scroll distance as needed
  });

  rightArrow.addEventListener("click", function () {
    wrapper.scrollBy({ left: 300, behavior: "smooth" }); // Adjust the scroll distance as needed
  });
});

//email
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header");
  const images = document.querySelectorAll(".home-section img, .project-image");
  const aboutRow = document.querySelector(".about-section .row-container");
  const buttons = document.querySelectorAll(
    ".btn-primary, .home-section .left a, .right .btn a"
  );

  function handleScroll() {
    const triggerBottom = window.innerHeight * 0.9;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });

    const headerTop = header.getBoundingClientRect().top;
    if (headerTop < triggerBottom) {
      header.classList.add("visible");
    }

    images.forEach((img) => {
      const imgTop = img.getBoundingClientRect().top;
      if (imgTop < triggerBottom) {
        img.classList.add("visible");
      }
    });

    const aboutTop = aboutRow.getBoundingClientRect().top;
    if (aboutTop < triggerBottom) {
      aboutRow.classList.add("visible");
    }

    buttons.forEach((btn) => {
      const btnTop = btn.getBoundingClientRect().top;
      if (btnTop < triggerBottom) {
        btn.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger the function on page load
});

//gmail massage received
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    document.getElementById("date").value = new Date().toLocaleString();
    // Send the form data to the server using email.js

    emailjs.sendForm("service_pwhqi1i", "template_b14546x", this).then(
      function (response) {
        alert("Message sent successfully!");
        // Optionally, you can reset the form here
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send message. Please try again.");
      }
    );
  });
