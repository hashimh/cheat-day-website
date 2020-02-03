// FUNCTION TO ALTER CLASSNAMES OF NAVBAR ELEMENTS FOR RESPONSIVENESS //
function navFunction() {
  console.log("entered navFunction");
  var x = document.getElementById("myTopNav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// FUNCTION TO ALTER CLASSNAMES OF SIDENAV ELEMENTS FOR RESPONSIVENESS //
document.addEventListener("DOMContentLoaded", function() {
  let links = document.getElementsByClassName("side_a");

  // Add event listener for clicking links
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      let div = document.getElementsByName(this.innerHTML);
      div[0].scrollIntoView({ behavior: "smooth" });
    });
  }

  // Add event listener for scrolling to "links"
  let divs = document.getElementsByClassName("menuitem");
  window.addEventListener("scroll", function() {
    let index = divs.length;
    while (--index && window.scrollY + 100 < divs[index].offsetTop) {}
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("active_a");
      links[index].classList.add("active_a");
    }
  });
});

// FUNCTION TO RESET PAGE LOCATION ON REFRESH
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// FUNCTION FOR DOWN ARROW ON HOMEPAGE
function homepageDown() {
  document.querySelector(".midview").scrollIntoView({ behavior: "smooth" });
}

function aboutDown() {
  document
    .querySelector("#about-block-2")
    .scrollIntoView({ behavior: "smooth" });
}

function aboutDown2() {
  document
    .querySelector("#about-block-3")
    .scrollIntoView({ behavior: "smooth" });
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

function modalOpened() {
  let body = document.body;
  body.classList.add("no-scroll");

  let modal = document.getElementById("emailModal");
  window.onclick = function(e) {
    if (e.target == modal) {
      window.location.href = "#close";
    }
  };
}

function modalClosed() {
  let body = document.body;
  body.classList.remove("no-scroll");
}

// TODO:
//  - send email attributes to server via nodemailer
//  - Validate:
//      - name
//      - email
//      - recaptcha

function emailValidate(email) {
  // validate email
  let emailIn = document.getElementById("userEmail");
  if (isEmail(email) == true) {
    // If good change background to green
    emailIn.style.border = "4px solid green";
  } else if (emailIn.value == "") {
    emailIn.style.border = "2px solid rgb(192, 191, 191)";
  } else {
    emailIn.style.border = "4px solid red";
  }
}

function nameValidate(name) {
  // Ensure names have a value, and don't contain numbers
  let regex = /^[a-zA-Z ]{2,30}$/;
  if (!regex.test(name)) {
    // Name does not match the regex - contains numbers etc
    alert("invalid name");
    let nameIn = document.getElementById("userName");
    nameIn.value = "";
  }
}

function isEmail(email) {
  let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}
