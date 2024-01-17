var htmlClassLoadOrder = [
  "second-slide",
  "experience-container",
  "experience-title",
  "experience-desc",
  "education-container",
  "education-title",
  "education-desc",
  "third-slide",
  "third-slide-container",
  "third-slide-title",
];

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
  var dataText = ["I'm Yashesh Chauhan", "I'm a Full-Stack Developer"];
  var elements = document.querySelector(".typewrite span");
  new TxtType(elements, dataText);

  var css = document.createElement("style");
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #bbb}";
  document.body.appendChild(css);
};

function isInViewport(element) {
  const elementRectangle = element.getBoundingClientRect();
  return elementRectangle.top < window.innerHeight - 100;
}

window.onscroll = function (event) {
  htmlClassLoadOrder.forEach((className) => {
    var classElement = document.getElementsByClassName(className)[0];
    if (isInViewport(classElement)) {
      console.log(className)
      classElement.classList.add("animate");
    }
  });
};

function jump(className) {
  var element = document.getElementsByClassName(className)[0];
  element.scrollIntoView({behavior:"smooth"});
}