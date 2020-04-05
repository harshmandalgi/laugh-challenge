var fileArray;
var request = new XMLHttpRequest();
request.open('GET', 'https://laugh-challenge.s3.amazonaws.com/playlist.txt', true);
request.send(null);
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader('Content-Type');
        if (type.indexOf("text") !== 1) {
            fileArray = request.responseText.split('\n');
            document.getElementById('playlist-ready').innerHTML = 'Challenge Playlist Ready!';
            snackNotif('Challenge Playlist Ready!')
            document.getElementById('start-challenge').disabled = false;
            // console.log(fileArray);
        }
    }
}

function startChallenge() {
  // console.log(fileArray);
  document.getElementById('start-challenge').disabled = true;
  var i = 0;
  boketLink = 'https://laugh-challenge.s3.amazonaws.com/';
  scorePlayer = true;
  var videoPlayer = document.getElementById('challenge');
  videoPlayer.src = boketLink+fileArray[0]+'.mp4';
  videoPlayer.onended = function () {
    if (scorePlayer)
      snackNotif(noLaugh[parseInt(Math.random() * noLaugh.length)]);
    if (i < fileArray.length-1) {
      i++;
      videoPlayer.src = boketLink+fileArray[i]+'.mp4';
      scorePlayer = true;
    }
    else
      snackNotif('Challenge Complete', 7000);
  }
}

function snackNotif(message, duration=3000) {
  var snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = message;
  snackbar.className = "show";
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, duration);
}
