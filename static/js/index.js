// index.js

document.addEventListener("DOMContentLoaded", function () {
    initializeUI();

    function toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("active");
    }
    
    function isInside(target, element) {
      return element.contains(target) || target === element;
    }
    
    document.addEventListener("click", function (event) {
      const sidebar = document.querySelector(".sidebar");
      const toggleIcon = document.querySelector(".toggle-icon");
      const isClickInsideSidebar = isInside(event.target, sidebar);
      const isClickInsideToggleIcon = isInside(event.target, toggleIcon);
    
      if (!isClickInsideSidebar && !isClickInsideToggleIcon && sidebar.classList.contains("active")) {
        toggleSidebar();
      }
    });
  
    var TxtRotate = createTxtRotateClass();
    initializeTxtRotate(TxtRotate);
  
    handleParagraphEllipsis();
  });
  
  function initializeUI() {
    const input = document.querySelector("input[type='file']");
    var uploadBtn = document.querySelector(".upload-btn");
    const viewer = document.querySelector("#pdf-viewer");
    const container = document.querySelector("#container");
    var x = document.querySelector("input[name='pdf-url']");
    const form = document.querySelector("form");
    const p = document.querySelector("p");
    const up = document.querySelector("#up");
    const y = document.querySelector("#url");
  }
  
  function createTxtRotateClass() {
    return function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 1000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };
  }
  
  function initializeTxtRotate(TxtRotate) {
    TxtRotate.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
    
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
      var that = this;
      var delta = 300 - Math.random() * 100;
    
      if (this.isDeleting) { delta /= 2; }
    
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
    
      setTimeout(function() {
        that.tick();
      }, delta);
    };
  
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  }
  
  function handleParagraphEllipsis() {
    var para = document.querySelectorAll(".ellipsis");
  
    for (var i = 0; i < para.length; i++) {
      var paraTxt = para[i].innerHTML;
  
      if (paraTxt.length > 200) {
        var newPara = document.createElement("p"); //create new paragraph element
        newPara.className = "ellipsis-trunc";
        var newParaTxt = document.createTextNode(paraTxt.substring(0,200)+"...");
        //create new text node
  
        newPara.appendChild(newParaTxt); //bind new text node to new element
        para[i].replaceWith(newPara);
      } else {
        console.log("I've got nothing");
      }
    }
  }