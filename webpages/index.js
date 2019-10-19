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
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active_a");
      current[0].className = current[0].className.replace(" active_a", "");
      this.className += " active_a";

      // Scroll into view what has been clicked
      let div = document.getElementsByName(this.innerHTML)
      div[0].scrollIntoView({behavior: 'smooth'});
    });
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
