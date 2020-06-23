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
document.addEventListener("DOMContentLoaded", function () {
  let links = document.getElementsByClassName("side_a");

  // Add event listener for clicking links
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      let div = document.getElementsByName(this.innerHTML);
      div[0].scrollIntoView({ behavior: "smooth" });
    });
  }

  // Add event listener for scrolling to "links"
  let divs = document.getElementsByClassName("menuitem");
  window.addEventListener("scroll", function () {
    let index = divs.length;
    while (--index && window.scrollY + 100 < divs[index].offsetTop) {}
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("active_a");
      links[index].classList.add("active_a");
    }
  });
});

// FUNCTION TO RESET PAGE LOCATION ON REFRESH
window.onbeforeunload = function () {
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

// IMAGE GALLERY MODAL CODE
function openLightbox() {
  document.getElementById("myModal").style.display = "block";
  let body = document.body;
  body.classList.add("no-scroll");
}
function closeModal() {
  let body = document.body;
  body.classList.remove("no-scroll");
  document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
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
    // If good change background to green, remove possible error message
    emailIn.style.border = "2px solid rgb(119, 221, 119)";
    emailIn.style.backgroundColor = "rgb(119, 221, 119)";
  } else if (emailIn.value == "") {
    emailIn.style.border = "2px solid rgb(192, 191, 191)";
    emailIn.style.backgroundColor = "rgb(192, 191, 191)";
  } else {
    emailIn.style.border = "2px solid rgb(255, 105, 97)";
    emailIn.style.backgroundColor = "rgb(255, 105, 97)";
  }
}

function nameValidate(name) {
  // Ensure names have a value, and don't contain numbers
  let nameIn = document.getElementById("userName");

  if (isName(name) == true) {
    nameIn.style.border = "2px solid rgb(119, 221, 119)";
    nameIn.style.backgroundColor = "rgb(119, 221, 119)";
  } else if (nameIn.value == "") {
    nameIn.style.border = "2px solid rgb(192, 191, 191)";
    nameIn.style.backgroundColor = "rgb(192, 191, 191)";
  } else {
    // Name does not match the regex - contains numbers etc
    nameIn.style.border = "2px solid rgb(255, 105, 97)";
    nameIn.style.backgroundColor = "rgb(255, 105, 97)";
  }
}

function inputValidate(subject, targetLength, form) {
  let subjectIn = document.getElementById(form);
  if (subject.length > targetLength) {
    subjectIn.style.border = "2px solid rgb(119, 221, 119)";
    subjectIn.style.backgroundColor = "rgb(119, 221, 119)";
  } else if (subject.length == 0) {
    subjectIn.style.border = "2px solid rgb(192, 191, 191)";
    subjectIn.style.backgroundColor = "rgb(192, 191, 191)";
  } else {
    // Subject length is too short
    subjectIn.style.border = "2px solid rgb(255, 105, 97)";
    subjectIn.style.backgroundColor = "rgb(255, 105, 97)";
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

function isName(name) {
  let regex = /^[a-zA-Z ]{2,30}$/;
  if (!regex.test(name)) {
    return false;
  } else {
    return true;
  }
}

async function sendBtnClicked() {
  // First, if things are empty, output an error message in #errorMsg
  // Then, check content of subject is > 1, and message length > 1.
  // Then, check the RECAPTCHA has authorised the user.
  // Save all 4 input fields into variables to be sent to a server.js function
  let nameIn = document.getElementById("userName");
  let emailIn = document.getElementById("userEmail");
  let subjectIn = document.getElementById("mailSubject");
  let messageIn = document.getElementById("mailMessage");

  let errorMsg = document.getElementById("errorMsg");
  let errorDiv = document.getElementById("errorMsgDiv");

  if (isName(nameIn.value) !== true) {
    errorMsg.innerHTML = "please enter a valid name";
  } else {
    if (isEmail(emailIn.value) !== true) {
      errorMsg.innerHTML = "please enter a valid email address";
    } else {
      if (subjectIn.value.length < 2) {
        errorMsg.innerHTML = "please enter a valid message subject";
      } else {
        if (messageIn.value.length < 10) {
          errorMsg.innerHTML = "please enter a valid message";
        } else {
          if (grecaptcha && grecaptcha.getResponse().length < 1) {
            errorMsg.innerHTML = "please check the recaptcha form";
          } else {
            // ALL INPUTS HAVE BEEN VALIDATED, MESSAGE CAN NOW BE SENT
            errorMsg.innerHTML = "";
            const fetchOptions = {
              credentials: "same-origin",
              method: "POST",
            };

            let url =
              "/api/sendMail" +
              "?name=" +
              encodeURIComponent(nameIn.value) +
              "&email=" +
              encodeURIComponent(emailIn.value) +
              "&subject=" +
              encodeURIComponent(subjectIn.value) +
              "&message=" +
              encodeURIComponent(messageIn.value);

            const response = await fetch(url, fetchOptions);
            if (!response.ok) {
              // handle the error
              console.log("Fetch response for /api/sendMail has failed.");
              return;
            } else {
              console.log("Successful /api/sendMail call.");
              nameIn.value = "";
              emailIn.value = "";
              subjectIn.value = "";
              messageIn.value = "";

              nameIn.style.backgroundColor = "rgb(192, 191, 191)";
              emailIn.style.backgroundColor = "rgb(192, 191, 191)";
              subjectIn.style.backgroundColor = "rgb(192, 191, 191)";
              messageIn.style.backgroundColor = "rgb(192, 191, 191)";

              nameIn.style.border = "2px solid rgb(192, 191, 191)";
              emailIn.style.border = "2px solid rgb(192, 191, 191)";
              subjectIn.style.border = "2px solid rgb(192, 191, 191)";
              messageIn.style.border = "2px solid rgb(192, 191, 191)";
            }

            errorMsg.innerHTML =
              "your feedback has been submitted, please expect questions to be answered within a week.";
            errorDiv.style.backgroundColor = "#FDFD96";

            setTimeout(function () {
              // Clear modal content and close modal
              errorMsg.innerHTML = "";
              errorDiv.style.backgroundColor = "rgb(192, 191, 191)";
              window.location.href = "#close";
              let body = document.body;
              body.classList.remove("no-scroll");
            }, 5000);
          }
        }
      }
    }
  }
}

// NEW MENU JS
// add event listeners for each element, done on the onload event
function changeMenu(obj) {
  let ul = document.getElementById("menunavul");
  let lis = ul.getElementsByTagName("a");

  for (let i = 0; i < lis.length; i++) {
    if (obj != lis[i]) {
      lis[i].classList.remove("active2");
    } else {
      lis[i].classList.add("active2");
      console.log(lis[i].innerHTML);

      // now change the content of divcontent
      let menuul = document.getElementById("menucontentul");
      let divs = menuul.getElementsByTagName("div");

      let optul = document.getElementById("menuinfoul");
      let divs2 = optul.getElementsByTagName("div");

      for (let j = 0; j < divs.length; j++) {
        if (lis[i].innerHTML != divs[j].dataset.name) {
          divs[j].classList.remove("activemenu");
          divs2[j].classList.remove("activemenu");
        } else {
          divs[j].classList.add("activemenu");
          divs2[j].classList.add("activemenu");
        }
      }
    }
  }
}
