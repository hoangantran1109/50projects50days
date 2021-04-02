const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

function setTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()

setInterval(setTime, 1000)

var ac = {
  // (A) INITIALIZE ALARM CLOCK
  init : function () {
    // (A1) GET THE CURRENT TIME - HOUR, MIN, SECONDS
    ac.chr = document.getElementById("chr");
    ac.cmin = document.getElementById("cmin");
    ac.csec = document.getElementById("csec");

    // (A2) CREATE TIME PICKER - HR, MIN, SEC
    ac.thr = ac.createSel(23);
    document.getElementById("tpick-h").appendChild(ac.thr);
    ac.thm = ac.createSel(59);
    document.getElementById("tpick-m").appendChild(ac.thm);
    ac.ths = ac.createSel(59);
    document.getElementById("tpick-s").appendChild(ac.ths);

    // (A3) CREATE TIME PICKER - SET, RESET
    ac.tset = document.getElementById("tset");
    ac.tset.addEventListener("click", ac.set);
    ac.treset = document.getElementById("treset");
    ac.treset.addEventListener("click", ac.reset);

    // (A4) GET ALARM SOUND
    ac.sound = document.getElementById("alarm-sound");

    // (A5) START THE CLOCK
    ac.alarm = null;
    setInterval(ac.tick, 1000);
  },

  // (B) SUPPORT FUNCTION - CREATE SELECTOR FOR HR, MIN, SEC
  createSel : function (max) {
    var selector = document.createElement("select");
    for (var i=0; i<=max; i++) {
      var opt = document.createElement("option");
      i = ac.padzero(i);
      opt.value = i;
      opt.innerHTML = i;
      selector.appendChild(opt);
    }
    return selector
  },

  // (C) SUPPORT FUNCTION - PREPEND HR, MIN, SEC WITH 0 (IF < 10)
  padzero : function (num) {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  },

  // (D) UPDATE CURRENT TIME
  tick : function () {
    // (D1) CURRENT TIME
    var now = new Date();
    var hr = ac.padzero(now.getHours());
    var min = ac.padzero(now.getMinutes());
    var sec = ac.padzero(now.getSeconds());

    // (D2) UPDATE HTML CLOCK
    ac.chr.innerHTML = hr;
    ac.cmin.innerHTML = min;
    ac.csec.innerHTML = sec;

    // (D3) CHECK AND SOUND ALARM
    if (ac.alarm != null) {
      now = hr + min + sec;
      if (now == ac.alarm) {
        if (ac.sound.paused) { ac.sound.play(); }
      }
    }
  },

  // (E) SET ALARM
  set : function () {
    ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
    ac.thr.disabled = true;
    ac.thm.disabled = true;
    ac.ths.disabled = true;
    ac.tset.disabled = true;
    ac.treset.disabled = false;
  },

  // (F) RESET ALARM
  reset : function () {
    if (!ac.sound.paused) { ac.sound.pause(); }
    ac.alarm = null;
    ac.thr.disabled = false;
    ac.thm.disabled = false;
    ac.ths.disabled = false;
    ac.tset.disabled = false;
    ac.treset.disabled = true;
  }
};

// (G) START CLOCK ON PAGE LOAD
window.addEventListener("load", ac.init);