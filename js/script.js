var firstLaugh = [
  'You laughed! :P',
  'Nooooooo! You Laughed!!'
];

var Laugh = [
  'lol :D You laughed again',
  'You laughed?! :P '
];

var noLaugh = [
  'Stone face!!',
  'Nice!'
];

const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),

]).then(startVideo);


function showPlaylistReady() {
    document.getElementById('playlist-ready').innerHTML = 'Challenge Playlist Ready!';
    snackNotif('Challenge Playlist Ready!')
}

function displayGameOver() {
    snackNotif('Game over !!!', 5000);
    document.getElementById('playlist-ready').innerHTML = 'Game over !!!'
    document.getElementById('challenge').pause()
    document.getElementById('start-challenge').disabled = false;
    alert("Your Score is: " + document.getElementById('score').innerText)
    document.getElementById('score').innerHTML = 0
}

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

    if (detections[0].expressions.happy > scoringMetadata.laugh_detection_model_threshold)
        happyFacedetected();
  }, 1000)
});

function happyFacedetected() {
  let currentScore = parseInt(document.getElementById('score').innerText);

  if (currentScore == 0) return  // Game over

  if (currentScore == maxScore) {
    showNotificationAlert(firstLaugh[parseInt(Math.random() * firstLaugh.length)], false);
  }
  else
    showNotificationAlert(Laugh[parseInt(Math.random() * firstLaugh.length)], true);

  // New score
  var new_score = currentScore - current_score_degrade_constant;

  // Next degrade value
  current_score_degrade_constant = current_score_degrade_constant * scoringMetadata.score_degrade_exponential_factor

  if (new_score <= 0) {
    displayGameOver()
    return
  }

  document.getElementById('score').innerHTML = new_score;
}

document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
}
