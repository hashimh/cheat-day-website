// TODO:
//   - change all onclicks to add event listener

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
      body.classList.remove("no-scroll");
    }
  };
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

function sendBtnClicked() {
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

  console.log(nameIn.value, emailIn.value, subjectIn.value, messageIn.value);

  if (isName(nameIn.value) !== true) {
    errorMsg.innerHTML = "please enter a valid name";
    errorMsg.style.backgroundColor = "rgb(255, 105, 97)";
  } else {
    if (isEmail(emailIn.value) !== true) {
      errorMsg.innerHTML = "please enter a valid email address";
      errorMsg.style.backgroundColor = "rgb(255, 105, 97)";
    } else {
      if (subjectIn.value.length < 2) {
        errorMsg.innerHTML = "please enter a valid message subject";
        errorMsg.style.backgroundColor = "rgb(255, 105, 97)";
      } else {
        if (messageIn.value.length < 10) {
          errorMsg.innerHTML = "please enter a valid message";
          errorMsg.style.backgroundColor = "rgb(255, 105, 97)";
        } else {
          errorMsg.innerHTML = "";
          errorMsg.style.backgroundColor = "#636363";
        }
      }
    }
  }
}

// function onSubmit(token) {
//   document.getElementById("demo-form").submit();
// }

// SITE KEY: 6LeeCtsUAAAAAO10B_s_wC-r1gOQRdpXBCTypPMp
// SECRET KEY: 6LeeCtsUAAAAAHyh1Zr7OZKE6o8hq54jq5OwQa2M
