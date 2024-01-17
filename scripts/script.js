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

window.onscroll = function(event) {
  var firstSlidePos = document.getElementsByClassName("first-slide")[0].offsetTop
  var secondSlidePos = document.getElementsByClassName("second-slide")[0].offsetTop
  var thirdSlidePos = document.getElementsByClassName("third-slide")[0].offsetTop

  var scrollPosition = window.scrollY+secondSlidePos;
  if(scrollPosition > secondSlidePos){
    console.log("in")
    document.getElementsByClassName("second-slide")[0].style.display = 'hidden'
  }
  console.log(secondSlidePos)
  console.log(scrollPosition+secondSlidePos)
}
