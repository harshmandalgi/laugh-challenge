const video = document.getElementById('video');
var scorePlayer = false;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
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
  document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerText) + 1;
  scorePlayer = false;
}

document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
}

