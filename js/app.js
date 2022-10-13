// select the page sections and store it into sections array
let sections = document.querySelectorAll("section");
// selecting the nav list --> ul
let navbarList = document.querySelector("#navbar__list");
// the button that appear when the user scrolling down 
let scrollingTopButton = document.querySelector(".scrollTop");


// add nav links dynamically based on the number of sections 
sections.forEach((sec) => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.dataset.index = sec.id;
  a.className = "menu__link";
  a.textContent = sec.dataset.nav;
  li.appendChild(a);
  navbarList.appendChild(li);
});

// selecting the nav links
let menuLinks = document.querySelectorAll(".menu__link");

// when the user click on any nav link it should scroll the window down to this section
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    console.log("clicked");
    document.getElementById(link.dataset.index).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// scroll to the top of the page
scrollingTopButton.addEventListener("click", () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// handing the active section and mark the link of this section as active link
addEventListener("scroll", () => {
  sections.forEach((sec) => {
    let sectionOffsets = sec.getBoundingClientRect();

    if (sectionOffsets.top > -400 && sectionOffsets.top <= 150) {
      HandleActiveClasses(sec.id);
    }
  });

  if (scrollY > 800) {
    scrollingTopButton.style.display = "block";
  } else {
    scrollingTopButton.style.display = "none";
  }
});

function HandleActiveClasses(sectionId) {
  sections.forEach((sec) => {
    sec.classList.remove("your-active-class");
    if (sec.id == sectionId) {
      sec.classList.add("your-active-class");
    }
  });

  menuLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.dataset.index == sectionId) {
      a.classList.add("active");
    }
  });
}


// check if the user is not scrolling for 3 seconds, the nav will disappear
let scrolling;
document.addEventListener("scroll", () => {
  document.querySelector(".page__header").classList.remove("hidden");
  clearTimeout(scrolling);
  scrolling = setTimeout(() => {
    document.querySelector(".page__header").classList.add("hidden");
  }, 3000);
  if (scrollY === 0) {
    clearTimeout(scrolling);
    document.querySelector(".page__header").classList.remove("hidden");
  }
});

