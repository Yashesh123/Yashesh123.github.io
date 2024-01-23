var htmlClassLoadOrder = [
  "second-slide",
  "experience-container",
  "education-container",
  "third-slide",
  "third-slide-container",
  "blog-slide",
  "blog-slide-container",
  "about-slide",
  "about-slide-container",
  "skill-container",
  "contact-slide",
  "contact-slide-container",
];

var typeWriterMsgs = ["I'm Yashesh Chauhan", "I'm a Full-Stack Developer"];

var TxtType = function (el, toRotate) {
  console.log(toRotate);
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerText = this.txt;

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.querySelector(".typewrite span");
  new TxtType(elements, typeWriterMsgs);

  var css = document.createElement("style");
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #bbb}";
  document.body.appendChild(css);
};

function isInViewport(element) {
  const elementRectangle = element.getBoundingClientRect();
  return elementRectangle.top < window.innerHeight;
}

window.onscroll = function (event) {
  htmlClassLoadOrder.forEach((className) => {
    var classElement = document.getElementsByClassName(className)[0];
    if (
      isInViewport(classElement) &&
      !classElement.classList.contains("animate")
    ) {
      classElement.classList.add("animate");
    }
  });
};

function jump(className) {
  var element = document.getElementsByClassName(className)[0];
  element.scrollIntoView({ behavior: "smooth" });
}
