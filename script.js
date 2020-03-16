
//Audios
var beep = new Audio();
beep.src = "audio/beep.mp3";
var bleep = new Audio();
bleep.src = "audio/bleep.mp3";
var quickBeep = new Audio();
quickBeep.src = "audio/quickBeep.mp3";


var work = 10;
var rest = 3;
var rounds = 2;
var roundsComplete = 0;
var seconds = work;
var working = true;
var counter;
var startIn = 5;
var preCounter = setInterval(preCounter, 1000);

//controls the number display
function showTime(time) {
  if(time === 0) {
    document.getElementById("clock").innerHTML = "Done!";
  } else {
    var minutes = Math.floor(time/60);
    if(minutes<10) {
      minutes = "0" + minutes;
    }
    var seconds = time - (minutes*60);
    if(seconds<10) {
      seconds = "0" + seconds;
    }
    document.getElementById("clock").innerHTML = minutes + ":" + seconds;
  }
}

//this function is for changing css using classes
function changeState (a, b) {
  document.getElementById("clock").classList.remove(a);
  document.getElementById("clock").classList.add(b);
}

//runs countdown, then starts workout clock
function preCounter() {
  quickBeep.play();
  showTime(startIn);
  startIn = startIn -1;
  if (startIn === 0) {
    clearInterval(preCounter);
    counter = setInterval(stopClock, 1000); 
  }
}

//workout clock
function stopClock() {
  changeState("off", "work");
  showTime(seconds);
  seconds = seconds -1;
  if (seconds === 0 && working) {
    seconds = rest;
    working = false;
    beep.play();
    changeState("work", "rest");
  } else if (seconds === 0 && !working) {
    roundsComplete = roundsComplete + 1;
    if (roundsComplete == rounds) {
      clearInterval(counter);
      changeState("rest", "off");
      showTime(seconds);
    } else {
      seconds = work;
      working = true;
      bleep.play();
      changeState("rest", "work");
    }
  }
}

//Add form to take input - Work, Rest, Rounds
//With start button
//Adjust Switch method 
//Add pause button
