// contains messages to display to user on her/his first laugh of challenge
// random msg is selected and displayed from this
var firstLaugh = [
  'You laughed! :P',
  'Nooooooo! You Laughed!!'
];

// contains user display msg for next series of videos after first laugh
var Laugh = [
  'lol :D You laughed again',
  'You laughed?! :P '
]; 

// if the user doesnt laugh we randomly show any on eof these
var noLaugh = [
  'Stone face!!',
  'Nice!'
];

const video = document.getElementById('video');
var scorePlayer = false;

// load models for expression detection
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  
]).then(startVideo);

// driver function
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

startVideo();

video.addEventListener('play', () => {
  
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, 
      new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions()
    if (detections[0].expressions.happy > 0.3)
      if (scorePlayer)
        happyFacedetected();  
  }, 1000)
});

// this function triggers the score increment
// to enable increment in score, scoreplayer var should be true 
function happyFacedetected() {
  let currentScore = parseInt(document.getElementById('score').innerText);
  if (currentScore == 0) {
    snackNotif(firstLaugh[parseInt(Math.random() * firstLaugh.length)]);  
  }  
  else
    snackNotif(Laugh[parseInt(Math.random() * Laugh.length)]);

  document.getElementById('score').innerHTML = currentScore + 1;
  
}


// reveal face checkbox function
// todo: remove checkbox 
document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
}

