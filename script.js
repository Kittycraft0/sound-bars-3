//this below here function here can be used to make it only run once the page
//is fully loaded! nice
//window.onload = function () {
//"use strict";
var paths = document.getElementsByTagName('path');
var visualizer = document.getElementById('visualizer');
var mask = visualizer.getElementById('mask');
var h = 
  document.getElementsByTagName('h1')[0]?
  document.getElementsByTagName('h1')[0]:
  {setAttribute:{}};
var path;
var report = 0;

var soundAllowed = function (stream) {
  //Audio stops listening in FF without // window.persistAudioStream = stream;
  //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
  //https://support.mozilla.org/en-US/questions/984179
  window.persistAudioStream = stream;
  h.innerHTML = "Thanks";
  h.setAttribute('style', 'opacity: 0;');
  //h.style.opacity=0;
  var audioContent = new AudioContext();
  //console.log(audioContent);
  var audioStream = audioContent.createMediaStreamSource( stream );
  var analyser = audioContent.createAnalyser();
  audioStream.connect(analyser);
  analyser.fftSize = 1024;

  var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
  visualizer.setAttribute('viewBox', '0 0 255 255');
    
	//Through the frequencyArray has a length longer than 255, there seems to be no
  //significant data after this point. Not worth visualizing.
  for (var i = 0 ; i < 255; i++) {
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-dasharray', '4,1');
    mask.appendChild(path);
  }
  var doDraw = function () {
    requestAnimationFrame(doDraw);
    analyser.getByteFrequencyData(frequencyArray);
    var adjustedLength;
    for (var i = 0 ; i < 255; i++) {
      adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
      paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
    }
    //console.log("drawn");

  }
  doDraw();
}

var soundNotAllowed = function (error) {
    h.innerHTML = "You must allow your microphone.";
    console.log(error);
  }

/*window.navigator = window.navigator || {};
  /*navigator.getUserMedia =  navigator.getUserMedia       ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia    ||
                              null;*/
navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

//};

//oh yeah also the date right now is:
//10:29 AM CST
//12/22/2022 my brothers 20th birthday!
//Thursday
//today is a snow day! tomorrow is the start of christmas break! nice!

var audioCtx=new AudioContext();
console.log(audioCtx);

//var oscilator=audioCtx.createOscillator();
//oscilator.connect(audioCtx.destination);
//oscilator.type="triangle";
//oscilator.start();

//between 0 and 1
var volume=0.125;

var button1=document.createElement("button");
button1.textContent="heyyyy";
document.body.appendChild(button1);
//thanks chatgpt for clearing up my slight issue of forgetting
button1.addEventListener("click",()=>{
  //console.log("clicked button!");
  var oscilator=audioCtx.createOscillator();
  //triangle, square, sawtooth, sine
  //oscilator.type="triangle";
  //oscilator.type="square";
  //oscilator.type="sawtooth";
  //oscilator.type="sine";
  oscilator.type = "triangle";
    
  //chatgpt sure is very very nice!!! lol
  
  //make it quieter
  //make a gain node thing
  var gainNode=audioCtx.createGain();
  //set the volume
  gainNode.gain.value=volume;
  
  //connect it to the oscilator
  oscilator.connect(gainNode);
  //connect it to the audio context destination thing
  gainNode.connect(audioCtx.destination);
  


  

  
  oscilator.start();

  setTimeout(()=>{oscilator.stop();},1000);
});

//var audioCtx = new AudioContext();


