var fileArray;
// fetching playlist from textfile on S3
var request = new XMLHttpRequest();
request.open('GET', 'https://laugh-challenge.s3.amazonaws.com/playlist.txt', true);
request.send(null);
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader('Content-Type');
        if (type.indexOf("text") !== 1) {
          fileArray = request.responseText.split('\n');
          setTimeout(function() {
            document.getElementById('playlist-ready').innerHTML = 'Challenge Playlist Ready!';
          //snackNotif('Challenge Playlist Ready!')
          document.getElementById('start-challenge').disabled = false;
          }, 2000);
          console.log(fileArray);
        }
    }
}

// shuffle playlist
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// start challenge trigger
function startChallenge() {
  fileArray = shuffle(fileArray);
  document.getElementById('start-challenge').disabled = true;
  var i = 0;
  boketLink = 'https://laugh-challenge.s3.amazonaws.com/';
  // wait for the below time in ms to prevent scoring at the start of an video
  // user may be smiling after previous video ends so we give a window of below mentioned time in which the score will not increase
  setTimeout(function() {
    scorePlayer = true;
  }, 3000);
  var videoPlayer = document.getElementById('challenge');
  // fetching videos from s3 link
  videoPlayer.src = boketLink+fileArray[0]+'.mp4';
  // fetching videos directly from array element text, in this case we are feeding URLs directly into playlist file
  // videoPlayer.src = fileArray[0];
  videoPlayer.onended = function () {
    if (scorePlayer)
      // snackNotif(noLaugh[parseInt(Math.random() * noLaugh.length)]);
    if (i < fileArray.length-1) {
      i++;
      // fetching videos from s3 link
      videoPlayer.src = boketLink+fileArray[i]+'.mp4';
      scorePlayer = false;
      // fetching videos directly from array element text, in this case we are feeding URLs directly into playlist file
      // videoPlayer.src = fileArray[i];
      setTimeout(function() {
        scorePlayer = true;
      }, 3000);
    } else {
      // snackNotif('Challenge Complete', 5000);
      document.getElementById('playlist-ready').innerHTML = 'Challenge Complete!';
    }
  }
}

//snack notification function
function snackNotif(message, duration=3000) {
  var snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = message;
  snackbar.className = "show";
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, duration);
}
