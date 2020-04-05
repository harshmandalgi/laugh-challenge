var firstLaugh = [
  'You laughed! :P',
  'Nooooooo! You Laughed!!'
];

var Laugh = [
  'lol :D You laughed again',
  'You laughed?! Concentrate!!!!!'
]; 

var noLaugh = [
  'Nice!',
  'Stone face!!'
];

const video = document.getElementById('video');
var scorePlayer = false;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
  
]).then(startVideo);

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

function happyFacedetected() {
  let currentScore = parseInt(document.getElementById('score').innerText);
  if (currentScore == 0) {
    snackNotif(firstLaugh[parseInt(Math.random() * firstLaugh.length)]);  
  }  
  else
    snackNotif(Laugh[parseInt(Math.random() * Laugh.length)]);

  document.getElementById('score').innerHTML = currentScore + 1;
  scorePlayer = false;
}

document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
}

