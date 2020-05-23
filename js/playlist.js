var fileArray;
var scoringMetadata;
var maxScore;
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
          snackNotif('Challenge Playlist Ready!')
          document.getElementById('start-challenge').disabled = false;
          }, 2000);
          // console.log(fileArray);
        }
    }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function playGame(metadata, difficulty) {
    scoringMetadata = metadata
    fileArray = shuffle(fileArray);

    maxScore = fileArray.length * scoringMetadata.item_score
    document.getElementById('score').innerHTML = maxScore

    document.getElementById('start-challenge').disabled = true;
     var i = 0;
      boketLink = `https://laugh-challenge.s3.amazonaws.com/${difficulty}/`;
      // testing
      // boketLink = 'https://laugh-challenge.s3.amazonaws.com/';
      console.log(boketLink)
      setTimeout(function() {
        scorePlayer = true;
      }, 3000);
      var videoPlayer = document.getElementById('challenge');
      videoPlayer.src = boketLink+fileArray[0]+'.mp4';
      videoPlayer.onended = function () {
        if (scorePlayer)
          snackNotif(noLaugh[parseInt(Math.random() * noLaugh.length)]);
        if (i < fileArray.length-1) {
          i++;
          videoPlayer.src = boketLink+fileArray[i]+'.mp4';
          setTimeout(function() {
            scorePlayer = true;
          }, 3000);
        } else {
          snackNotif('Challenge Complete', 5000);
          document.getElementById('playlist-ready').innerHTML = 'Challenge Complete!';
        }
      }
}

function startChallenge() {
  var difficultyDropDown = document.getElementById('level')
  var difficulty = difficultyDropDown.options[difficultyDropDown.selectedIndex].value
  getScoringObject(difficulty=difficulty, callback=playGame)
}

function snackNotif(message, duration=3000) {
  var snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = message;
  snackbar.className = "show";
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, duration);
}

<<<<<<< HEAD
/// showNotificationAlert function displays a notification passed in message parameter 
/// also updates the laugh emoji element with a new image based on the isHappy parameter
function showNotificationAlert(message, isHappy=false) {
  self.snackNotif(message)
  
  //Update the laugh emoji with a new icon
  if (isHappy) {
    document.getElementById("laugh_emoji").src = "assets/happy.png";
  } else {
    document.getElementById("laugh_emoji").src = "assets/sad.png";
  }
=======
function loadJSON(callback, difficulty) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `https://laugh-challenge.s3.amazonaws.com/${difficulty}_metadata.json`, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function getScoringObject(difficulty, callback) {
    loadJSON(function(response) {
        var parsedJson = JSON.parse(response)
        callback(parsedJson.score_control_metadata, difficulty)
    }, difficulty=difficulty);
>>>>>>> 2f3f164b7b92701670f6b8d571c0dd893691b22a
}
