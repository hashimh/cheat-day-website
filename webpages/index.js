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
  console.log(links)

  // Add event listener for clicking links
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      let div = document.getElementsByName(this.innerHTML)
      div[0].scrollIntoView({behavior: 'smooth'});
    });
  }

  // Add event listener for scrolling to "links"
  let divs = document.getElementsByClassName("menuitem");
  window.addEventListener("scroll", function() {
    let index = divs.length;
    while (--index && window.scrollY + 100 < divs[index].offsetTop) {}
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active_a');
      links[index].classList.add('active_a');
    }
  });
});

// FUNCTION TO RESET PAGE LOCATION ON REFRESH
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
