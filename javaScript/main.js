// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// |                                  HELPER FUNCTIONS                                |
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**
 * Selector Helper Function
 * @param {String} Selector
 */
function $(Selector) {
  Selector = Selector.toString().trim();
  if (
    Selector.charAt(0) === "." ||
    Selector.charAt(0) === "#" ||
    Selector.charAt(0) === "[" ||
    Selector.charAt(0) === ":" ||
    Selector.match(">")
  ) {
    return document.querySelector(Selector);
  } else {
    return document.querySelectorAll(Selector);
  }
}

/**
 * - Scroll To Element Position
 * @param {Element} Element
 */
function scrollToPos(Element) {
  let elHeight = $(Element).getBoundingClientRect().top - 30;
  scrollTo({
    top: elHeight,
    behavior: "smooth",
  });
}

/**
 * - Scroll Indicator Function
 */
function scrollIndicator() {
  let windowScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolledHeight = (windowScroll / scrollHeight) * 100;
  $(".scroll-bar").style.width = scrolledHeight + "%";
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// |                                    START ALL                                     |
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// nav links active class **********************************
$("nav .parent-ul a").forEach((link) => {
  link.addEventListener("click", (e) => {
    $("nav .parent-ul a").forEach((link) => {
      link.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

// nav li active class *************************************
$("li.dropdown").forEach((li) => {
  li.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
  });
});

// nav btn open class **************************************
$(".nav-btn").onclick = () => {
  $(".nav-btn").classList.toggle("open");
  $("#navbar").classList.toggle("open");
};

// show totop button ***************************************
window.onscroll = () => {
   // Show To Top Button
  if (window.scrollY > 700) {
    $(".totop").classList.add("show");
  } else {
    $(".totop").classList.remove("show");
  }
  
   // Window Custome Scroll Bar
  if (window.scrollY > 50) {
    scrollIndicator();
    $(".scroll-indicator").style.display = "block";
  } else {
    $(".scroll-indicator").style.display = "none";
  }
  
    // Posts Animation On Scroll
  let posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    if (
      post.getBoundingClientRect().top <=
      document.documentElement.clientHeight / 1
    ) {
      post.classList.add("scrolled");
    } else {
      post.classList.remove("scrolled");
    }
  });
};

$(".totop").onclick = () => {
  scrollToPos("#header");
};

// nav anchors scroll **************************************
$(".contact").onclick = () => {
  scrollToPos("#contact");
};

$(".about").onclick = () => {
  scrollToPos("#about");
};

// contact us form validate ********************************
let alphabet = /[a-zA-Z]/, // letters from a to z and A to Z
  numbers = /[0-9]/, // numbers from 0 to 9
  special = /[~,!,@,#,$,%,^,&,*,(,),_,-,?,+,=,|,;,:,<,>,.]/, // some special characters
  emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // email regexp validate

$("#name").addEventListener("keyup", function validName() {
  if ($("#name").value === "") {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "please type your name!";
  } else if ($("#name").value.length < 3) {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "name should be more than 3 character!";
  } else if ($("#name").value.match(numbers)) {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "the name sould not include numbers!";
  } else if ($("#name").value.match(special)) {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "the name sould not include spicial chracter!";
  } else {
    $(".wrong").style.color = "#009688";
    $(".wrong").innerHTML = "name is valid";
  }
});

$("#email").addEventListener("keyup", function validEmail() {
  if ($("#email").value === "") {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "please type your email!";
  } else if (!$("#email").value.match(emailRegExp)) {
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "your email is not valid!";
  } else {
    $(".wrong").style.color = "#009688";
    $(".wrong").innerHTML = "email is valid";
  }
});

$("[type='submit']").addEventListener("click", (send) => {
  let validName;
  let validEmail;

  if (
    $("#name").value === "" ||
    $("#name").value.length < 3 ||
    $("#name").value.match(numbers) ||
    $("#name").value.match(special)
  ) {
    validName = false;
  }

  if ($("#email").value === "" || !$("#email").value.match(emailRegExp)) {
    validEmail = false;
  }

  if (validName === false || validEmail === false) {
    send.preventDefault();
    $(".wrong").style.color = "#f44336";
    $(".wrong").innerHTML = "somthing went wrong, please check your inputs!";
  }
});
